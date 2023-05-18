import { usePageData } from '@runtime';
import { NavItemWithLink } from 'shared/types';
import styles from './index.module.scss';

export function MenuItem(item: NavItemWithLink) {
  return (
    <div className="text-sm font-medium mx-3">
      <a href={item.link} className={styles.link}>
        {item.text}
      </a>
    </div>
  );
}

export default function Nav() {
  const { siteData } = usePageData();
  const nav = siteData.themeConfig.nav || [];

  return (
    <header relative="~" w="full">
      <div flex="~" items="center" justify="between" className="px-8 h-14">
        <div>
          <a
            href="/"
            hover="opacity-60"
            className="w-full h-full text-1rem font-semibold flex items-center"
          >
            {siteData.title}
          </a>
        </div>
        <div flex="~">
          {/* 普通菜单 */}
          <div flex="~">
            {nav.map((item) => (
              <MenuItem {...item} key={item.text} />
            ))}
          </div>

          {/* 白天/夜间模式切换 */}
          {/* 下一节课介绍 */}

          {/* 相关链接 */}
          <div className={styles.socialLinkIcon} ml="2">
            <a href="/">
              <div className="i-carbon-logo-github w-5 h-5 fill-current"></div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
