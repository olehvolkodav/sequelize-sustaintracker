import React, { createContext, useCallback, useContext, useState } from 'react';

import { data as dataMock } from '../mock/data';

import { Dataset } from './types';

interface DatasetContextData {
  datasets: Dataset[];
  fetchDatasets: () => Promise<void>;
}

const DatasetContext = createContext<DatasetContextData>(
  {} as DatasetContextData
);

export const DatasetProvider: React.FC = ({ children }) => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);

  const fetchDatasets = useCallback(async () => {
    // simulate API call
    setTimeout(() => setDatasets(dataMock), 1000);
  }, []);

  return (
    <DatasetContext.Provider
      value={{
        datasets,
        fetchDatasets,
      }}
    >
      {children}
    </DatasetContext.Provider>
  );
};

export function useDataset(): DatasetContextData {
  const context = useContext(DatasetContext);
  if (!context) {
    throw new Error('useDataset must be used within a DatasetProvider');
  }
  return context;
}
