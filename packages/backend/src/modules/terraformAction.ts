import { resolve as resolvePath } from 'path';
import { createTemplateAction, executeShellCommand } from '@backstage/plugin-scaffolder-node';
import { z } from 'zod';

export const createTerraformApplyAction = () => {
  return createTemplateAction({
    id: 'terraform:apply',
    description: 'Initializes and applies a Terraform plan.',

    schema: {
      input: (zImpl) =>
        zImpl.object({
          directory: zImpl.string().describe('The directory containing the Terraform files.'),
        }),
    },

    async handler(ctx: any) {
      const { directory } = ctx.input;

      // Resolve actual working path
      const workDir = resolvePath(ctx.workspacePath, directory);

      ctx.logger.info(`Running Terraform in: ${workDir}`);

      // ---- Terraform init ----
      ctx.logger.info('Terraform init…');
      await executeShellCommand({
        command: 'terraform',
        args: ['init'],
        options: {
          cwd: workDir,
        },
        logger: ctx.logger,
      });

      // ---- Terraform apply ----
      ctx.logger.info('Terraform apply…');
      await executeShellCommand({
        command: 'terraform',
        args: ['apply', '-auto-approve'],
        options: {
          cwd: workDir,
        },
        logger: ctx.logger,
      });

      ctx.logger.info('Terraform apply completed successfully!');
    },
  });
};
