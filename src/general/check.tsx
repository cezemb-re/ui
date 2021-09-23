import {
  ReactNode,
  FocusEvent,
  KeyboardEvent,
  ReactElement,
  useCallback,
  useState,
  useEffect,
} from 'react';
import Icon from './icon';

export interface Props {
  active: boolean;
  onChange?: (value: boolean) => void;
  onFocus?: (event: FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: FocusEvent<HTMLDivElement>) => void;
  tabIndex?: number;
  children?: ReactNode;
}

export default function Check({
  active = false,
  onChange,
  onFocus,
  onBlur,
  tabIndex = 0,
  children = undefined,
}: Props): ReactElement {
  const [classNames, setClassNames] = useState<(string | undefined)[]>([
    'cezembre-ui-check',
    children ? ' tag' : undefined,
  ]);

  useEffect(() => {
    const nextClassNames = ['cezembre-ui-check'];

    if (children) {
      nextClassNames.push('tag');
    }

    setClassNames(nextClassNames);
  }, [children]);

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
      className={classNames.filter(String).join(' ')}
      role="button"
      aria-pressed={active}
      onKeyDown={onKeyDown}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={tabIndex}>
      {children ? <span>{children}</span> : <Icon name="check" size={12} />}
    </div>
  );
}
