import { ReactElement } from 'react';

export interface Props {
  size?: number;
  color?: string;
}

export default function Chevron({
  color,
  size = 20,
}: Props): ReactElement<SVGElement> {
  return (
    <svg viewBox="0 0 306 306" width={size} fill={color as string}>
      <title>Chevron</title>
      <polygon points="270.3,58.65 153,175.95 35.7,58.65 0,94.35 153,247.35 306,94.35" />
    </svg>
  );
}
