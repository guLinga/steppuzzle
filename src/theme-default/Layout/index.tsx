import { usePageData } from '../../runtime';
import Nav from '../components/Nav';
import 'virtual:uno.css';
import '../styles/base.css';
import '../styles/vars.css';
import { HomeLayout } from './HomeLayout';
import { DocLayout } from './DocLayout';
import '../styles/base.css';
import '../styles/vars.css';
import '../styles/doc.css';

export function Layout() {
  const pageData = usePageData();
  // console.log('pageData', pageData);
  const { pageType } = pageData;
  const getContent = () => {
    if (pageType === 'home') {
      return <HomeLayout />;
    } else if (pageType === 'doc') {
      return <DocLayout />;
    } else if (pageType === '404') {
      return <div>404</div>;
    }
  };
  return (
    <div>
      <Nav />
      <section
        style={{
          paddingTop: 'var(--steppuzzle-nav-height)'
        }}
      >
        {getContent()}
      </section>
    </div>
  );
}
