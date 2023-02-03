type BaseMessage = {
  id: number;
  dateTime: Date;
  type: 'http' | 'debug',
  text: string;
  data?: any;
}

export type DebugMessage = BaseMessage & {
  type: 'debug';
}

export type HttpMessage = BaseMessage & {
  method: string;
  type: 'http',
  requestId: string | number;
  direction: 'request' | 'response';
}

export type Message = DebugMessage | HttpMessage;

type voidFunction = () => void;

let messages: Message[] = [];
let listeners: voidFunction[] = [];

export const logHttpRequest = (method: string, url: HttpMessage['text'], requestId: HttpMessage['requestId'], payload?: HttpMessage['data']) => {
  messages = [
    ...messages,
    { type: 'http', id: Date.now(), dateTime: new Date(), method, text: url, requestId, direction: 'request', data: payload }
  ]
  emitChange();
};

export const logHttpResponse = (method: string, url: HttpMessage['text'], requestId: HttpMessage['requestId'], response?: HttpMessage['data']) => {
  messages = [
    ...messages,
    { type: 'http', id: Date.now(), dateTime: new Date(), method, text: url, requestId, direction: 'response', data: response }
  ]
  emitChange();
};

export const subscribe = (listener: voidFunction) => {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
}

export const getSnapshot = () => {
  return messages;
}

const emitChange = () => {
  for (let listener of listeners) {
    listener();
  }
}
