import { ReactElement } from 'react';

export interface Props {
  size?: number;
  color?: string;
}

export default function Marker({
  color,
  size = 20,
}: Props): ReactElement<SVGElement> {
  return (
    <svg viewBox="0 0 327.85 500" width={size} fill={color as string}>
      <title>Marker</title>
      <path
        d="M163.89,0C73.49,0,0,73.53,0,163.93,0,247.1,62.3,316,142.63,326.44V500h42.51V326.44C265.47,316,327.81,247.1,327.81,163.93,327.81,73.53,254.28,0,163.89,0Zm0,285.35C97,285.35,42.46,230.8,42.46,163.93a121.43,121.43,0,1,1,242.85,0C285.31,230.8,230.9,285.35,163.89,285.35Z"
        transform="translate(0.04)"
      />
    </svg>
  );
}
