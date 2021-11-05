import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import { FieldComponentProps } from '@cezembre/forms';
import { formatRelativeDate, useClickOutside } from '@cezembre/fronts';
import Icon, { IconName } from '../general/icon';
import Button from '../general/button';

export type DisabledDay = DateTime | string;

export interface Props extends FieldComponentProps<DateTime | null> {
  placeholder?: string;
  format?: string | ((value: DateTime | null | undefined) => string);
  expanded?: boolean;
  buttonIcon?: IconName;
  disablePast?: boolean;
  disableBefore?: DateTime;
  disableFuture?: boolean;
  disableAfter?: DateTime;
  disableToday?: boolean;
  disabledDays?: DisabledDay[];
  disabledPeriods?: DisabledDay[][];
}

interface Cell {
  day: number;
  selected?: boolean;
  disabled?: boolean;
}

export default function DatePickerField({
  value,
  onChange,
  expanded = false,
  buttonIcon = 'calendar',
  placeholder,
  format,
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

  const [now, setNow] = useState<DateTime>(DateTime.now());

  const [month, setMonth] = useState<DateTime>(
    (value && typeof value === 'object' ? value : now).startOf('month'),
  );
  const [daysInMonth, setDaysInMonth] = useState<number>(30);
  const [weekOffset, setWeekOffset] = useState<number>(0);

  const [cells, setCells] = useState<(Cell | null)[]>(new Array(42).fill(null));

  useClickOutside(picker, () => setIsExpanded(false));

  useEffect(() => {
    const ticker = setInterval(() => {
      setNow(DateTime.now());
    }, 60000);
    return () => clearInterval(ticker);
  }, []);

  const previousMonth = useCallback(() => {
    setMonth((_month: DateTime) => _month.minus({ months: 1 }));
  }, []);

  const nextMonth = useCallback(() => {
    setMonth((_month: DateTime) => _month.plus({ months: 1 }));
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
    [month, onChange, value],
  );

  useEffect(() => {
    setCells((c) =>
      c.map((cell: Cell | null, index) => {
        const day = index - weekOffset + 1;

        if (day <= 0 || day > daysInMonth) {
          return null;
        }

        const selected = !!(
          value &&
          typeof value === 'object' &&
          value.hasSame(month, 'year') &&
          value.hasSame(month, 'month') &&
          value.day === day
        );

        let disabled = false;

        let notBefore: DateTime | undefined;

        if (disablePast) {
          notBefore = now;
        }

        if (disableBefore && (!notBefore || notBefore < disableBefore)) {
          notBefore = disableBefore;
        }

        if (notBefore) {
          if (month < notBefore.startOf('month')) {
            disabled = true;
          } else if (month.hasSame(notBefore, 'month') && notBefore.day > day) {
            disabled = true;
          }
        }

        if (disableToday && now.hasSame(month, 'month') && day === now.day) {
          disabled = true;
        }

        let notAfter: DateTime | undefined;

        if (disableFuture) {
          notAfter = now;
        }

        if (disableAfter && (!notAfter || notAfter < disableAfter)) {
          notAfter = disableAfter;
        }

        if (notAfter) {
          if (month > notAfter.startOf('month')) {
            disabled = true;
          } else if (month.hasSame(notAfter, 'month') && notAfter.day < day) {
            disabled = true;
          }
        }

        if (disabledDays) {
          disabledDays.forEach((disabledDay: DisabledDay) => {
            if (typeof disabledDay === 'string') {
              disabledDay = DateTime.fromISO(disabledDay);
            }
            if (disabledDay.hasSame(month, 'month') && disabledDay.day === day) {
              disabled = true;
            }
          });
        }

        if (disabledPeriods) {
          disabledPeriods.forEach((disabledPeriod: DisabledDay[]) => {
            if (disabledPeriod.length !== 2) {
              return;
            }
            let [from, to] = disabledPeriod;

            if (typeof from === 'string') {
              from = DateTime.fromISO(from);
            }

            if (typeof to === 'string') {
              to = DateTime.fromISO(to);
            }

            if (
              (from < month || (from.hasSame(month, 'month') && from.day <= day)) &&
              (to > month.endOf('month') || (to.hasSame(month, 'month') && to.day >= day))
            ) {
              disabled = true;
            }
          });
        }

        return { day, selected, disabled };
      }),
    );
  }, [
    daysInMonth,
    disableAfter,
    disableBefore,
    disableFuture,
    disablePast,
    disableToday,
    disabledDays,
    disabledPeriods,
    month,
    now,
    value,
    weekOffset,
  ]);

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
    <div ref={picker} className="cezembre-ui-date-picker">
      {!expanded ? (
        <Button
          type="button"
          styleType="outlined"
          onClick={() => setIsExpanded(true)}
          leftIcon={buttonIcon}>
          {getLabel()}
        </Button>
      ) : null}

      <div className={`picker${!expanded ? ' expandable' : ''}${isExpanded ? ' expanded' : ''}`}>
        <div className="month">
          <button onClick={previousMonth}>
            <Icon name="chevron-left" size={12} />
          </button>

          <span>{month.toFormat('LLLL yyyy')}</span>

          <button onClick={nextMonth}>
            <Icon name="chevron-right" size={12} />
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
          {cells.map((cell: Cell | null, index) => {
            if (cell) {
              return (
                <button
                  key={index.toString()}
                  onClick={() => selectDay(cell.day)}
                  disabled={cell.disabled}
                  className={`day${cell.selected ? ' selected' : ''}`}>
                  {cell.day}
                </button>
              );
            }
            return <div className="placeholder" key={index.toString()} />;
          })}
        </div>
      </div>
    </div>
  );
}
