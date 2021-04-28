import React, { ReactElement, useCallback } from 'react';
import Model from './model';
import Cell from './cell';
import Type from './types';

export interface Column<M extends Model = Model> {
  key: keyof M;
  title?: string;
  type?: Type;
  sorted?: 'asc' | 'desc';
  onSort?: () => void;
  cellRenderer?: (props: { value: any; item: M }) => ReactElement;
}

export interface Props<M extends Model = Model> {
  columns?: Column<M>[];
  data?: M[];
  onClickItem?: (item: M) => void;
}

export default function Table<M extends Model = Model>({
  columns,
  data = [],
  onClickItem = undefined,
}: Props<M>): ReactElement | null {
  const onClickRow = useCallback(
    (item: M) => {
      if (onClickItem) {
        onClickItem(item);
      }
    },
    [onClickItem]
  );

  if (!columns) {
    return null;
  }
  return (
    <table
      className={`cezembre-ui-table${onClickItem ? ' clickable' : ''}`}
      cellSpacing="0"
      cellPadding="0"
    >
      <thead>
        {columns.length ? (
          <tr>
            {columns.map((column: Column<M>) => (
              <th key={column.key as string}>{column.title}</th>
            ))}
          </tr>
        ) : null}
      </thead>

      <tbody>
        {data?.map((item: M) => (
          <tr key={item.id} onClick={() => onClickRow(item)}>
            {columns.map((column: Column<M>) => (
              <td key={column.key as string}>
                <Cell<M>
                  value={item[column.key]}
                  item={item}
                  Renderer={column.cellRenderer}
                  type={column.type}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
