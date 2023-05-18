import { createContext, useContext } from 'react';
import { PageData } from 'shared/types';
export const DataContent = createContext({} as PageData);
export const usePageData = () => {
  return useContext(DataContent);
};
