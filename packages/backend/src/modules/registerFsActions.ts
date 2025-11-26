import { coreServices, createBackendModule } from '@backstage/backend-plugin-api';
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node';
import { CatalogClient } from '@backstage/catalog-client';
import * as ScaffolderBackend from '@backstage/plugin-scaffolder-backend';

type CreateBuiltinActionsFunction = (options: any) => any[];

export const fsActionsModule = createBackendModule({
  moduleId: 'fs_actions_registration',
  pluginId: 'scaffolder',
  register(reg: any) { // use any
    reg.registerInit({
      deps: {
        actions: scaffolderActionsExtensionPoint,
        config: coreServices.rootConfig,
        urlReader: coreServices.urlReader,
        discovery: coreServices.discovery,
        logger: coreServices.logger,
      },
      async init({
        actions,
        config,
        urlReader,
        discovery,
        logger,
      }: any) { // use any
        const createBuiltinActions = (ScaffolderBackend as any).createBuiltinActions as CreateBuiltinActionsFunction;

        if (!createBuiltinActions) {
          logger.error("FATAL: 'createBuiltinActions' function not found. Upgrade needed.");
          return;
        }

        const catalogClient = new CatalogClient({ discoveryApi: discovery });

        const builtinActions = createBuiltinActions({
          config,
          logger,
          reader: urlReader,
          catalogClient,
        });

        for (const action of builtinActions) {
          actions.addActions(action);
        }

        logger.info('✅ Built-in actions registered successfully');
      },
    });
  },
});
