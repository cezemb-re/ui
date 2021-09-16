import { ReactElement } from 'react';
import IconProps from './props';

export default function ({ size = 15, width = 2 }: IconProps): ReactElement<SVGElement> {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke="black"
      fill="none"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round">
      <title>divide-circle</title>
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="12" y1="16" x2="12" y2="16" />
      <line x1="12" y1="8" x2="12" y2="8" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}