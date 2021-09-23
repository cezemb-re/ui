import { ReactElement, ReactNode } from 'react';

export interface Props {
  children?: ReactNode;
  left?: number;
  top?: number;
  isActive?: boolean;
}

export default function Contextual({ children, left, top, isActive }: Props): ReactElement {
  return (
    <div
      className={`cezembre-ui-modals-contextual${isActive ? ' active' : ''}`}
      style={{ left, top }}>
      {children}
    </div>
  );
}
