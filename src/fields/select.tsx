import { ReactNode, ReactElement, useState, useEffect, useCallback, useRef } from 'react';
import _ from 'lodash';
import { FieldComponentProps } from '@cezembre/forms';
import { useClickOutside } from '@cezembre/fronts';
import Button from '../general/button';
import Icon, { IconName } from '../general/icon';

export enum Type {
  DROPDOWN = 'dropdown',
  FLAT = 'flat',
}

export interface Option<Value = any> {
  value: Value;
  label: string;
  icon?: IconName;
}

export interface Props {
  type?: Type;
  label?: string | null;
  options?: Option[];
  placeholder?: string | null;
  instructions?: ReactNode | null;
  icon?: IconName;
  iconSize?: number;
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
  label = null,
  options = [],
  placeholder = null,
  instructions = null,
  icon = undefined,
  iconSize = undefined,
}: FieldComponentProps & Props): ReactElement {
  const [classNames, setClassNames] = useState<string[]>(['cezembre-ui-fields-select', type]);
  const [currentIcon, setCurrentIcon] = useState<IconName | undefined>(icon);

  useEffect(() => {
    const nextClassNames = ['cezembre-ui-fields-select', type];

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

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);

  useEffect(() => {
    if (value !== undefined) {
      const i = _.findIndex(options, (option) => option.value === value);
      if (i !== -1) {
        setSelectedOptionIndex(i);
        if ('icon' in options[i] && options[i].icon) {
          setCurrentIcon(options[i].icon);
        }
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
      if ('icon' in options[index] && options[index].icon) {
        setCurrentIcon(options[index].icon);
      }
      onChange(_value);
      onBlur();
    },
    [onBlur, onChange, options],
  );

  const selectRef = useRef<HTMLDivElement>(null);

  const clickOutside = useCallback(() => {
    if (isActive) {
      onBlur();
    }
  }, [isActive, onBlur]);

  useClickOutside(selectRef, clickOutside);

  return (
    <div className={classNames.join(' ')} ref={selectRef}>
      {label ? <label htmlFor={name}>{label}</label> : null}

      <div className="container">
        <div className="button">
          <Button
            style={{ width: '100%' }}
            onClick={toggleFocus}
            rightIcon="arrow"
            leftIcon={currentIcon}>
            {selectedOptionIndex !== -1
              ? options[selectedOptionIndex].label
              : placeholder || 'Choisissez une option'}
          </Button>
        </div>

        <div className="options">
          {options.map((option, index) => (
            <div className="option" key={option.value}>
              <Button
                onClick={() => selectOption(index, option.value)}
                style={{ width: '100%' }}
                rightIcon={index === selectedOptionIndex ? 'check' : undefined}>
                {option.label}
              </Button>
            </div>
          ))}
        </div>
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
