import { Metric as WebVitalsMetric } from 'web-vitals';

type BaseMessage = {
  id: string;
  dateTime: Date;
  type: 'http' | 'portals' | 'debug' | 'webVitals' | 'wsod',
  text: string;
  data?: any;
}

export type DebugMessage = BaseMessage & {
  type: 'debug';
}

export type HttpMessage = BaseMessage & {
  type: 'http',
  method: string;
  requestId: string | number;
  direction: 'request' | 'response';
}

export type PortalsMessage = BaseMessage & {
  type: 'portals',
  direction: 'request' | 'response';
}

export type WebVitalsMessage = BaseMessage & {
  type: 'webVitals',
  data: WebVitalsMetric,
}

export type WSODMessage = BaseMessage & {
  type: 'wsod',
}

export type Message = DebugMessage | HttpMessage | PortalsMessage | WebVitalsMessage | WSODMessage;

type voidFunction = () => void;

let messages: Message[] = [];
let listeners: voidFunction[] = [];

const appendAndEmitMessage = <T extends Message>(newMessage: T) => {
  messages = [
    ...messages,
    newMessage,
  ];

  console.debug(newMessage);

  emitChange();
}

export const logHttpRequest = (method: HttpMessage['method'], url: HttpMessage['text'], requestId: HttpMessage['requestId'], payload?: HttpMessage['data']) => appendAndEmitMessage({
  type: 'http',
  id: Math.random().toString(16).slice(2),
  dateTime: new Date(),
  method,
  text: url,
  requestId,
  direction: 'request',
  data: payload
});

export const logHttpResponse = (method: HttpMessage['method'], url: HttpMessage['text'], requestId: HttpMessage['requestId'], response?: HttpMessage['data']) => appendAndEmitMessage({
  type: 'http',
  id: Math.random().toString(16).slice(2),
  dateTime: new Date(),
  method,
  text: url,
  requestId,
  direction: 'response',
  data: response
});

export const logDebug = (text: DebugMessage['text'], data?: DebugMessage['data']) => appendAndEmitMessage({
  type: 'debug',
  id: Math.random().toString(16).slice(2),
  dateTime: new Date(),
  text,
  data
})

export const logPortalsRequest = (topic: PortalsMessage['text'], data?: PortalsMessage['data']) => appendAndEmitMessage({
  type: 'portals',
  id: Math.random().toString(16).slice(2),
  dateTime: new Date(),
  text: topic,
  data,
  direction: 'request'
})

export const logPortalsResponse = (topic: PortalsMessage['text'], data?: PortalsMessage['data']) => appendAndEmitMessage({
  type: 'portals',
  id: Math.random().toString(16).slice(2),
  dateTime: new Date(),
  text: topic,
  data,
  direction: 'response'
})

export const logWebWitals = (metric: WebVitalsMessage['data']) => appendAndEmitMessage({
  type: 'webVitals',
  id: Math.random().toString(16).slice(2),
  dateTime: new Date(),
  text: metric.name,
  data: metric,
});

export const logWSOD = (data: WSODMessage['data']) => appendAndEmitMessage({
  type: 'wsod',
  id: Math.random().toString(16).slice(2),
  dateTime: new Date(),
  text: 'WSOD',
  data,
})

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
