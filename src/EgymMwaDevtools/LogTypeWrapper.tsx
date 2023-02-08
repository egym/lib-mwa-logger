import React, { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import TitleWithSearch, { TitleWithSearchProps } from './TitleWithSearch';

type Props = {
  titleWithSearchProps: Omit<TitleWithSearchProps, 'toggleHide' | 'hidden'>;
};

const LogTypeWrapper: FC<PropsWithChildren<Props>> = ({ children, titleWithSearchProps }) => {
  const [hidden, setHidden] = useState(true);

  const toggleHide = useCallback(() => {
    setHidden(prev => {
      const newValue = !prev;

      if (newValue) {
        titleWithSearchProps.clearSearch();
      }

      return newValue;
    });
  }, [hidden, titleWithSearchProps.clearSearch]);

  return (
    <div style={{ color: 'black' }}>
      <TitleWithSearch {...titleWithSearchProps} toggleHide={toggleHide} hidden={hidden} />
      {!hidden && children}
    </div>
  );
};

export default LogTypeWrapper;