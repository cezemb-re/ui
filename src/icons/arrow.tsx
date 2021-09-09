import { ReactElement } from 'react';
import colors from '../styles/_colors.scss';
import IconProps from './props';

export default function Arrow({
  size = 15,
  color = colors.TEXT,
}: IconProps): ReactElement<SVGElement> {
  return (
    <svg viewBox="0 0 512 512" width={size} fill={color}>
      <title>Arrow</title>
      <path d="M506.134,241.843c-0.006-0.006-0.011-0.013-0.018-0.019l-104.504-104c-7.829-7.791-20.492-7.762-28.285,0.068c-7.792,7.829-7.762,20.492,0.067,28.284L443.558,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h423.557l-70.162,69.824c-7.829,7.792-7.859,20.455-0.067,28.284c7.793,7.831,20.457,7.858,28.285,0.068l104.504-104c0.006-0.006,0.011-0.013,0.018-0.019C513.968,262.339,513.943,249.635,506.134,241.843z" />
    </svg>
  );
}
