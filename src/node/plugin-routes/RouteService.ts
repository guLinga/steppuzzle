import fastGlob from 'fast-glob';
import path from 'path';
import { normalizePath } from 'vite';

interface RouteMeta {
  routePath: string;
  absoultePath: string;
}

export class RouteService {
  #scanDir: string;
  #routeData: RouteMeta[] = [];
  constructor(scanDir: string) {
    this.#scanDir = scanDir;
  }
  async init() {
    // 扫描文件
    const files = fastGlob
      .sync(['**/*.{js,jsx,ts,tsx,md,mdx}'], {
        cwd: this.#scanDir,
        absolute: true,
        ignore: ['**/build/**', '**/.steppuzzle/**', 'config.ts']
      })
      .sort();
    files.forEach((file) => {
      // 相对路径
      const fileRelativePath = normalizePath(
        path.relative(this.#scanDir, file)
      );
      // console.log('fileRelativePath', fileRelativePath);
      // 路由路径
      const routePath = this.normallzeRoutePath(fileRelativePath);
      this.#routeData.push({
        routePath,
        absoultePath: file
      });
    });
  }
  generateRoutesCode(ssr = false, githubRepositories = '') {
    return `
      import React from 'react'
      ${ssr ? '' : 'import loadable from "@loadable/component";'}
      ${this.#routeData
        .map((route, index) => {
          return ssr
            ? `import Route${index} from "${route.absoultePath}";`
            : `const Route${index} = loadable(() => import('${route.absoultePath}'));`;
        })
        .join('\n')}
      export const routes = [
        ${this.#routeData.map((route, index) => {
          return `{path: '/${githubRepositories}${route.routePath}', element: React.createElement(Route${index}), preload: () => import('${route.absoultePath}')}`;
        })}
      ]
      `;
  }
  getRouteMeta(): RouteMeta[] {
    return this.#routeData;
  }
  normallzeRoutePath(raw: string) {
    const routePath = raw.replace(/\.(.*)?$/, '').replace(/index$/, '');
    return routePath.startsWith('/') ? routePath : `/${routePath}`;
  }
}
