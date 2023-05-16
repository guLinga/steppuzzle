import { Plugin } from 'vite';
import { RouteService } from './RouteService';

interface PluginOptions {
  root: string;
}

export const CONVENTIONAL_ROUTE_ID = 'steppuzzle:routes';

export function pluginRoutes(options: PluginOptions): Plugin {
  const routerService = new RouteService(options.root);
  return {
    name: 'steppuzzle:routes',
    async configResolved() {
      await routerService.init();
    },
    resolveId(id) {
      if (id === CONVENTIONAL_ROUTE_ID) {
        return '\0' + CONVENTIONAL_ROUTE_ID;
      }
    },
    load(id) {
      if (id === '\0' + CONVENTIONAL_ROUTE_ID) {
        return routerService.generateRoutesCode();
      }
    }
  };
}
