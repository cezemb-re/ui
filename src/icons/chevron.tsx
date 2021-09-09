import { ReactElement } from 'react';
import colors from '../styles/_colors.scss';
import IconProps from './props';

export default function Chevron({
  size = 15,
  color = colors.TEXT,
}: IconProps): ReactElement<SVGElement> {
  return (
    <svg viewBox="0 0 306 306" width={size} fill={color}>
      <title>Chevron</title>
      <polygon points="270.3,58.65 153,175.95 35.7,58.65 0,94.35 153,247.35 306,94.35" />
    </svg>
  );
}
