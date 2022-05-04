import { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import { FieldComponentProps } from '@cezembre/forms';
import { formatRelativeDate, useClickOutside } from '@cezembre/fronts';
import Icon, { IconName } from '../general/icon';
import Button from '../general/button';

export type DisabledDay = DateTime | string;

export interface Props extends FieldComponentProps<DateTime | string | null> {
  label?: string;
  placeholder?: string;
  format?: string | ((value?: DateTime | string | null) => string);
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

export default function DatePicker({
  label,
  name,
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

  const [today, setToday] = useState<DateTime>(DateTime.now());
  const [month, setMonth] = useState<DateTime>(
    (value && typeof value === 'object' ? value : today).startOf('month'),
  );

  useClickOutside(picker, () => setIsExpanded(false));

  useEffect(() => {
    const ticker = setInterval(() => {
      setToday(DateTime.now());
    }, 60000);
    return () => clearInterval(ticker);
  }, []);

  const previousMonth = useCallback(() => {
    setMonth((_month: DateTime) => _month.minus({ months: 1 }));
  }, []);

  const nextMonth = useCallback(() => {
    setMonth((_month: DateTime) => _month.plus({ months: 1 }));
  }, []);

  const resolvedValue = useMemo<DateTime | null | undefined>(() => {
    return typeof value === 'string' ? DateTime.fromISO(value) : value;
  }, [value]);

  const daysInMonth = useMemo<number>(() => month.daysInMonth, [month.daysInMonth]);
  const weekOffset = useMemo<number>(() => month.startOf('month').weekday - 1, [month]);

  const selectDay = useCallback(
    (day: number) => {
      if (!resolvedValue) {
        onChange(
          DateTime.fromObject({
            year: month.year,
            month: month.month,
            day,
          }),
        );
      } else {
        onChange(
          DateTime.fromObject({
            year: month.year,
            month: month.month,
            day,
            hour: resolvedValue.hour,
            minute: resolvedValue.minute,
            second: resolvedValue.second,
            millisecond: resolvedValue.millisecond,
          }),
        );
      }
    },
    [month.month, month.year, onChange, resolvedValue],
  );

  const resolvedDisabledDays = useMemo<DateTime[] | undefined>(
    () =>
      disabledDays?.map((disabledDay) =>
        typeof disabledDay === 'string' ? DateTime.fromISO(disabledDay) : disabledDay,
      ),
    [disabledDays],
  );

  const cells = useMemo<(Cell | null)[]>(() => {
    return new Array(42).fill(null).map((cell: Cell | null, index) => {
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
        notBefore = today;
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

      if (disableToday && today.hasSame(month, 'month') && day === today.day) {
        disabled = true;
      }

      let notAfter: DateTime | undefined;

      if (disableFuture) {
        notAfter = today;
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

      if (resolvedDisabledDays) {
        resolvedDisabledDays.forEach((disabledDay: DateTime) => {
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
    });
  }, [
    daysInMonth,
    disableAfter,
    disableBefore,
    disableFuture,
    disablePast,
    disableToday,
    disabledPeriods,
    month,
    resolvedDisabledDays,
    today,
    value,
    weekOffset,
  ]);

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
    return formatRelativeDate(resolvedValue);
  }, [format, placeholder, resolvedValue]);

  return (
    <div ref={picker} className="cezembre-ui-date-picker">
      {label ? <label htmlFor={name}>{label}</label> : null}

      {!expanded ? (
        <Button onClick={() => setIsExpanded(true)} leftIcon={buttonIcon} shape="filled">
          {actionLabel}
        </Button>
      ) : null}

      <div className={`picker${!expanded ? ' expandable' : ''}${isExpanded ? ' expanded' : ''}`}>
        <div className="month">
          <button onClick={previousMonth} type="button">
            <Icon name="chevron-left" size={12} />
          </button>

          <span>{month.toFormat('LLLL yyyy')}</span>

          <button onClick={nextMonth} type="button">
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
                  type="button"
                  key={cell.day}
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
