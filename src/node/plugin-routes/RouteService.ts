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
        ignore: ['**/build/**', '**/.island/**', 'config.ts']
      })
      .sort();
    files.forEach((file) => {
      // 相对路径
      const fileRelativePath = normalizePath(
        path.relative(this.#scanDir, file)
      );
      console.log('fileRelativePath', fileRelativePath);
      // 路由路径
      const routePath = this.normallzeRoutePath(fileRelativePath);
      this.#routeData.push({
        routePath,
        absoultePath: file
      });
    });
  }
  generateRoutesCode() {
    return `
      import React from 'react'
      ${this.#routeData
        .map((route, index) => {
          return `import Route${index} from '${route.absoultePath}'`;
        })
        .join('\n')}
      export const routes = [
        ${this.#routeData.map((route, index) => {
          return `{path: '${route.routePath}', element: React.createElement(Route${index})}`;
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
