import { ReactElement } from 'react';
import { DateTime } from 'luxon';
import Datetime from '../general/datetime';
import Icon from '../general/icon';

export type Type =
  | 'auto'
  | 'unknown'
  | 'text'
  | 'number'
  | 'date'
  | 'relative-date'
  | 'datetime'
  | 'relative-datetime'
  | 'time'
  | 'relative-time'
  | 'boolean';

export interface Props {
  value: unknown;
  type?: Type;
}

/**
 * Cell
 * Handled types :
 * String
 * Number
 * Date
 * DateTime (luxon)
 * Object that contains toString() function
 */

export default function Cell({ value, type = 'auto' }: Props): ReactElement | null {
  let resolvedType: Type = type;

  if (value === null || value === undefined) {
    return null;
  }

  if (type === 'auto') {
    switch (typeof value) {
      case 'string':
        resolvedType = 'text';
        break;

      case 'number':
        resolvedType = 'number';
        break;

      case 'object':
        if (DateTime.isDateTime(value) || value instanceof Date) {
          resolvedType = 'date';
        } else {
          resolvedType = 'unknown';
        }
        break;

      case 'boolean':
        resolvedType = 'boolean';
        break;

      default:
        resolvedType = 'unknown';
        break;
    }
  }

  let text: string;
  let datetime: DateTime;

  switch (resolvedType) {
    case 'text':
      if (typeof value === 'string') {
        text = value;
      } else if (typeof value === 'object') {
        if (
          value &&
          'toString' in value &&
          typeof value.toString === 'function' &&
          value.toString
        ) {
          text = value.toString();
        } else {
          return null;
        }
      } else {
        return null;
      }
      return <span className="text">{text}</span>;

    case 'number':
      return <span className="number">{value as number}</span>;

    case 'date':
    case 'relative-date':
    case 'time':
    case 'relative-time':
    case 'datetime':
    case 'relative-datetime':
      if (DateTime.isDateTime(value)) {
        datetime = value;
      } else if (typeof value === 'string') {
        datetime = DateTime.fromISO(value);
      } else if (value && typeof value === 'object') {
        if (value instanceof Date) {
          datetime = DateTime.fromJSDate(value);
        } else {
          datetime = DateTime.fromObject(value);
        }
      } else {
        return null;
      }
      return (
        <span className="date">
          <Datetime
            value={datetime}
            date={['date', 'relative-date', 'datetime', 'relative-datetime'].includes(resolvedType)}
            time={['time', 'relative-time', 'datetime', 'relative-datetime'].includes(resolvedType)}
            relative={['relative-date', 'relative-time', 'relative-datetime'].includes(
              resolvedType,
            )}
          />
        </span>
      );

    case 'boolean':
      return (
        <span className="boolean">
          {value ? <Icon name="check" size={15} /> : <Icon name="x" size={15} />}
        </span>
      );

    default:
      return null;
  }
}
