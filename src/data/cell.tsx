import { ReactElement } from 'react';
import { DateTime } from 'luxon';
import Model from './model';
import Type from './types';
import Datetime from '../general/datetime';
import Icon from '../general/icon';

export interface Props<M extends Model = Model> {
  value: any;
  item: M;
  type?: Type;
  Component?: (props: { value: any; item: M; type?: Type; options?: any }) => ReactElement;
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

export default function Cell<M extends Model = Model>({
  value,
  item,
  type = Type.AUTO,
  Component,
}: Props<M>): ReactElement | null {
  if (Component) {
    return <Component value={value} item={item} type={type} />;
  }

  let resolvedType: Type = type;

  if (type === Type.AUTO) {
    switch (typeof value) {
      case 'string':
        resolvedType = Type.TEXT;
        break;

      case 'object':
        if (DateTime.isDateTime(value) || value instanceof Date) {
          resolvedType = Type.DATE;
        } else {
          resolvedType = Type.UNKNOWN;
        }
        break;

      case 'boolean':
        resolvedType = Type.BOOLEAN;
        break;

      default:
        resolvedType = Type.UNKNOWN;
        break;
    }
  }

  let text: string;
  let datetime: DateTime;

  switch (resolvedType) {
    case Type.TEXT:
      if (typeof value === 'string') {
        text = value;
      } else if (typeof value === 'object') {
        if ('toString' in value && typeof value.toString === 'function' && value.toString) {
          text = value.toString();
        } else {
          return null;
        }
      } else {
        return null;
      }
      return <p className="text">{text}</p>;

    case Type.DATE:
    case Type.RELATIVE_DATE:
    case Type.TIME:
    case Type.RELATIVE_TIME:
    case Type.DATETIME:
    case Type.RELATIVE_DATETIME:
      if (DateTime.isDateTime(value)) {
        datetime = value;
      } else if (typeof value === 'string') {
        datetime = DateTime.fromISO(value);
      } else if (typeof value === 'object') {
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
            date={[Type.DATE, Type.RELATIVE_DATE, Type.DATETIME, Type.RELATIVE_DATETIME].includes(
              resolvedType,
            )}
            time={[Type.TIME, Type.RELATIVE_TIME, Type.DATETIME, Type.RELATIVE_DATETIME].includes(
              resolvedType,
            )}
            relative={[Type.RELATIVE_DATE, Type.RELATIVE_TIME, Type.RELATIVE_DATETIME].includes(
              resolvedType,
            )}
          />
        </span>
      );

    case Type.BOOLEAN:
      return (
        <p className="boolean">
          {value ? <Icon name="check" size={15} /> : <Icon name="cross" size={12} />}
        </p>
      );

    default:
      return null;
  }
}
