import React, { useRef } from 'react';

import useSortedData from '../../hooks/useSortedData';
import Loader from '../Loader/Loader';

import { Container, LoaderContainer } from './sTable';
import TableHeader from './TableHeader';
import TableRows from './TableRows';
import { ColumnDefinitionType, Id } from './types';

type TableProps<T, K extends keyof T> = {
  id?: string;
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  loading?: boolean;
};

const Table = <T extends Id, K extends keyof T>({
  id,
  data,
  columns,
  loading,
}: TableProps<T, K>): JSX.Element => {
  const tableRef = useRef<HTMLDivElement>(null);

  const { sortedData, sortBy } = useSortedData({ data });

  return (
    <Container id={id} ref={tableRef}>
      <table>
        <TableHeader columns={columns} sortBy={sortBy} />
        {loading ? (
          <tbody>
            <tr>
              <td colSpan={columns.length}>
                <LoaderContainer>
                  <Loader />
                </LoaderContainer>
              </td>
            </tr>
          </tbody>
        ) : (
          <TableRows columns={columns} data={sortedData} />
        )}
      </table>
    </Container>
  );
};

export default Table;
