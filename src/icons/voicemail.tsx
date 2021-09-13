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
      <title>voicemail</title>
      <circle cx="5.5" cy="11.5" r="4.5" />
      <circle cx="18.5" cy="11.5" r="4.5" />
      <line x1="5.5" y1="16" x2="18.5" y2="16" />
    </svg>
  );
}
