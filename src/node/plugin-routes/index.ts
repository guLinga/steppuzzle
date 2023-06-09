import { Plugin } from 'vite';
import { RouteService } from './RouteService';
import { PageModule, SiteConfig } from '../../shared/types/index';

interface PluginOptions {
  siteConfig: SiteConfig;
  root: string;
  isSSR: boolean;
  evn: 'build' | 'serve';
}

export interface Route {
  path: string;
  element: React.ReactElement;
  filePath: string;
  preload: () => Promise<PageModule>;
  evn: 'build' | 'serve';
  githubRepositories: string;
}

export const CONVENTIONAL_ROUTE_ID = 'steppuzzle:routes';

export function pluginRoutes(options: PluginOptions): Plugin {
  const { githubRepositories } = options.siteConfig.siteData.other;
  const routerService = new RouteService(
    options.root,
    options.evn,
    githubRepositories
  );
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
        return routerService.generateRoutesCode(options.isSSR || false);
      }
    }
  };
}
