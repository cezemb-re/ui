import React, { ReactElement, ReactNode, useEffect, useState } from 'react';

export interface Props {
  children?: ReactNode;
  visible?: boolean;
  closed?: boolean;
}

export default function Overlay({
  children,
  visible = false,
  closed = false,
}: Props): ReactElement {
  const [classNames, setClassNames] = useState<string[]>([
    'cezembre-ui-overlay',
  ]);

  useEffect(() => {
    const nextClassNames = ['cezembre-ui-overlay'];

    if (visible) {
      nextClassNames.push('visible');
    }

    if (closed) {
      nextClassNames.push('closed');
    }

    setClassNames(nextClassNames);
  }, [visible, closed]);

  return <div className={classNames.join(' ')}>{children}</div>;
}
