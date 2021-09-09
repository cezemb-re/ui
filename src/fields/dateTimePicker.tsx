import { CSSProperties, ReactElement, useCallback, useRef, useState } from 'react';
import { FieldComponentProps } from '@cezembre/forms';
import { DateTime } from 'luxon';
import { formatRelativeDateTime, useClickOutside } from '@cezembre/fronts';
import DatePicker from './datePicker';
import TimePicker from './timePicker';
import Button from '../general/button';

export interface Props extends FieldComponentProps<DateTime | null> {
  placeholder?: string;
  format?: string | ((value: DateTime | null) => string);
  buttonStyle?: CSSProperties;
  expanded?: boolean;
}

export default function DateTimePicker({
  value,
  onChange,
  onBlur,
  onFocus,
  initialValue,
  isActive,
  isValid,
  hasChanged,
  error,
  warning,
  submitted,
  form,
  name,
  visited,
  placeholder,
  format,
  expanded = false,
  buttonStyle = {},
}: Props): ReactElement {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const picker = useRef<HTMLDivElement>(null);

  useClickOutside(picker, () => setIsExpanded(false));

  const getLabel = useCallback(() => {
    if (!value) {
      return placeholder || 'Chosissez une date';
    }
    if (format && typeof format === 'string') {
      return value.toFormat(format);
    }
    if (format && typeof format === 'function') {
      return format(value);
    }
    return formatRelativeDateTime(value);
  }, [format, placeholder, value]);

  return (
    <div ref={picker} className="cezembre-ui-fields-date-time-picker">
      {!expanded ? (
        <Button style={buttonStyle} onClick={() => setIsExpanded(true)}>
          {getLabel()}
        </Button>
      ) : null}

      <div className={`picker${!expanded ? ' expandable' : ''}${isExpanded ? ' expanded' : ''}`}>
        <div className="date">
          <DatePicker
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            initialValue={initialValue}
            isActive={isActive}
            isValid={isValid}
            hasChanged={hasChanged}
            error={error}
            warning={warning}
            submitted={submitted}
            form={form}
            name={name}
            visited={visited}
            expanded
          />
        </div>

        <div className="time">
          <TimePicker
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            initialValue={initialValue}
            isActive={isActive}
            isValid={isValid}
            hasChanged={hasChanged}
            error={error}
            warning={warning}
            submitted={submitted}
            form={form}
            name={name}
            visited={visited}
          />
        </div>
      </div>
    </div>
  );
}
