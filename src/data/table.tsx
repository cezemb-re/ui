import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import Model from './model';
import Cell, { Type } from './cell';
import Icon from '../general/icon';
import Check from '../general/check';
import Button, { Props as ButtonProps } from '../general/button';

export interface Column<M extends Model = Model> {
  key: string;
  label?: string;
  type?: Type;
  width?: string | number;
  sorted?: 'asc' | 'desc';
  onSort?: () => Promise<void> | void;
  Cell?: (props: { item: M }) => ReactElement;
}

export type Selection = string | string[] | undefined;

export interface ItemAction extends ButtonProps {
  key: string;
  onlySingle?: boolean;
}

export interface Props<M extends Model = Model> {
  columns: Column<M>[];
  data?: M[];
  EmptyPlaceholder?: ReactElement;
  emptyLabel?: string;
  onSelectItem?: (selection: Selection) => Promise<void> | void;
  selectionMode?: 'single' | 'multiple';
  defaultSelection?: Selection;
  itemActions?: ItemAction[];
}

export default function Table<M extends Model = Model>({
  columns,
  data = [],
  EmptyPlaceholder,
  emptyLabel,
  onSelectItem,
  selectionMode,
  defaultSelection,
  itemActions,
}: Props<M>): ReactElement {
  const className = useMemo<string>(() => {
    let res = 'cezembre-ui-data-table';
    if (onSelectItem || selectionMode) {
      res += ' clickable';
    }
    if (selectionMode) {
      res += ' selectable';
    }
    return res;
  }, [onSelectItem, selectionMode]);

  const [selection, setSelection] = useState<Selection>(defaultSelection);
  const [allSelected, setAllSelected] = useState<boolean>(false);

  const selectItem = useCallback(
    (id: string) => {
      (async () => {
        let nextSelection: Selection;
        let callback: Promise<void> | void | undefined;

        switch (selectionMode) {
          case 'multiple':
            if (!selection) {
              nextSelection = [id];
            } else if (typeof selection === 'string') {
              nextSelection = selection !== id ? [selection, id] : undefined;
            } else {
              const i = selection.findIndex((value) => value === id);
              if (i === -1) {
                nextSelection = [...selection, id];
              } else {
                nextSelection = [...selection];
                nextSelection.splice(i, 1);
              }
            }
            break;

          default:
            nextSelection = selection !== id ? id : undefined;
            break;
        }

        setSelection(nextSelection);

        if (onSelectItem) {
          callback = onSelectItem(nextSelection);
        }

        if (
          callback &&
          typeof callback === 'object' &&
          'then' in callback &&
          callback.then &&
          typeof callback.then === 'function'
        ) {
          await callback;
        }
      })();
    },
    [onSelectItem, selection, selectionMode],
  );

  useEffect(() => {
    if (!data || !data.length || !selection || !selection.length) {
      setAllSelected(false);
    } else {
      let diff = false;
      data.forEach(({ id }) => {
        if (!selection.includes(id)) {
          diff = true;
        }
      });
      setAllSelected(!diff);
    }
  }, [data, selection]);

  const selectAll = useCallback(
    (active: boolean) => {
      (async () => {
        const nextSelection = active && data && data.length ? data.map(({ id }) => id) : undefined;
        let callback: Promise<void> | void | undefined;
        setSelection(nextSelection);
        if (onSelectItem) {
          callback = onSelectItem(nextSelection);
        }
        if (
          callback &&
          typeof callback === 'object' &&
          'then' in callback &&
          callback.then &&
          typeof callback.then === 'function'
        ) {
          await callback;
        }
      })();
    },
    [data, onSelectItem],
  );

  if (!data || !data.length) {
    return (
      EmptyPlaceholder || (
        <div className="cezembre-ui-data-empty-table">
          <Icon name="inbox" size={50} width={1} />
          <span className="label">{emptyLabel || 'Aucune donnée'}</span>
        </div>
      )
    );
  }

  return (
    <div className={className}>
      <div className="header">
        {/* <div className="search"></div> */}

        <div className="menu">
          {itemActions && selection?.length ? (
            <div className="item-actions">
              {itemActions
                .filter((action) =>
                  Array.isArray(selection) && selection.length > 1 ? !action.onlySingle : true,
                )
                .map((action: ItemAction) => (
                  <div key={action.key} className="action">
                    <Button
                      href={action.href}
                      to={action.to}
                      onClick={action.onClick}
                      onFocus={action.onFocus}
                      type={action.type}
                      shape={action.shape}
                      size={action.size}
                      theme={action.theme}
                      disabled={action.disabled}
                      pending={action.pending}
                      active={action.active}
                      success={action.success}
                      errored={action.errored}
                      leftIcon={action.leftIcon}
                      rightIcon={action.rightIcon}>
                      {action.children}
                    </Button>
                  </div>
                ))}
              {Array.isArray(selection) && selection.length > 1 ? (
                <span className="count-selection">{selection.length} selectionnés</span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            {selectionMode ? (
              <th style={{ width: 40 }}>
                {selectionMode === 'multiple' ? (
                  <Check active={allSelected} onChange={selectAll} />
                ) : null}
              </th>
            ) : null}
            {columns.map((column: Column<M>) => (
              <th key={column.key as string} style={{ width: column.width }}>
                {column.label}
              </th>
            ))}
            {/* {actions?.length ? <th style={{ width: 40 }} /> : null} */}
          </tr>
        </thead>

        <tbody>
          {data?.map((item: M) => (
            <tr
              key={item.id}
              className={
                selection?.includes(item.id) || selection === item.id ? 'selected' : undefined
              }
              onClick={() => selectItem(item.id)}>
              {selectionMode ? (
                <td width={40}>
                  <div className="selection">
                    <Check active={selection?.includes(item.id) || selection === item.id} />
                  </div>
                </td>
              ) : null}
              {columns.map((column: Column<M>) => (
                <td key={column.key as string} width={column.width}>
                  {column.Cell ? (
                    <column.Cell item={item} />
                  ) : (
                    <Cell value={item[column.key]} type={column.type} />
                  )}
                </td>
              ))}
              {/* {actions?.length ? ( */}
              {/*  <td width={40}> */}
              {/*    <div className="actions"> */}
              {/*      <Icon name="more-vertical" /> */}
              {/*    </div> */}
              {/*  </td> */}
              {/* ) : null} */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
