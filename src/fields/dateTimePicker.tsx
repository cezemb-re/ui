import { ReactElement, useMemo, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import { formatRelativeDateTime, useClickOutside } from '@cezembre/fronts';
import DatePicker, { Props as DatePickerProps } from './datePicker';
import TimePicker from './timePicker';
import Button from '../general/button';

export type Props = DatePickerProps;

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
  buttonIcon = 'calendar',
  expanded = false,
  disablePast = false,
  disableToday = false,
  disableFuture = false,
  disableBefore,
  disableAfter,
  disabledDays,
  disabledPeriods,
}: Props): ReactElement {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const picker = useRef<HTMLDivElement>(null);

  useClickOutside(picker, () => setIsExpanded(false));

  const resolvedValue = useMemo<DateTime | null | undefined>(() => {
    return typeof value === 'string' ? DateTime.fromISO(value) : value;
  }, [value]);

  const actionLabel = useMemo<string>(() => {
    if (!resolvedValue) {
      return placeholder || 'Choisissez une date';
    }
    if (format && typeof format === 'string') {
      return resolvedValue.toFormat(format);
    }
    if (format && typeof format === 'function') {
      return format(resolvedValue);
    }
    return formatRelativeDateTime(resolvedValue);
  }, [format, placeholder, resolvedValue]);

  return (
    <div ref={picker} className="cezembre-ui-date-time-picker">
      {!expanded ? (
        <Button onClick={() => setIsExpanded(true)} shape="filled" leftIcon={buttonIcon}>
          {actionLabel}
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
            disablePast={disablePast}
            disableToday={disableToday}
            disableFuture={disableFuture}
            disableBefore={disableBefore}
            disableAfter={disableAfter}
            disabledDays={disabledDays}
            disabledPeriods={disabledPeriods}
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
