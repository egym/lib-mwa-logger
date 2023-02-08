import React, { FC } from 'react';

type Props = {
  index: number;
  dateTime: Date;
};

const LogItemIndexAndDateTime: FC<Props> = ({ index, dateTime }) => {
  return (
    <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '5px' }}>
      #{index + 1} <span style={{ fontSize: '12px', fontWeight: 500 }}>at {dateTime.toLocaleString()}</span>
    </div>
  );
};

export default LogItemIndexAndDateTime;