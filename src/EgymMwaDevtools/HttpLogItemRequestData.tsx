import React, { FC } from 'react';
import { HttpMessage } from '../messages';
import AnyData from './AnyData';

type Props = {
  message: HttpMessage;
  isError?: boolean;
};

const HttpLogItemRequestData: FC<Props> = ({ message, isError }) => {
  return <AnyData data={message.data} wrapperStyle={{ color: isError ? '#D92845' : undefined }} />
};

export default HttpLogItemRequestData;