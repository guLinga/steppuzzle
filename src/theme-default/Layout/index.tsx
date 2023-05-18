// import { Content } from '@runtime';
import { usePageData } from '../../runtime';
import 'virtual:uno.css';
export function Layout() {
  const pageData = usePageData();
  console.log('pageData', pageData);
  const { pageType } = pageData;
  const getContent = () => {
    if (pageType === 'home') {
      return <div>主页</div>;
    } else if (pageType === 'doc') {
      return <div>正文</div>;
    } else if (pageType === '404') {
      return <div>404</div>;
    }
  };
  return (
    <div>
      <div>Nav</div>
      {getContent()}
    </div>
  );
}
