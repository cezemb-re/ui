import { ReactElement, useEffect, useState } from 'react';
import { FieldComponentProps } from '@cezembre/forms';
import Icon from '../general/icon';

export interface Props extends FieldComponentProps<string | number | null> {
  label?: string;
  placeholder?: string;
  instructions?: string;
  spellCheck?: boolean;
}

export default function TextareaField({
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
  label,
  placeholder,
  instructions,
  spellCheck = true,
}: Props): ReactElement {
  const [classNames, setClassNames] = useState<string[]>(['cezembre-ui-textarea']);

  useEffect(() => {
    const nextClassNames = ['cezembre-ui-textarea'];

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
          <Icon name="alert-triangle" size={15} />
          <span>{error}</span>
        </div>
      ) : null}

      {warning ? (
        <div className="warning">
          <Icon name="alert-triangle" size={15} />
          <span>{warning}</span>
        </div>
      ) : null}
    </div>
  );
}
