import React, { FC, useMemo, useSyncExternalStore } from 'react';
import { getSnapshot, PortalsMessage, subscribe } from '../messages';
import { SearchId } from './types';
import LogTypeWrapper from './LogTypeWrapper';
import useSearch from './useSearch';
import CommonLogItem from './CommonLogItem';

const PortalsLogs: FC = () => {
  const messages = useSyncExternalStore(subscribe, getSnapshot);

  const { search, confirmSearch, clearSearch } = useSearch(SearchId.Portals);

  const portalsMessages = useMemo<PortalsMessage[]>(() => {
    const searchLowercase = search.toLowerCase();

    return messages.filter(it => it.type === 'portals').filter(it => it.text.toLowerCase().includes(searchLowercase)) as PortalsMessage[]
  }, [messages, search]);

  const portalsRequestsMessages = useMemo(() => {
    return portalsMessages.filter(it => it.direction === 'request');
  }, [portalsMessages]);

  const portalsResponseMessages = useMemo(() => {
    return portalsMessages.filter(it => it.direction === 'response');
  }, [portalsMessages]);

  return (
    (!!Object.keys(portalsMessages).length || search) ? (
      <LogTypeWrapper
        titleWithSearchProps={{
          searchId: SearchId.Portals,
          title: "Portals Pub/Sub",
          confirmSearch,
          clearSearch,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {!portalsMessages.length &&
            <div style={{ padding: '15px', textAlign: 'center', color: 'black' }}>No search results</div>}

          {!!portalsRequestsMessages.length && (
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '5px' }}>
                &gt;&gt; Requests &gt;&gt;
              </div>
              {portalsRequestsMessages.map((it, index) => {
                return <CommonLogItem key={it.id} message={it} index={index} />
              })}
            </div>
          )}

          {!!portalsResponseMessages.length && (
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '5px' }}>
                &lt;&lt; Subscriptions &lt;&lt;
              </div>
              {portalsResponseMessages.map((it, index) => {
                return <CommonLogItem key={it.id} message={it} index={index} />
              })}
            </div>
          )}
        </div>
      </LogTypeWrapper>
    ) : null
  );
};

export default PortalsLogs;