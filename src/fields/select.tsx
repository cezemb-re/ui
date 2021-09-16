import { ReactNode, ReactElement, useState, useEffect, useCallback, useRef } from 'react';
import _ from 'lodash';
import { FieldComponentProps } from '@cezembre/forms';
import { useClickOutside } from '@cezembre/fronts';
import Button from '../general/button';
import Icon from '../general/icon';

export enum Type {
  DROPDOWN = 'dropdown',
  FLAT = 'flat',
}

export interface Option<Value = any> {
  value: Value;
  item?: ReactElement | string;
}

export interface CellProps {
  option?: Option;
  placeholder?: ReactElement | string;
}

function Cell({ placeholder, option }: CellProps): ReactElement {
  if (option?.item) {
    if (typeof option.item === 'string') {
      return <span>{option.item}</span>;
    }
    return option.item;
  }

  if (option?.value && typeof option.value === 'string' && option.value.length) {
    return <span>{option.value}</span>;
  }

  if (placeholder) {
    if (typeof placeholder === 'string') {
      return <span className="placeholder">{placeholder}</span>;
    }
    return placeholder;
  }

  return <span className="placeholder">Choisissez une option</span>;
}

export interface Props extends FieldComponentProps {
  type?: Type;
  label?: string;
  options?: Option[];
  placeholder?: ReactElement | string;
  instructions?: ReactElement | string;
}

export default function Select({
  value,
  error,
  warning,
  isActive,
  onFocus,
  name,
  onChange,
  onBlur,
  type = Type.DROPDOWN,
  label = undefined,
  options = [],
  placeholder = undefined,
  instructions = undefined,
}: Props): ReactElement {
  const [classNames, setClassNames] = useState<(string | undefined)[]>([
    'cezembre-ui-fields-select',
    type,
    isActive ? 'isActive' : undefined,
    error ? 'error' : undefined,
    warning ? 'warning' : undefined,
  ]);

  useEffect(() => {
    const nextClassNames = [
      'cezembre-ui-fields-select',
      type,
      isActive ? 'isActive' : undefined,
      error ? 'error' : undefined,
      warning ? 'warning' : undefined,
    ];

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
  }, [error, isActive, type, warning]);

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | undefined>();

  useEffect(() => {
    if (value !== undefined) {
      const i = _.findIndex(options, (option) => option.value === value);
      if (i !== -1) {
        setSelectedOptionIndex(i);
      }
    }
  }, [value, options]);

  const toggleFocus = useCallback(() => {
    if (!isActive) {
      onFocus();
    } else {
      onBlur();
    }
  }, [isActive, onBlur, onFocus]);

  const selectOption = useCallback(
    (index, _value) => {
      setSelectedOptionIndex(index);
      onChange(_value);
      onBlur();
    },
    [onBlur, onChange],
  );

  const selectRef = useRef<HTMLDivElement>(null);

  const clickOutside = useCallback(() => {
    if (isActive) {
      onBlur();
    }
  }, [isActive, onBlur]);

  useClickOutside(selectRef, clickOutside);

  return (
    <div className={classNames.filter(String).join(' ')} ref={selectRef}>
      {label && <label htmlFor={name}>{label}</label>}

      <div className="container">
        <button onClick={toggleFocus}>
          <Cell
            option={selectedOptionIndex !== undefined ? options[selectedOptionIndex] : undefined}
            placeholder={placeholder}
          />
          <Icon name="chevron-down" />
        </button>

        <div className="options">
          {options?.map((option, index) => (
            <button
              key={option.value}
              className={`option${selectedOptionIndex === index ? ' active' : ''}`}
              onClick={() => selectOption(index, option.value)}>
              <Cell option={option} />
            </button>
          ))}
        </div>
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
