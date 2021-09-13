import { ReactElement } from 'react';
import colors from '../styles/_colors.scss';
import IconProps from './props';

export default function ({ size = 15, color = colors.TEXT }: IconProps): ReactElement<SVGElement> {
  return (
    <svg viewBox="0 0 512 512" width={size} fill={color}>
      <title>Time</title>
      <path d="m420.758 157.591 39.121-50.302-72.377-56.289-39.337 50.58c-12.754-6.041-26.085-10.799-39.832-14.213v-57.367h22.334v-30h-149.334v30h22.334v57.366c-13.747 3.414-27.079 8.172-39.832 14.213l-39.337-50.579-72.376 56.289 39.121 50.302c-32.838 38.817-50.743 87.484-50.743 138.909 0 57.562 22.416 111.679 63.118 152.381 40.703 40.703 94.82 63.119 152.382 63.119s111.679-22.416 152.381-63.119c40.703-40.702 63.119-94.819 63.119-152.381 0-51.425-17.904-100.092-50.742-138.909zm-150.425 323.86v-32.118h-30v31.999c-90.313-7.589-162.429-80.151-169.296-170.665h31.297v-30h-31.151c7.641-89.958 79.748-161.816 169.817-169.059v31.059h30v-31.059c90.292 7.26 162.537 79.456 169.877 169.725h-31.877v30h31.907c-7.207 90.649-79.859 163.153-170.574 170.118zm122.433-388.353 25.014 19.454-18.131 23.313c-7.937-7.115-16.315-13.584-25.073-19.379zm-159.099-63.098h44.666v52.145c-7.372-.754-14.822-1.145-22.333-1.145s-14.962.391-22.333 1.145zm-114.433 63.098 18.19 23.388c-8.758 5.795-17.136 12.264-25.073 19.379l-18.131-23.313z" />
      <path d="m372.189 201.523-21.213-21.213-67.817 67.817c-8.034-4.529-17.296-7.127-27.159-7.127-30.603 0-55.5 24.897-55.5 55.5s24.897 55.5 55.5 55.5 55.5-24.897 55.5-55.5c0-9.863-2.598-19.125-7.127-27.16zm-90.689 94.977c0 14.06-11.439 25.5-25.5 25.5s-25.5-11.44-25.5-25.5 11.439-25.5 25.5-25.5 25.5 11.44 25.5 25.5z" />
    </svg>
  );
}
