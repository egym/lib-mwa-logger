import React, { useMemo } from 'react';
import { FC, useSyncExternalStore } from 'react';
import { getSnapshot, subscribe } from '../messages';
import useSearch from './useSearch';
import { SearchId } from './types';
import LogTypeWrapper from './LogTypeWrapper';
import CommonLogItem from './CommonLogItem';

const WebVitalsLogs: FC = () => {
  const messages = useSyncExternalStore(subscribe, getSnapshot);
  const { search, confirmSearch, clearSearch } = useSearch(SearchId.WebVitals);

  const webVitalsMessages = useMemo(() => {
    const searchLowercase = search.toLowerCase();

    return messages.filter(it => it.type === 'webVitals').filter(it => it.text.toLowerCase().includes(searchLowercase));
  }, [messages, search])

  return (
    <LogTypeWrapper
      titleWithSearchProps={{
        searchId: SearchId.WebVitals,
        title: "WebVitals",
        confirmSearch,
        clearSearch,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        {!webVitalsMessages.length &&
          <div style={{ padding: '15px', textAlign: 'center', color: 'black' }}>No search results</div>}

        {webVitalsMessages.map((it, index) => {
          return <CommonLogItem key={it.id} message={it} index={index} />
        })}

      </div>
    </LogTypeWrapper>
  );
};

export default WebVitalsLogs;