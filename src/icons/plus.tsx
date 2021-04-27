import React, { ReactElement } from 'react';

export interface Props {
  size?: number;
  color?: string;
}

export default function Plus({
  color,
  size = 20,
}: Props): ReactElement<SVGElement> {
  return (
    <svg height={size} viewBox="0 0 409.6 409.6" fill={color as string}>
      <title>Plus</title>
      <path d="M392.533,187.733H221.867V17.067C221.867,7.641,214.226,0,204.8,0s-17.067,7.641-17.067,17.067v170.667H17.067C7.641,187.733,0,195.374,0,204.8s7.641,17.067,17.067,17.067h170.667v170.667c0,9.426,7.641,17.067,17.067,17.067s17.067-7.641,17.067-17.067V221.867h170.667c9.426,0,17.067-7.641,17.067-17.067S401.959,187.733,392.533,187.733z" />
    </svg>
  );
}
