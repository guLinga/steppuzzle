import { App, initPageData } from './App';

import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { DataContent } from './hooks';

export async function render(pagePath: string) {
  const pageData = await initPageData(pagePath);
  return renderToString(
    <DataContent.Provider value={pageData}>
      <StaticRouter location={pagePath}>
        <App />
      </StaticRouter>
    </DataContent.Provider>
  );
}

export { routes } from 'steppuzzle:routes';
