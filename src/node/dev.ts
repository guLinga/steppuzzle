import { createServer as createViteDevServer } from 'vite';
import { PACKAGE_ROOT } from './constants';
import { resolveConfig } from './config';
import { createVitePlugins } from './vitePlugins';

export async function createDevServer(
  root = process.cwd(),
  restartServer: () => Promise<void>
) {
  const siteConfig = await resolveConfig(root, 'serve', 'development');
  return createViteDevServer({
    root: PACKAGE_ROOT,
    plugins: await createVitePlugins(siteConfig, 'serve', restartServer),
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}
