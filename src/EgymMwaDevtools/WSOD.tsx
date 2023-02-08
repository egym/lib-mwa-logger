import React, { FC, useMemo, useSyncExternalStore } from 'react';
import { getSnapshot, subscribe } from '../messages';
import LogTypeWrapper from './LogTypeWrapper';
import AnyData from './AnyData';

const WSOD: FC = () => {
  const messages = useSyncExternalStore(subscribe, getSnapshot);
  const wsodErrors = useMemo(() => {
    return messages.filter(it => it.type === 'wsod')
  }, [messages]);

  return wsodErrors.length ? (
    <LogTypeWrapper
      expandable={false}
      initialHidden={false}
      titleWithSearchProps={{
        title: "WSOD",
        titleStyle: { background: '#D92845' }
      }}
    >
      {wsodErrors.map((it, index) => {
        return <div key={it.id} style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '5px' }}>
            #{index + 1} <span style={{ fontSize: '12px', fontWeight: 500 }}>at {it.dateTime.toLocaleString()}</span>
          </div>
          {it.data.error instanceof Error ? <pre style={{ margin: 0, fontFamily: 'HelveticaNeue', color: '#D92845' }}>
            <div>{it.data.error.name}</div>
            <div>{it.data.error.message}</div>
            <div>{it.data.error.stack}</div>
          </pre> : <AnyData data={it.data} />}
        </div>
      })}
    </LogTypeWrapper>
  ) : null;
};

export default WSOD;