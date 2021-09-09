import { ReactElement } from 'react';
import colors from '../styles/_colors.scss';
import IconProps from './props';

export default function Download({
  size = 15,
  color = colors.TEXT,
}: IconProps): ReactElement<SVGElement> {
  return (
    <svg viewBox="0 0 341.92 500" width={size} fill={color}>
      <title>Download</title>
      <path
        d="M304.16,0H37.82A37.83,37.83,0,0,0,0,37.79V462.21A37.83,37.83,0,0,0,37.82,500H304.16A37.83,37.83,0,0,0,342,462.21V37.79A37.83,37.83,0,0,0,304.16,0Zm11.49,462.21a11.5,11.5,0,0,1-11.49,11.49H37.82a11.51,11.51,0,0,1-11.49-11.49V37.79A11.51,11.51,0,0,1,37.82,26.3H304.16a11.5,11.5,0,0,1,11.49,11.49Z"
        transform="translate(-0.03)"
      />
      <circle cx="170.96" cy="157.94" r="51.04" />
      <polygon points="180.71 394.6 219.11 394.6 219.11 420.9 122.81 420.9 122.81 394.6 161.21 394.6 107.42 340.81 126.01 322.22 157.81 354.01 157.81 271.92 184.11 271.92 184.11 354.01 215.91 322.22 234.5 340.81 180.71 394.6" />
    </svg>
  );
}
