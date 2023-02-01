import React, { FC, useSyncExternalStore } from 'react';
import { getSnapshot, subscribe } from '../messages';

console.log('lib React', React);
// @ts-ignore
window.libReact = React;

type Props = {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
};

const EgymMwaDevtools: FC<Props> = props => {
  const messages = useSyncExternalStore(subscribe, getSnapshot);

  console.log('messages', messages);

  return (
    <div>
      EgymMwaDevtools
    </div>
  );
};

export default EgymMwaDevtools;