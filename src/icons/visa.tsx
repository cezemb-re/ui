import React, { ReactElement } from 'react';

export interface Props {
  size?: number;
  color?: string;
  color2?: string;
}

export default function Visa({
  color = '#2394BC',
  color2 = '#EFC75E',
  size = 20,
}: Props): ReactElement<SVGElement> {
  return (
    <svg width={size} viewBox="0 0 291.764 291.764">
      <path
        fill={color as string}
        d="M119.259,100.23l-14.643,91.122h23.405l14.634-91.122C142.655,100.23,119.259,100.23,119.259,100.23z M189.857,137.348c-8.179-4.039-13.193-6.765-13.193-10.896c0.1-3.756,4.24-7.604,13.485-7.604c7.604-0.191,13.193,1.596,17.433,3.374l2.124,0.948l3.182-19.065c-4.623-1.787-11.953-3.756-21.007-3.756c-23.113,0-39.388,12.017-39.489,29.204c-0.191,12.683,11.652,19.721,20.515,23.943c9.054,4.331,12.136,7.139,12.136,10.987c-0.1,5.908-7.321,8.634-14.059,8.634c-9.336,0-14.351-1.404-21.964-4.696l-3.082-1.404l-3.273,19.813c5.498,2.444,15.609,4.595,26.104,4.705c24.563,0,40.546-11.835,40.747-30.152C209.596,151.335,203.351,143.639,189.857,137.348z M272.891,100.512h-18.108c-5.58,0-9.82,1.605-12.236,7.331l-34.766,83.509h24.563l6.765-18.08h27.481l3.51,18.153h21.664L272.891,100.512z M245.921,155.026c0.474,0.046,9.428-29.514,9.428-29.514l7.13,29.514C262.479,155.026,250.544,155.026,245.921,155.026z M85.059,100.23l-22.931,61.909L59.63,149.93c-4.24-14.087-17.533-29.395-32.368-36.999l20.998,78.33h24.764l36.799-91.021H85.059V100.23z"
      />
      <path
        fill={color2 as string}
        d="M51.916,111.982c-1.787-6.948-7.486-11.634-15.226-11.734H0.374L0,101.934c28.329,6.984,52.107,28.474,59.821,48.688L51.916,111.982z"
      />
    </svg>
  );
}
