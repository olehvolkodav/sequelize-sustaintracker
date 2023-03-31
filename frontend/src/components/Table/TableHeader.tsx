import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { ArrowDown, ArrowUp } from '../../assets/icons/table';
import { SortConfig } from '../../hooks/useSortedData';

import {
  HeaderCell,
  HeaderCellContent,
  HeaderCellSortIconsContainer,
  HeaderCellWrapper,
  HeaderRow,
} from './sTable';
import { ColumnDefinitionType, Id } from './types';

type TableHeaderProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
  sortBy: (config: SortConfig<K>) => void;
};

const TableHeader = <T extends Id, K extends keyof T>({
  columns,
  sortBy,
}: TableHeaderProps<T, K>): JSX.Element => {
  const [sortConfig, setSortConfig] = useState<SortConfig<K>>();

  const handleHeaderClick = useCallback(
    (key: K) =>
      setSortConfig((state) => {
        let reverse = false;
        if (state && state.key === key && !state.reverse) {
          reverse = true;
        }
        return { key, reverse };
      }),
    []
  );

  useEffect(() => sortConfig && sortBy(sortConfig), [sortConfig, sortBy]);

  const headers = useMemo(
    () =>
      columns.map((column, index) => {
        return (
          <HeaderCell
            key={`headerCell-${index}`}
            width={column.width}
            $highlight={column.highlightColumn}
          >
            <HeaderCellWrapper>
              <HeaderCellContent
                onClick={() =>
                  column.isSortable && handleHeaderClick(column.key)
                }
                $isSortable={column.isSortable}
                align={column.align}
              >
                <span>{column.header}</span>
                {column.isSortable && (
                  <HeaderCellSortIconsContainer
                    sorted={
                      sortConfig &&
                      sortConfig.key === column.key &&
                      (sortConfig.reverse ? 'asc' : 'desc')
                    }
                  >
                    <ArrowUp />
                    <ArrowDown />
                  </HeaderCellSortIconsContainer>
                )}
              </HeaderCellContent>
            </HeaderCellWrapper>
          </HeaderCell>
        );
      }),
    [columns, handleHeaderClick, sortConfig]
  );

  return (
    <thead>
      <HeaderRow>{headers}</HeaderRow>
    </thead>
  );
};

export default TableHeader;
