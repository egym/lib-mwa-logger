import React, { FC, useMemo, useState } from 'react';
import DownArrowIcon from './DownArrowIcon';
import { HttpMessage } from '../messages';
import HttpLogItemRequestData from './HttpLogItemRequestData';
import HttpLogItemResponseData from './HttpLogItemResponseData';
import LogItemHeader from './LogItemHeader';
import LogItemIndexAndDateTime from './LogItemIndexAndDateTime';

type Props = {
  index: number;
  messages: HttpMessage[]
};

const HttpLogItem: FC<Props> = ({ index, messages }) => {
  const [open, setOpen] = useState(false);

  const isErrorResponse = useMemo(() => {
    if (!messages[1]) return false;

    return messages[1].data instanceof Error;
  }, [messages]);

  const color = useMemo(() => {
    if (!messages[1]) return '#8C8C8C';

    return isErrorResponse ? '#D92845' : '#17843B';
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <LogItemIndexAndDateTime index={index} dateTime={messages[0].dateTime} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid black',
          borderRadius: '2px',
          padding: '5px',
          marginBottom: '20px',
          maxHeight: open ? 'none' : '30px',
          overflow: !open ? 'hidden' : undefined,
        }}
      >
        <LogItemHeader text={`${messages[0]?.method?.toUpperCase()} ${messages[0].text}`} color={color} open={open} setOpen={setOpen} />

        {messages.map(it => {
          return <div key={it.id}>
            <div style={{ fontSize: '12px' }}>
              {it.direction === 'request' ? <span>&gt;&gt;</span> : <span>&lt;&lt;</span>} {it.direction?.toUpperCase()} at {it.dateTime.toLocaleString()}:
            </div>
            {it.direction === 'request' ? <HttpLogItemRequestData message={it} /> : <HttpLogItemResponseData message={it} />}
          </div>
        })}
      </div>
    </div>
  );
};

export default HttpLogItem;