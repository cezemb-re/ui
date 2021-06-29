import { ReactElement } from 'react';

export interface Props {
  size?: number;
  color?: string;
}

export default function Calendar({
  size = 20,
  color,
}: Props): ReactElement<SVGElement> {
  return (
    <svg viewBox="0 0 512.001 512.001" width={size} fill={color as string}>
      <title>Calendar</title>
      <path d="m15.001 421h75v45c0 8.284 6.716 15 15 15h392c8.284 0 15-6.716 15-15v-390c0-8.284-6.716-15-15-15h-75v-15c0-8.284-6.716-15-15-15s-15 6.716-15 15v15h-76v-15c0-8.284-6.716-15-15-15s-15 6.716-15 15v15h-75v-15c0-8.284-6.716-15-15-15s-15 6.716-15 15v15h-76c-8.284 0-15 6.716-15 15v90c0 110.55-45.945 195.596-84.603 228.477-4.852 4.043-6.651 10.691-4.502 16.63 2.151 5.938 7.789 9.893 14.105 9.893zm467 30h-362v-30h287c3.509 0 6.907-1.23 9.603-3.477 18.032-15.019 45.963-50.777 65.397-96.575zm-362-360h61v15c0 8.284 6.716 15 15 15s15-6.716 15-15v-15h75v15c0 8.284 6.716 15 15 15s15-6.716 15-15v-15h76v15c0 8.284 6.716 15 15 15s15-6.716 15-15v-15h60v60h-362zm-.257 89.99h361.991c-3.38 95.155-39.901 170.023-80.616 210.01h-351.999c46.133-58.781 68.149-135.318 70.624-210.01z" />
    </svg>
  );
}
