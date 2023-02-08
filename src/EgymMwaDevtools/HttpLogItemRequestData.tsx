import React, { FC } from 'react';
import { HttpMessage } from '../messages';
import AnyData from './AnyData';

type Props = {
  message: HttpMessage;
};

const HttpLogItemRequestData: FC<Props> = ({ message }) => {
  return <AnyData data={message.data} />
};

export default HttpLogItemRequestData;