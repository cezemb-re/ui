import { ReactElement } from 'react';

export interface Props {
  size?: number;
  thickness?: number;
  loaderStyle?: 'light' | 'dark';
}

export default function Loader({
  size = 20,
  thickness = 2,
  loaderStyle = 'light',
}: Props): ReactElement {
  return (
    <div
      className={`cezembre-ui-loader ${loaderStyle}`}
      style={{ width: size, height: size, borderWidth: thickness }}
    />
  );
}
