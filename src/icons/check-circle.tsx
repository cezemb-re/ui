import { ReactElement } from 'react';
import colors from '../styles/_colors.scss';
import IconProps from './props';

export default function ({
  size = 15,
  width = 2,
  color = colors.TEXT,
}: IconProps): ReactElement<SVGElement> {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke={color}
      fill="none"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round">
      <title>check-circle</title>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
