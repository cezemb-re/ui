import React from 'react';
import Color from '../styles/colors';

export interface Props {
  size?: number;
  thickness?: number;
  color?: Color | string;
}

export default function Loader({
  size = 20,
  thickness = 3,
  color = '#fff',
}: Props): React.ReactElement {
  return (
    <div className="ui-loader" style={{ width: size, height: size }}>
      <div
        style={{
          borderColor: `${color} transparent transparent transparent`,
          borderWidth: thickness,
        }}
      />
    </div>
  );
}
