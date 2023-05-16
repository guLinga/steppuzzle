import { RouteService } from './RouteService';
import { describe, expect, test } from 'vitest';
import path from 'path';
import { normalizePath } from 'vite';

describe('RouteService', async () => {
  const testDir = normalizePath(path.join(__dirname, 'fixtures'));
  const routeService = new RouteService(testDir);
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
            import Route0 from 'TEST_DIR/a.md'
      import Route1 from 'TEST_DIR/guide/index.md'
            export const routes = [
              {path: '/a', element: React.createElement(Route0)},{path: '/guide/', element: React.createElement(Route1)}
            ]
            "
    `);
  });
});
