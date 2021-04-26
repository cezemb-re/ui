import React, { ReactElement, useCallback } from 'react';

export interface Props {
  active: boolean;
  onChange?: ((value: boolean) => void) | null;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  tabIndex?: number;
  children?: React.ReactNode;
}

export default function Check({
  active = false,
  onChange,
  onFocus,
  onBlur,
  tabIndex = 0,
  children = null,
}: Props): ReactElement {
  const onClick = useCallback(() => {
    if (onChange) {
      onChange(!active);
    }
  }, [active, onChange]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (onChange && event.key === 'Enter') {
        onChange(!active);
      }
    },
    [active, onChange]
  );

  return (
    <div
      className={`ui-check${children ? ' tag' : ''}`}
      role="button"
      aria-pressed={active}
      onKeyDown={onKeyDown}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={tabIndex}
    >
      {children ? (
        <span>{children}</span>
      ) : (
        <svg
          height={12}
          viewBox="-50 -50 800 600"
          strokeDasharray={100}
          strokeDashoffset={0}
          strokeWidth={100}
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="transparent"
        >
          <path pathLength={100} d="M0,250L250,500L700,10" />
        </svg>
      )}
    </div>
  );
}
