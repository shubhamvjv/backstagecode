import { createBackend } from '@backstage/backend-defaults';

// Scaffolder core backend
import scaffolderBackendPlugin from '@backstage/plugin-scaffolder-backend';

// Scaffolder official modules
import githubModule from '@backstage/plugin-scaffolder-backend-module-github';
import notificationsModule from '@backstage/plugin-scaffolder-backend-module-notifications';

// Custom modules
import { terraformActionModule } from './modules/registerTerraformModule';
import { githubActionsModule } from './modules/registerGithubActionsModule';

// Other Backstage backend plugins
import appBackendPlugin from '@backstage/plugin-app-backend';
import proxyBackendPlugin from '@backstage/plugin-proxy-backend';
import techdocsBackendPlugin from '@backstage/plugin-techdocs-backend';
import authBackendPlugin from '@backstage/plugin-auth-backend';
import guestProvider from '@backstage/plugin-auth-backend-module-guest-provider';
import catalogBackendPlugin from '@backstage/plugin-catalog-backend';
import catalogEntityModule from '@backstage/plugin-catalog-backend-module-scaffolder-entity-model';
import catalogLogsModule from '@backstage/plugin-catalog-backend-module-logs';
import permissionBackendPlugin from '@backstage/plugin-permission-backend';
import allowAllPolicy from '@backstage/plugin-permission-backend-module-allow-all-policy';
import searchBackendPlugin from '@backstage/plugin-search-backend';
import searchPgModule from '@backstage/plugin-search-backend-module-pg';
import searchCatalogModule from '@backstage/plugin-search-backend-module-catalog';
import searchTechdocsModule from '@backstage/plugin-search-backend-module-techdocs';
import notificationsBackendPlugin from '@backstage/plugin-notifications-backend';
import signalsBackendPlugin from '@backstage/plugin-signals-backend';

// ---------------------------------------------
// Create backend instance
// ---------------------------------------------
const backend = createBackend();

// ---------------------------------------------
// Core plugins
// ---------------------------------------------
backend.add(appBackendPlugin);
backend.add(proxyBackendPlugin);

// ---------------------------------------------
// Scaffolder Backend (NO built-in override needed)
// ---------------------------------------------
backend.add(scaffolderBackendPlugin);

// Add custom Scaffolder modules
backend.add(terraformActionModule);
backend.add(githubActionsModule);

// Add official Scaffolder modules
backend.add(githubModule);
backend.add(notificationsModule);

// ---------------------------------------------
// Other plugins
// ---------------------------------------------
backend.add(techdocsBackendPlugin);
backend.add(authBackendPlugin);
backend.add(guestProvider);
backend.add(catalogBackendPlugin);
backend.add(catalogEntityModule);
backend.add(catalogLogsModule);
backend.add(permissionBackendPlugin);
backend.add(allowAllPolicy);
backend.add(searchBackendPlugin);
backend.add(searchPgModule);
backend.add(searchCatalogModule);
backend.add(searchTechdocsModule);
backend.add(notificationsBackendPlugin);
backend.add(signalsBackendPlugin);

// ---------------------------------------------
// Start backend
// ---------------------------------------------
backend.start().catch(err => {
  console.error('Backend failed to start', err);
  process.exit(1);
});
