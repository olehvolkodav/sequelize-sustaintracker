import React, { useMemo } from 'react';

import { Body, Row, RowCell } from './sTable';
import { ColumnDefinitionType, Id } from './types';

type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
};

const TableRows = <T extends Id, K extends keyof T>({
  data,
  columns,
}: TableRowsProps<T, K>): JSX.Element => {
  const rows = useMemo(
    () =>
      data.map((row) => {
        return (
          <Row key={`row-${row.id}`}>
            {columns.map((column) => {
              const value = column.format
                ? column.format(row[column.key])
                : row[column.key];
              return (
                <RowCell
                  key={`cell-${row.id}-${column.key}`}
                  width={column.width}
                  $highlight={column.highlightColumn}
                  align={column.align}
                >
                  {column.customRender ? (
                    column.customRender(row.id, value)
                  ) : (
                    <span>{value}</span>
                  )}
                </RowCell>
              );
            })}
          </Row>
        );
      }),
    [data, columns]
  );

  return <Body>{rows}</Body>;
};

export default TableRows;
