import React, { CSSProperties, FC } from 'react';

type Props = {
  data: any;
  preStyle?: CSSProperties;
};

const AnyData: FC<Props> = ({ data, preStyle }) => {
  return (
    <div>
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