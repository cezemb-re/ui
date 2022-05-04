import { ReactElement } from 'react';

export type LoaderTheme = 'default' | 'light';

export interface Props {
  theme?: LoaderTheme;
  size?: number;
  thickness?: number;
}

export default function Loader({
  theme = 'default',
  size = 20,
  thickness = 3,
}: Props): ReactElement {
  return (
    <div className={`cezembre-ui-loader ${theme}`} style={{ width: size, height: size }}>
      <div style={{ borderWidth: thickness }} />
    </div>
  );
}
