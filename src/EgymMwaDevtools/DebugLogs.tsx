import React, { FC, useMemo, useSyncExternalStore } from 'react';
import { getSnapshot, subscribe } from '../messages';
import { SearchId } from './types';
import LogTypeWrapper from './LogTypeWrapper';
import useSearch from './useSearch';
import CommonLogItem from './CommonLogItem';

const DebugLogs: FC = () => {
  const messages = useSyncExternalStore(subscribe, getSnapshot);
  const { search, confirmSearch, clearSearch } = useSearch(SearchId.Debug);

  const debugMessages = useMemo(() => {
    const searchLowercase = search.toLowerCase();

    return messages.filter(it => it.type === 'debug').filter(it => it.text.toLowerCase().includes(searchLowercase))
  }, [messages, search]);

  return debugMessages.length || search ? (
    <LogTypeWrapper
      titleWithSearchProps={{
        searchId: SearchId.Debug,
        title: "Debug",
        confirmSearch,
        clearSearch,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {!debugMessages.length &&
          <div style={{ padding: '15px', textAlign: 'center', color: 'black' }}>No search results</div>}
        {debugMessages.map((it, index) => {
          return <CommonLogItem key={it.id} message={it} index={index} />
        })}
      </div>
    </LogTypeWrapper>
  ) : null
};

export default DebugLogs;