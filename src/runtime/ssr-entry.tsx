import { App } from './App';

import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

export function render() {
  return renderToString(
    <StaticRouter location={'/guide/a'}>
      <App />
    </StaticRouter>
  );
}
