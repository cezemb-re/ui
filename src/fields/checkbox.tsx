import { ReactElement, useEffect, useState } from 'react';
import { FieldComponentProps } from '@cezembre/forms';
import Check from '../general/check';
import Icon from '../general/icon';

export interface Props extends FieldComponentProps<boolean> {
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
}: Props): ReactElement {
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
        <Check active={value || false} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
        {label ? <label htmlFor={name}>{label}</label> : null}
      </div>

      {instructions ? <p className="instructions">{instructions}</p> : null}

      {error ? (
        <div className="error">
          <Icon name="alert-triangle" />
          <span>{error}</span>
        </div>
      ) : null}

      {warning ? (
        <div className="warning">
          <Icon name="alert-triangle" />
          <span>{warning}</span>
        </div>
      ) : null}
    </div>
  );
}
