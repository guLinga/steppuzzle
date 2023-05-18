import { createRoot } from 'react-dom/client';
import { App, initPageData } from './App';
import { BrowserRouter } from 'react-router-dom';
import { DataContent } from './hooks';

async function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }
  // 初始化 PageData
  const pageData = await initPageData(location.pathname);

  createRoot(containerEl).render(
    <DataContent.Provider value={pageData}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataContent.Provider>
  );
}

renderInBrowser();
