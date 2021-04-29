import React, { ReactElement } from 'react';

export interface Props {
  size?: number;
  color?: string;
}

export default function Delivery({
  color,
  size = 20,
}: Props): ReactElement<SVGElement> {
  return (
    <svg viewBox="0 0 512 512" width={size} fill={color as string}>
      <title>Delivery</title>
      <path d="m512 234.836-99.35-127.169h-56.316v-42.667h-356.334v328.667h60.409c4.666 30.165 30.806 53.333 62.258 53.333s57.592-23.168 62.258-53.333h142.151c4.665 30.165 30.806 53.333 62.257 53.333s57.592-23.168 62.258-53.333h60.409zm-89.667 149.164c0 18.196-14.804 33-33 33s-33-14.804-33-33 14.804-33 33-33 33 14.804 33 33zm-266.666 0c0 18.196-14.804 33-33 33s-33-14.804-33-33 14.804-33 33-33 33 14.804 33 33zm-33-63c-27.624 0-51.135 17.879-59.614 42.667h-33.053v-98h205.314l29.905-104.667h-235.219v-66h296.333v268.667h-144.052c-8.479-24.788-31.99-42.667-59.614-42.667zm-92.666-85.333v-44.667h195.447l-12.762 44.667zm359.332 85.333c-12.093 0-23.396 3.432-33 9.363v-75.363h125.667v108.667h-33.053c-8.478-24.788-31.99-42.667-59.614-42.667zm-33-96v-87.333h41.684l68.23 87.333z" />
    </svg>
  );
}
