import { Layout } from '../theme-default/Layout';
import siteData from 'steppuzzle:site-data';

export function App() {
  console.log('siteData', siteData);
  return <Layout />;
}
