import { ReactElement, useCallback } from 'react';
import Model from './model';
import Cell from './cell';
import Type from './types';

export interface Column<M extends Model = Model> {
  key: keyof M;
  title?: string;
  type?: Type;
  width?: string | number;
  sorted?: 'asc' | 'desc';
  onSort?: () => void;
  Cell?: (props: {
    value: any;
    item: M;
    type?: Type;
    options?: any;
  }) => ReactElement;
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
              <th key={column.key as string} style={{ width: column.width }}>
                {column.title}
              </th>
            ))}
          </tr>
        ) : null}
      </thead>

      <tbody>
        {data?.map((item: M) => (
          <tr key={item.id} onClick={() => onClickRow(item)}>
            {columns.map((column: Column<M>) => (
              <td key={column.key as string} width={column.width}>
                <Cell<M>
                  value={item[column.key]}
                  item={item}
                  type={column.type}
                  Component={column.Cell}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
