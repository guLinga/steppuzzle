import { usePageData } from '@runtime';
import { HomeHero } from '../../components/HomeHero/index';
import { HomeFeature } from '../../components/HomeFeature/index';

export function HomeLayout() {
  const { frontmatter, evn, githubRepositories } = usePageData();
  return (
    <div>
      <HomeHero
        hero={frontmatter.hero}
        evn={evn}
        githubRepositories={githubRepositories}
      />
      <HomeFeature
        features={frontmatter.features}
        evn={evn}
        githubRepositories={githubRepositories}
      />
    </div>
  );
}
