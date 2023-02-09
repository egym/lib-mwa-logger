import React, { CSSProperties, FC } from 'react';

type Props = {
  data: any;
  preStyle?: CSSProperties;
  wrapperStyle?: CSSProperties;
};

const AnyData: FC<Props> = ({ data, wrapperStyle, preStyle }) => {
  return (
    <div style={wrapperStyle}>
      {
        (Array.isArray(data) || typeof data === 'object')
          ? (
            <pre style={{ fontFamily: 'HelveticaNeue', ...preStyle }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          ) : data
      }
    </div>
  );
};

export default AnyData;