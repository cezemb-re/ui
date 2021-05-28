import React, { ReactElement } from 'react';
import { DateTime } from 'luxon';

export interface Props {
  value: DateTime;
  date?: boolean;
  time?: boolean;
  relative?: boolean;
}

export default function Datetime({
  value,
  date = true,
  time = false,
  relative = false,
}: Props): ReactElement {
  return (
    <p className="cezembre-ui-datetime">
      {date ? value.toLocaleString(DateTime.DATE_MED) : null}
      {date && time ? <br /> : null}
      {time ? (
        <span className="time">
          {value.toLocaleString(DateTime.TIME_SIMPLE)}
        </span>
      ) : null}
    </p>
  );
}
