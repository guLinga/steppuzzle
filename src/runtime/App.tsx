import { Layout } from '../theme-default';
import siteData from 'steppuzzle:site-data';
import { PageData } from 'shared/types';
import { routes } from 'steppuzzle:routes';
import { matchRoutes } from 'react-router-dom';

export function App() {
  return <Layout />;
}

export async function initPageData(routePath: string): Promise<PageData> {
  // 获取路由组件编译后的模块内容
  const matched = matchRoutes(routes, routePath);
  if (matched) {
    // Preload route component
    // 待补充信息: preload 方法
    const route = matched[0].route;
    const moduleInfo = await route.preload();
    return {
      pageType: moduleInfo.frontmatter?.pageType ?? 'doc',
      siteData,
      frontmatter: moduleInfo.frontmatter,
      pagePath: routePath,
      toc: moduleInfo.toc
    };
  }
  return {
    pageType: '404',
    siteData,
    pagePath: routePath,
    frontmatter: {}
  };
}
