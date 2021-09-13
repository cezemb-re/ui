import { ReactElement, useCallback } from 'react';
import Model from './model';
import Cell from './cell';
import Type from './types';
import Icon from '../general/icon';

export interface Column<M extends Model = Model> {
  key: keyof M;
  title?: string;
  type?: Type;
  width?: string | number;
  sorted?: 'asc' | 'desc';
  onSort?: () => void;
  Cell?: (props: { value: any; item: M; type?: Type; options?: any }) => ReactElement;
}

export interface Props<M extends Model = Model> {
  columns: Column<M>[];
  data?: M[];
  onClickItem?: (item: M) => void;
  EmptyPlaceholder?: ReactElement;
  emptyLabel?: string;
}

export default function Table<M extends Model = Model>({
  columns,
  data = [],
  onClickItem = undefined,
  EmptyPlaceholder = undefined,
  emptyLabel = undefined,
}: Props<M>): ReactElement {
  const onClickRow = useCallback(
    (item: M) => {
      if (onClickItem) {
        onClickItem(item);
      }
    },
    [onClickItem],
  );

  if (!data || !data.length) {
    return EmptyPlaceholder ? (
      EmptyPlaceholder
    ) : (
      <div className="cezembre-ui-empty-table">
        <Icon name="inbox" size={50} width={1} />
        <p className="label">{emptyLabel || 'Aucune donnée'}</p>
      </div>
    );
  }

  return (
    <table
      className={`cezembre-ui-table${onClickItem ? ' clickable' : ''}`}
      cellSpacing="0"
      cellPadding="0">
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
