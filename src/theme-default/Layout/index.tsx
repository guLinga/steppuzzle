import { usePageData } from '../../runtime';
import Nav from '../components/Nav';
import 'virtual:uno.css';
import '../styles/base.css';
import '../styles/vars.css';
import { HomeLayout } from './HomeLayout';

export function Layout() {
  const pageData = usePageData();
  console.log('pageData', pageData);
  const { pageType } = pageData;
  const getContent = () => {
    if (pageType === 'home') {
      return <HomeLayout />;
    } else if (pageType === 'doc') {
      return <div>正文</div>;
    } else if (pageType === '404') {
      return <div>404</div>;
    }
  };
  return (
    <div>
      <Nav />
      {getContent()}
    </div>
  );
}
