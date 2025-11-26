// packages/backend/src/modules/registerGithubActionsModule.ts
import { createBackendModule } from '@backstage/backend-plugin-api';
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node';
import { Octokit } from '@octokit/rest';
import sodium from 'libsodium-wrappers';

export const githubActionsModule = createBackendModule({
  moduleId: 'github_actions_module',
  pluginId: 'scaffolder',
  register(reg) {
    reg.registerInit({
      deps: { actions: scaffolderActionsExtensionPoint },
      async init({ actions }) {
        const setSecretAction = {
          id: 'github:actions:set-secret',
          description: 'Set a GitHub Actions secret for a repository',
          schema: {
            input: {
              type: 'object',
              required: ['repoUrl', 'secret', 'value'],
              properties: {
                repoUrl: { type: 'string' },
                secret: { type: 'string' },
                value: { type: 'string' },
              },
            },
          },
          async handler(ctx: any) {
            const { repoUrl, secret, value } = ctx.input;

            const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
            if (!match) throw new Error(`Invalid GitHub URL: ${repoUrl}`);
            const [, owner, repo] = match;

            const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

            // Wait until libsodium is ready
            await sodium.ready;

            // Get the repo's public key
            const { data: keyData } = await octokit.actions.getRepoPublicKey({
              owner,
              repo,
            });

            const key = keyData.key;
            const keyId = keyData.key_id;

            // Encrypt the secret using libsodium's sealed box (same as GitHub expects)
            const messageBytes = Buffer.from(value);
            const keyBytes = Buffer.from(key, 'base64');

            const encryptedBytes = sodium.crypto_box_seal(messageBytes, keyBytes);
            const encryptedValue = Buffer.from(encryptedBytes).toString('base64');

            // Upload encrypted secret
            await octokit.actions.createOrUpdateRepoSecret({
              owner,
              repo,
              secret_name: secret,
              encrypted_value: encryptedValue,
              key_id: keyId,
            });

            ctx.output('status', `✅ Secret '${secret}' added successfully`);
          },
        };

        actions.addActions(setSecretAction);
        console.log('✅ Custom GitHub Actions module registered with libsodium');
      },
    });
  },
});
