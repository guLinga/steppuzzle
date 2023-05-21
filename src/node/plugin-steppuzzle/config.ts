import { relative, join } from 'path';
import { Plugin, normalizePath } from 'vite';
import { SiteConfig } from 'shared/types/index';
import reSiteData from './reSiteData';
import sirv from 'sirv';
import fs from 'fs-extra';

const SITE_DATA_ID = 'steppuzzle:site-data'; // 匹配 App.tsx 中的 import siteData from 'steppuzzle:site-data';
import { PACKAGE_ROOT } from '../constants/index';

export function pluginConfig(
  config: SiteConfig,
  restartServer?: () => Promise<void>
): Plugin {
  return {
    name: 'steppuzzle:config',
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return '\0' + SITE_DATA_ID;
      }
    },
    load(id) {
      if (id === '\0' + SITE_DATA_ID) {
        return `export default ${JSON.stringify(reSiteData(config.siteData))}`;
      }
    },
    config() {
      return {
        resolve: {
          root: PACKAGE_ROOT,
          alias: {
            '@runtime': join(PACKAGE_ROOT, 'src', 'runtime', 'index.ts')
          }
        },
        css: {
          modules: {
            localsConvention: 'camelCaseOnly'
          }
        }
      };
    },
    async handleHotUpdate(ctx) {
      // 这里用 normalizePath 包裹一下，有时 config.configPath 与 ctx.file 的路径 中的 / \ 正好相反
      const customWatchedFiles = [normalizePath(config.configPath)];
      const include = (id: string) =>
        customWatchedFiles.some((file) => id.includes(file));

      // debugger;
      if (include(ctx.file)) {
        console.log(
          `\n${relative(config.root, ctx.file)} changed, restarting server...`
        );
        // 重启 Dev Server
        await restartServer();
      }
    },
    configureServer(server) {
      const publicDir = join(config.root, 'public');
      if (fs.existsSync(publicDir)) server.middlewares.use(sirv(publicDir));
    }
  };
}
