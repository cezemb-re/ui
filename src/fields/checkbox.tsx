import { useEffect, useState } from 'react';
import * as React from 'react';
import { FieldComponentProps } from '@cezembre/forms';
import Check from '../general/check';

export interface Props extends FieldComponentProps {
  label?: string;
  instructions?: string;
}

export default function Checkbox({
  value,
  error,
  warning,
  isActive,
  onFocus,
  name,
  onChange,
  onBlur,
  label = undefined,
  instructions = undefined,
}: Props): React.ReactElement {
  const [classNames, setClassNames] = useState<string[]>(['cezembre-ui-fields-checkbox']);

  useEffect(() => {
    const nextClassNames = ['cezembre-ui-fields-checkbox'];

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

  return (
    <div className={classNames.join(' ')}>
      <div className="container">
        <Check active={value as boolean} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
        {label ? <label htmlFor={name}>{label}</label> : null}
      </div>

      {instructions ? <p className="instructions">{instructions}</p> : null}

      {error ? (
        <div className="error">
          <i data-feather="alert" />
          <span>{error}</span>
        </div>
      ) : null}

      {warning ? (
        <div className="warning">
          <i data-feather="alert" />
          <span>{warning}</span>
        </div>
      ) : null}
    </div>
  );
}
