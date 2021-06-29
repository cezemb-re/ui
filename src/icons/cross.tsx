import { ReactElement } from 'react';

export interface Props {
  size?: number;
  color?: string;
}

export default function Cross({
  color,
  size = 20,
}: Props): ReactElement<SVGElement> {
  return (
    <svg viewBox="0 0 22.88 22.88" width={size} fill={color as string}>
      <title>Cross</title>
      <path d="M0.324,1.909c-0.429-0.429-0.429-1.143,0-1.587c0.444-0.429,1.143-0.429,1.587,0l9.523,9.539l9.539-9.539c0.429-0.429,1.143-0.429,1.571,0c0.444,0.444,0.444,1.159,0,1.587l-9.523,9.524l9.523,9.539c0.444,0.429,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-9.539-9.539l-9.523,9.539c-0.444,0.429-1.143,0.429-1.587,0c-0.429-0.444-0.429-1.159,0-1.587l9.523-9.539L0.324,1.909z" />
    </svg>
  );
}
