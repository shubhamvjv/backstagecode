import { createBackendModule } from '@backstage/backend-plugin-api';
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node';
import { createTerraformApplyAction } from './terraformAction';

export const terraformActionModule = createBackendModule({
  moduleId: 'custom_terraform_action',
  pluginId: 'scaffolder',
  register(reg: any) { // ✅ mark reg as any
    reg.registerInit({
      deps: { actions: scaffolderActionsExtensionPoint },
      async init({ actions }: { actions: any }) { // ✅ mark actions as any
        const customAction = createTerraformApplyAction();

        // Modern API (no register/registerAction juggling)
        actions.addActions(customAction);

        console.log('✅ Custom Terraform action registered successfully');
      },
    });
  },
});
