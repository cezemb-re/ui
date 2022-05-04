import { ReactElement, useMemo, useCallback, useRef } from 'react';
import { FieldComponentProps } from '@cezembre/forms';
import { useClickOutside } from '@cezembre/fronts';
import _ from 'lodash';
import Icon from '../general/icon';

export interface SelectOption<V = unknown> {
  value: V;
  element?: ReactElement | string | number;
}

export interface SelectOptionProps<V = unknown> {
  option?: SelectOption<V>;
  placeholder?: string;
}

function SelectOptionComponent<V = unknown>({
  option,
  placeholder,
}: SelectOptionProps<V | undefined>): ReactElement | null {
  if (option?.element) {
    if (typeof option.element === 'string' || typeof option.element === 'number') {
      return <span>{option.element}</span>;
    }
    return option.element;
  }

  if (option?.value && typeof option.value === 'string' && option.value.length) {
    return <span>{option.value}</span>;
  }

  return <span className="placeholder">{placeholder || 'Selectioner une option'}</span>;
}

export interface Props<V = unknown> extends FieldComponentProps<V | undefined> {
  label?: string;
  options?: SelectOption<V>[];
  canReset?: boolean;
  instructions?: ReactElement | string;
}

export default function Select<V = unknown>({
  value,
  error,
  warning,
  isActive,
  onFocus,
  onBlur,
  name,
  onChange,
  label,
  options = [],
  canReset,
  instructions,
}: Props<V>): ReactElement {
  const className = useMemo<string>(() => {
    let res = 'cezembre-ui-select';

    if (isActive) {
      res += ' active';
    }

    if (error) {
      res += ' error';
    }

    if (warning) {
      res += ' warning';
    }
    return res;
  }, [error, isActive, warning]);

  const toggleFocus = useCallback(() => {
    if (!isActive) {
      onFocus();
    } else {
      onBlur();
    }
  }, [isActive, onBlur, onFocus]);

  const selectOption = useCallback(
    (_value: V) => {
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
    <div className={className}>
      {label && <label htmlFor={name}>{label}</label>}

      <div className="container">
        <button onClick={toggleFocus} type="button" className="selector">
          <SelectOptionComponent<V> option={{ value }} />
          <Icon name="chevron-down" />
        </button>
        <div className="options">
          {options?.map((option, index) => (
            <button
              type="button"
              key={
                typeof option.value === 'string' || typeof option.value === 'number'
                  ? option.value
                  : index
              }
              onClick={() => selectOption(option.value)}
              className={`option${_.isEqual(option.value, value) ? ' active' : ''}`}>
              <SelectOptionComponent<V> option={option} />
            </button>
          ))}
          {canReset ? (
            <button type="button" className="reset" onClick={() => onChange(undefined)}>
              <Icon name="x" />
            </button>
          ) : null}
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
