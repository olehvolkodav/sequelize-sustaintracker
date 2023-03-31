import { useCallback, useMemo, useState } from 'react';

import { sortBy as sortByUtil } from '../utils/object';

export interface SortConfig<K> {
  key: K;
  reverse: boolean;
}

interface UseSortedDataProps<T, K> {
  data: T[];
  initialConfig?: SortConfig<K>;
}

interface Response<T, K> {
  sortBy: (config: SortConfig<K>) => void;
  sortedData: T[];
}

const useSortedData = <T, K extends keyof T>({
  data,
  initialConfig,
}: UseSortedDataProps<T, K>): Response<T, K> => {
  const [sortConfig, setSortConfig] = useState(initialConfig);

  let result = useMemo(() => [...data], [data]);

  const sortedData = useMemo(() => {
    if (sortConfig) {
      const sorted = sortByUtil(data, sortConfig.key);
      if (sortConfig.reverse) return sorted.reverse();
      return sorted;
    }
    return data;
  }, [sortConfig, data]);

  result = [...sortedData];

  const sortBy = useCallback((config) => {
    setSortConfig(config);
  }, []);

  return {
    sortBy,
    sortedData: result,
  };
};

export default useSortedData;
