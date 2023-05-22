import { RouteService } from './RouteService';
import { describe, expect, test } from 'vitest';
import path from 'path';
import { normalizePath } from 'vite';

describe('RouteService', async () => {
  const testDir = normalizePath(path.join(__dirname, 'fixtures'));
  const routeService = new RouteService(testDir, 'build', 'step-build');
  await routeService.init();
  test('conventional route by file structre', () => {
    const routeMeta = routeService.getRouteMeta().map((item) => ({
      absolutePath: item.absoultePath.replaceAll(testDir, 'TEST_DIR')
    }));
    expect(routeMeta).toMatchInlineSnapshot(`
      [
        {
          "absolutePath": "TEST_DIR/a.md",
        },
        {
          "absolutePath": "TEST_DIR/guide/index.md",
        },
      ]
    `);
  });
  test('Generate routes code', async () => {
    expect(routeService.generateRoutesCode().replaceAll(testDir, 'TEST_DIR'))
      .toMatchInlineSnapshot(`
        "
              import React from 'react'
              import loadable from \\"@loadable/component\\";
              const Route0 = loadable(() => import('TEST_DIR/a.md'));
        const Route1 = loadable(() => import('TEST_DIR/guide/index.md'));
              export const routes = [
                {
                    path: '/step-build/a',
                    element: React.createElement(Route0),
                    preload: () => import('TEST_DIR/a.md'),
                    evn: 'build',
                    githubRepositories: 'step-build'
                  },{
                    path: '/step-build/guide/',
                    element: React.createElement(Route1),
                    preload: () => import('TEST_DIR/guide/index.md'),
                    evn: 'build',
                    githubRepositories: 'step-build'
                  }
              ]
              "
      `);
  });
});
