/// <reference types="vite/client" />

declare module 'steppuzzle:site-data' {
  import type { UserConfig } from 'shared/types';
  const siteData: UserConfig;
  export default siteData;
}

declare module 'steppuzzle:routes' {
  import type { Route } from 'node/plugin-routes';
  import { declare } from '@babel/helper-plugin-utils';
  export const routes: Route[];
}

declare module '*.json'