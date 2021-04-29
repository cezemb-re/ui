import React, { ReactElement } from 'react';

export interface Props {
  size?: number;
  color?: string;
}

export default function Check({
  color,
  size = 20,
}: Props): ReactElement<SVGElement> {
  return (
    <svg viewBox="0 0 512 512" width={size} fill={color as string}>
      <title>Check</title>
      <path d="m450.585 68.552-252.065 252.065-137.105-137.104-61.415 61.415 198.52 198.52 313.48-313.48z" />
      <path d="m450.585 68.552-252.065 252.065-137.105-137.104-61.415 61.415 198.52 198.52 313.48-313.48z" />
    </svg>
  );
}
