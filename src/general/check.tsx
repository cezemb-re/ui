import { ReactNode, FocusEvent, KeyboardEvent, ReactElement, useCallback } from 'react';

export interface Props {
  active?: boolean;
  onChange?: (value: boolean) => void;
  onFocus?: (event: FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: FocusEvent<HTMLDivElement>) => void;
  tabIndex?: number;
  children?: ReactNode;
}

export default function Check({
  active,
  onChange,
  onFocus,
  onBlur,
  tabIndex = 0,
  children,
}: Props): ReactElement {
  const onClick = useCallback(() => {
    if (onChange) {
      onChange(!active);
    }
  }, [active, onChange]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (onChange && event.key === 'Enter') {
        onChange(!active);
      }
    },
    [active, onChange],
  );

  return (
    <div
      className={`cezembre-ui-check${children ? ' tag' : ''}`}
      role="button"
      aria-pressed={active}
      onKeyDown={onKeyDown}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={tabIndex}>
      {children ? (
        <span>{children}</span>
      ) : (
        <svg
          height={12}
          viewBox="-50 -50 800 600"
          strokeDasharray={100}
          strokeDashoffset={0}
          strokeWidth={100}
          stroke="#0f175a"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="transparent">
          <path pathLength={100} d="M0,250L250,500L700,10" />
        </svg>
      )}
    </div>
  );
}
