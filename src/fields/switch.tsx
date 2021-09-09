import { useCallback, useEffect, useState } from 'react';
import { ReactElement } from 'react';
import { FieldComponentProps } from '@cezembre/forms';
import Icon from '../general/icon';

export interface Props {
  label?: string | null;
  instructions?: string | null;
}

export default function Switch({
  value,
  error,
  warning,
  isActive,
  onFocus,
  name,
  onChange,
  onBlur,
  label = null,
  instructions = null,
}: FieldComponentProps & Props): ReactElement {
  const [classNames, setClassNames] = useState<string[]>(['cezembre-ui-fields-switch']);

  useEffect(() => {
    const nextClassNames = ['cezembre-ui-fields-switch'];

    if (isActive) {
      nextClassNames.push('active');
    }

    if (error) {
      nextClassNames.push('error');
    }

    if (warning) {
      nextClassNames.push('warning');
    }

    setClassNames(nextClassNames);
  }, [error, isActive, warning]);

  const onClick = useCallback(() => {
    if (onChange) {
      onChange(!isActive);
    }
  }, [isActive, onChange]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (onChange && event.key === 'Enter') {
        onChange(!isActive);
      }
    },
    [isActive, onChange],
  );

  return (
    <div className={classNames.join(' ')}>
      <div className="container">
        <div
          className="button"
          role="button"
          aria-pressed={value as boolean}
          onKeyDown={onKeyDown}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          tabIndex={0}>
          <div className="status" />
        </div>
        {label ? <label htmlFor={name}>{label}</label> : null}
      </div>

      {instructions ? <p className="instructions">{instructions}</p> : null}

      {error ? (
        <div className="error">
          <Icon name="alert" />
          <span>{error}</span>
        </div>
      ) : null}

      {warning ? (
        <div className="warning">
          <Icon name="alert" />
          <span>{warning}</span>
        </div>
      ) : null}
    </div>
  );
}
