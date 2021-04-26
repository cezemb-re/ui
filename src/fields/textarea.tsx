import React, { useEffect, useState } from 'react';
import { FieldComponentProps } from '@cezembre/forms';

export interface Props {
  label?: string | null;
  placeholder?: string | null;
  instructions?: string | null;
  spellCheck?: boolean;
}

function Textarea({
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
}: FieldComponentProps & Props): React.ReactElement {
  const [classNames, setClassNames] = useState<string[]>([
    'ui-fields-textarea',
  ]);

  useEffect(() => {
    const nextClassNames = ['ui-fields-textarea'];

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

      <div className="container">
        <textarea
          name={name}
          value={value || ''}
          placeholder={placeholder || ''}
          onFocus={onFocus}
          onChange={onChange}
          onBlur={onBlur}
          spellCheck={spellCheck}
        />
      </div>

      {instructions ? <p className="instructions">{instructions}</p> : null}

      {(visited || submitted) && !isActive && error ? (
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

export default Textarea;
