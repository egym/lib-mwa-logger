import React, { FC, PropsWithChildren, useCallback, useState } from 'react';
import TitleWithSearch, { TitleWithSearchProps } from './TitleWithSearch';

type Props = {
  titleWithSearchProps: Omit<TitleWithSearchProps, 'toggleHide' | 'hidden'>;
};

const LogTypeWrapper: FC<PropsWithChildren<Props>> = ({ children, titleWithSearchProps }) => {
  const [hidden, setHidden] = useState(true);

  const toggleHide = useCallback(() => {
    setHidden(prev => !prev)
  }, []);

  return (
    <div style={{ color: 'black' }}>
      <TitleWithSearch {...titleWithSearchProps} toggleHide={toggleHide} hidden={hidden} />
      {!hidden && children}
    </div>
  );
};

export default LogTypeWrapper;