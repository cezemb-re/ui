import { useEffect, useState } from 'react';
import { ReactElement } from 'react';
import { FieldComponentProps } from '@cezembre/forms';
import Icon from '../general/icon';

export interface Props {
  label?: string | null;
  placeholder?: string | null;
  instructions?: string | null;
  spellCheck?: boolean;
}

export default function Textarea({
  value,
  error,
  warning,
  isActive,
  visited,
  submitted,
  onFocus,
  name,
  onChange,
  onBlur,
  label = null,
  placeholder = null,
  instructions = null,
  spellCheck = true,
}: FieldComponentProps & Props): ReactElement {
  const [classNames, setClassNames] = useState<string[]>(['cezembre-ui-fields-textarea']);

  useEffect(() => {
    const nextClassNames = ['cezembre-ui-fields-textarea'];

    if (visited) {
      nextClassNames.push('visited');
    }

    if (isActive) {
      nextClassNames.push('active');
    }

    if (error) {
      nextClassNames.push('error');
    }

    setClassNames(nextClassNames);
  }, [error, isActive, visited]);

  return (
    <div className={classNames.join(' ')}>
      {label ? <label htmlFor={name}>{label}</label> : null}

      <textarea
        name={name}
        value={value || ''}
        placeholder={placeholder || ''}
        onFocus={onFocus}
        onChange={onChange}
        onBlur={onBlur}
        spellCheck={spellCheck}
      />

      {instructions ? <p className="instructions">{instructions}</p> : null}

      {(visited || submitted) && !isActive && error ? (
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
