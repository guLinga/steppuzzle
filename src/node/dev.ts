import { createServer as createViteDevServer } from 'vite';
import { pluginIndexHtml } from './plugin-steppuzzle/indexHtml';
import pluginReact from '@vitejs/plugin-react'; // 保持组件状态
import { PACKAGE_ROOT } from './constants';
import { resolveConfig } from './config';
import { pluginConfig } from './plugin-steppuzzle/config';
import { pluginRoutes } from './plugin-routes';

export async function createDevServer(
  root = process.cwd(),
  restartServer: () => Promise<void>
) {
  const siteConfig = await resolveConfig(root, 'serve', 'development');
  return createViteDevServer({
    root: PACKAGE_ROOT,
    plugins: [
      pluginIndexHtml(),
      pluginReact({
        jsxRuntime: 'automatic'
      }),
      pluginConfig(siteConfig, restartServer),
      pluginRoutes({
        root: siteConfig.root
      })
    ],
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}
