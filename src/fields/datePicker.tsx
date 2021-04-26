import React, {
  CSSProperties,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FieldComponentProps } from '@cezembre/forms';
import { DateTime } from 'luxon';
import useClickOutside from '../helpers/clickOutside';
import { formatRelativeDate } from '../helpers/time';
import Button from '../components/button';

export interface Props extends FieldComponentProps<DateTime | null> {
  placeholder?: string;
  format?: string | ((value: DateTime | null) => string);
  expanded?: boolean;
  buttonStyle?: CSSProperties;
  disableBefore?: DateTime;
  disableAfter?: DateTime;
}

const cells = new Array(42).fill(null);
const now = DateTime.now();

export default function DatePicker({
  value,
  onChange,
  expanded = false,
  buttonStyle = {},
  disableBefore = DateTime.now(),
  disableAfter,
  placeholder,
  format,
}: Props): ReactElement {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const picker = useRef<HTMLDivElement>(null);
  const [month, setMonth] = useState<DateTime>(
    (value && typeof value === 'object' ? value : now).startOf('month')
  );
  const [daysInMonth, setDaysInMonth] = useState<number>(30);
  const [weekOffset, setWeekOffset] = useState<number>(0);

  useClickOutside(picker, () => setIsExpanded(false));

  const previousMonth = useCallback(() => {
    setMonth((_month: DateTime) => _month.minus({ month: 1 }));
  }, []);

  const nextMonth = useCallback(() => {
    setMonth((_month: DateTime) => _month.plus({ month: 1 }));
  }, []);

  useEffect(() => {
    setDaysInMonth(month.daysInMonth);
    setWeekOffset(month.startOf('month').weekday - 1);
  }, [month]);

  const selectDay = useCallback(
    (day: number) => {
      let nextValue: DateTime;

      if (!value) {
        nextValue = DateTime.fromObject({
          year: month.year,
          month: month.month,
          day,
        });
      } else {
        nextValue = DateTime.fromObject({
          year: month.year,
          month: month.month,
          day,
          hour: value.hour,
          minute: value.minute,
          second: value.second,
          millisecond: value.millisecond,
        });
      }

      onChange(nextValue);
    },
    [month, onChange, value]
  );

  const isDisabled = useCallback((day: number): boolean => {
    // TODO : Disable check
    // if (disableBefore) {
    //   if (disableBefore > month) {
    //     return true;
    //   }
    // }
    return false;
  }, []);

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
    return formatRelativeDate(value);
  }, [format, placeholder, value]);

  return (
    <div ref={picker} className="ui-fields-date-picker">
      {!expanded ? (
        <Button style={buttonStyle} onClick={() => setIsExpanded(true)}>
          {getLabel()}
        </Button>
      ) : null}

      <div
        className={`picker${!expanded ? ' expandable' : ''}${
          isExpanded ? ' expanded' : ''
        }`}
      >
        <div className="month">
          <button onClick={previousMonth}>
            <i data-feather="arrow" />
          </button>

          <span>{month.toFormat('LLLL yyyy')}</span>

          <button onClick={nextMonth}>
            <i data-feather="arrow" />
          </button>
        </div>

        <div className="days-of-week">
          <span>Lu</span>
          <span>Ma</span>
          <span>Me</span>
          <span>Je</span>
          <span>Ve</span>
          <span>Sa</span>
          <span>Di</span>
        </div>

        <div className="days">
          {cells.map((_, cell: number) => {
            const day = cell - weekOffset + 1;

            if (day > 0 && day <= daysInMonth) {
              const selected =
                value &&
                typeof value === 'object' &&
                value.hasSame(month, 'year') &&
                value.hasSame(month, 'month') &&
                value.day === day;

              const disabled = isDisabled(day);

              return (
                <button
                  key={day.toString()}
                  id={day.toString()}
                  onClick={() => selectDay(day)}
                  disabled={disabled}
                  className={`day${selected ? ' selected' : ''}`}
                >
                  {day}
                </button>
              );
            }
            return <div className="placeholder" key={day.toString()} />;
          })}
        </div>
      </div>
    </div>
  );
}
