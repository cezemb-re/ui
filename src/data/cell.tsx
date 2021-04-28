import React, { ReactElement } from 'react';
import Model from './model';
import Type from './types';

export interface Props<M extends Model = Model> {
  value: any;
  item: M;
  type?: Type;
  Renderer?: (props: { value: any; item: M }) => ReactElement;
}

export default function Cell<M extends Model = Model>({
  value,
  item,
  Renderer,
}: Props<M>): ReactElement {
  if (Renderer) {
    return <Renderer value={value} item={item} />;
  }
  // TODO : Different styles for types
  return value;
}
