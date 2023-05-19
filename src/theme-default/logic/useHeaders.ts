import { useState, useEffect } from 'react';
import { Header } from 'shared/types';

export function useHeaders(initHeaders: Header[]) {
  const [headers, setHeaders] = useState(initHeaders);
  useEffect(() => {
    if (import.meta.env.DEV) {
      import.meta.hot.on(
        'mdx-changed',
        ({ filePath }: { filePath: string }) => {
          // console.log(filePath);
          // import(/* @vite-ignore */ `${filePath}?import&t=${Date.now()}`)
          //   .then(
          //     (module) => {
          //       console.log(module);
          //       // setHeaders(module.toc);
          //     }
          //   ).catch(err => {
          //     console.log('err', err);
          //   })
        }
      );
    }
  });
  return headers;
}
