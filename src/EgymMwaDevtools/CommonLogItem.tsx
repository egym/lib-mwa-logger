import React, { FC, useState } from 'react';
import AnyData from './AnyData';
import { Message } from '../messages';
import LogItemHeader from './LogItemHeader';
import LogItemIndexAndDateTime from './LogItemIndexAndDateTime';

type Props = {
  message: Message;
  index: number;
};

const CommonLogItem: FC<Props> = ({ index , message}) => {
  const [open, setOpen] = useState(false);

  return (
    <div key={message.id} style={{ display: 'flex', flexDirection: 'column' }}>
      <LogItemIndexAndDateTime index={index} dateTime={message.dateTime} />
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
        <LogItemHeader open={open} setOpen={setOpen} text={message.text} />
        {message.data && <AnyData preStyle={{ margin: 0 }} data={message.data} />}
      </div>
    </div>
  );
};

export default CommonLogItem;