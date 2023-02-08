import React, { FC, useMemo, useSyncExternalStore } from 'react';
import { getSnapshot, HttpMessage, Message, subscribe } from '../messages';
import { SearchId } from './types';
import LogTypeWrapper from './LogTypeWrapper';
import HttpLogItem from './HttpLogItem';
import useSearch from './useSearch';

const HttpLogs: FC = () => {
  const messages = useSyncExternalStore(subscribe, getSnapshot);
  const { search, confirmSearch, clearSearch } = useSearch(SearchId.Http);

  const httpMessages = useMemo<Record<string, HttpMessage[]>>(() => {
    const searchLowercase = search.toLowerCase();

    return messages
      .filter(it => it.type === 'http')
      .filter(it => it.text.toLowerCase().includes(searchLowercase))
      .reduce<Record<string, Message[]>>((acc, it) => {
        if (it.type === 'http') {
          return {
            ...acc,
            [it.requestId]: [...(acc[it.requestId] || []), it],
          }
        }

        return acc;
      }, {}) as Record<string, HttpMessage[]>;
  }, [messages, search]);

  return (
    (!!Object.keys(httpMessages).length || search) ?
      <LogTypeWrapper
        titleWithSearchProps={{
          searchId: SearchId.Http,
          title: "HTTP",
          confirmSearch,
          clearSearch,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {!Object.keys(httpMessages).length &&
            <div style={{ padding: '15px', textAlign: 'center', color: 'black' }}>No search results</div>}

          {Object.keys(httpMessages).map((httpRequestId, index) => {
            return <HttpLogItem key={httpRequestId} index={index} messages={httpMessages[httpRequestId]} />
          })}
        </div>
      </LogTypeWrapper> : null
  );
};

export default HttpLogs;