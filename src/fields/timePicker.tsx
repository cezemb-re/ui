import { ReactElement, useCallback } from 'react';
import { DateTime } from 'luxon';
import { FieldComponentProps } from '@cezembre/forms';

export type Props = FieldComponentProps<DateTime | null>;

const hours = Array<null>(24).fill(null);
const minutes = Array<null>(60).fill(null);
// const seconds = Array<null>(60).fill(null);

export default function TimePickerField({ value, onChange }: Props): ReactElement {
  const selectHour = useCallback(
    (hour: number) => {
      let nextValue: DateTime;

      if (!value) {
        nextValue = DateTime.fromObject({ hour });
      } else {
        nextValue = DateTime.fromObject({
          year: value.year,
          month: value.month,
          day: value.day,
          hour,
          minute: value.minute,
          second: value.second,
          millisecond: value.millisecond,
        });
      }

      onChange(nextValue);
    },
    [onChange, value],
  );

  const selectMinute = useCallback(
    (minute: number) => {
      let nextValue: DateTime;

      if (!value) {
        nextValue = DateTime.fromObject({ minute });
      } else {
        nextValue = DateTime.fromObject({
          year: value.year,
          month: value.month,
          day: value.day,
          hour: value.hour,
          minute,
          second: value.second,
          millisecond: value.millisecond,
        });
      }

      onChange(nextValue);
    },
    [onChange, value],
  );

  return (
    <div className="cezembre-ui-time-picker">
      <div className="container">
        <ul>
          {hours.map((_, hour: number) => {
            const selected = value && value.hour === hour;

            return (
              <li key={hour.toString()}>
                <button onClick={() => selectHour(hour)} className={selected ? ' selected' : ''}>
                  {hour < 10 ? `0${hour}` : hour}
                </button>
              </li>
            );
          })}
        </ul>

        <ul>
          {minutes.map((_, minute: number) => {
            const selected = value && value.minute === minute;

            return (
              <li key={minute.toString()}>
                <button onClick={() => selectMinute(minute)} className={selected ? 'selected' : ''}>
                  {minute < 10 ? `0${minute}` : minute}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
