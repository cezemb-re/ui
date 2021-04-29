import React, { ReactElement } from 'react';

export interface Props {
  size?: number;
  color?: string;
}

export default function Alert({
  size = 20,
  color,
}: Props): ReactElement<SVGElement> {
  return (
    <svg viewBox="0 0 512.001 512.001" height={size} fill={color as string}>
      <title>Alert</title>
      <path d="M503.839,395.379l-195.7-338.962C297.257,37.569,277.766,26.315,256,26.315c-21.765,0-41.257,11.254-52.139,30.102L8.162,395.378c-10.883,18.85-10.883,41.356,0,60.205c10.883,18.849,30.373,30.102,52.139,30.102h391.398c21.765,0,41.256-11.254,52.14-30.101C514.722,436.734,514.722,414.228,503.839,395.379z M477.861,440.586c-5.461,9.458-15.241,15.104-26.162,15.104H60.301c-10.922,0-20.702-5.646-26.162-15.104c-5.46-9.458-5.46-20.75,0-30.208L229.84,71.416c5.46-9.458,15.24-15.104,26.161-15.104c10.92,0,20.701,5.646,26.161,15.104l195.7,338.962C483.321,419.836,483.321,431.128,477.861,440.586z" />
      <rect x="241.001" y="176.01" width="29.996" height="149.982" />
      <path d="M256,355.99c-11.027,0-19.998,8.971-19.998,19.998s8.971,19.998,19.998,19.998c11.026,0,19.998-8.971,19.998-19.998S267.027,355.99,256,355.99z" />
    </svg>
  );
}