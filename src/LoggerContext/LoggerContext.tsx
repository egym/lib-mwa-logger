import React, { FC } from 'react';

type Props = {
  test: string
};

const LoggerContext: FC<Props> = ({ test }) => {
  console.log('logger context loaded', test);

  return (
    <div>
      LoggerContext
    </div>
  );
};

export default LoggerContext;