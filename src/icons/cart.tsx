import { ReactElement } from 'react';
import colors from '../styles/_colors.scss';
import IconProps from './props';

export default function Cart({
  size = 15,
  color = colors.TEXT,
}: IconProps): ReactElement<SVGElement> {
  return (
    <svg viewBox="0 -11 512 511" width={size} fill={color}>
      <title>Cart</title>
      <path d="m362.324219 148.09375v-41.269531c0-58.628907-47.695313-106.324219-106.324219-106.324219s-106.324219 47.695312-106.324219 106.324219v41.269531h-149.675781l66.800781 342.355469h378.398438l66.800781-342.355469zm-182.648438-41.269531c0-42.085938 34.238281-76.324219 76.324219-76.324219s76.324219 34.238281 76.324219 76.324219v41.269531h-152.648438zm240.808594 353.625h-328.96875l-55.09375-282.355469h113.253906v52.378906h-16.578125v30h63.15625v-30h-16.578125v-52.378906h152.648438v52.378906h-16.578125v30h63.15625v-30h-16.578125v-52.378906h113.253906zm0 0" />
    </svg>
  );
}
