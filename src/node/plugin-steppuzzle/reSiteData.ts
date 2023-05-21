import { Sidebar, UserConfig } from 'shared/types';

export default function reSiteData(siteData: UserConfig): UserConfig {
  const {
    themeConfig: { nav, sidebar }
  } = siteData;
  const {
    other: { githubRepositories }
  } = siteData;
  if (!githubRepositories) return siteData;
  const reNav = nav.map((item) => {
    item.link = '/' + githubRepositories + item.link;
    return item;
  });
  const reSidebar: Sidebar = {};
  Object.keys(sidebar).forEach((sidebars) => {
    reSidebar[`/${githubRepositories}${sidebars}`] = sidebar[sidebars].map(
      (key) => {
        key.items = key.items.map((item) => {
          item.link = '/' + githubRepositories + item.link;
          return item;
        });
        return key;
      }
    );
  });
  siteData.themeConfig.nav = reNav;
  siteData.themeConfig.sidebar = reSidebar;
  return siteData;
}
