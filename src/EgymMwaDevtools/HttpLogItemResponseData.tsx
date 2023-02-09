import React, { FC } from 'react';
import { HttpMessage } from '../messages';
import HttpLogItemRequestData from './HttpLogItemRequestData';
import { getIsHttpError } from './helpers';

type Props = {
  message: HttpMessage;
};

const HttpLogItemResponseData: FC<Props> = ({ message }) => {
  if (message.data instanceof Error) {
    return <pre style={{ fontFamily: 'HelveticaNeue', color: '#D92845' }}>{message.data.name} {message.data.message} {message.data.stack}</pre>
  }

  return <HttpLogItemRequestData message={message} isError={getIsHttpError(message.data.status)} />;
};

export default HttpLogItemResponseData;