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
      <title>layers</title>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
