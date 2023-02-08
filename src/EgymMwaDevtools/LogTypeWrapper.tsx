import React, { FC, PropsWithChildren, useCallback, useState } from 'react';
import TitleWithSearch, { TitleWithSearchProps } from './TitleWithSearch';

type Props = {
  titleWithSearchProps: Omit<TitleWithSearchProps, 'toggleHide' | 'hidden'>;
  initialHidden?: boolean;
  expandable?: boolean;
};

const LogTypeWrapper: FC<PropsWithChildren<Props>> = ({ children, titleWithSearchProps, initialHidden = true, expandable = true}) => {
  const [hidden, setHidden] = useState(expandable || initialHidden);

  const toggleHide = useCallback(() => {
    if (!expandable) return;

    setHidden(prev => {
      const newValue = !prev;

      if (newValue && titleWithSearchProps.clearSearch) {
        titleWithSearchProps.clearSearch();
      }

      return newValue;
    });
  }, [hidden, titleWithSearchProps.clearSearch]);

  return (
    <div style={{ color: 'black' }}>
      <TitleWithSearch {...titleWithSearchProps} toggleHide={expandable ? toggleHide : undefined} hidden={hidden} />
      {!hidden && children}
    </div>
  );
};

export default LogTypeWrapper;