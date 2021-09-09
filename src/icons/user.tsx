import { ReactElement } from 'react';
import colors from '../styles/_colors.scss';
import IconProps from './props';

export default function User({
  size = 15,
  color = colors.TEXT,
}: IconProps): ReactElement<SVGElement> {
  return (
    <svg viewBox="0 0 512 512" width={size} fill={color}>
      <title>User</title>
      <path d="m407 331h-302c-57.897 0-105 47.103-105 105v45h512v-45c0-57.897-47.103-105-105-105zm-60 30v90h-182v-90zm-317 75c0-41.355 33.645-75 75-75h30v90h-105zm452 15h-105v-90h30c41.355 0 75 33.645 75 75z" />
      <path d="m256 301c74.439 0 135-60.561 135-135s-60.561-135-135-135-135 60.561-135 135 60.561 135 135 135zm103.842-150.587c-59.754-4.183-114.389-31.496-153.665-76.819 14.833-8.03 31.805-12.594 49.823-12.594 52.602 0 96.289 38.882 103.842 89.413zm-177.788-58.884c21.714 25.38 48.438 46.542 78.09 61.69 31.336 16.008 64.857 25.153 99.849 27.285-7.086 51.058-51.017 90.496-103.993 90.496-57.897 0-105-47.103-105-105 0-29.082 11.887-55.437 31.054-74.471z" />
    </svg>
  );
}
