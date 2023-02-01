type Message = {
  id: number;
  dateTime: Date;
  type: 'http' | 'debug',
  text: string;
  data?: any;
}

type voidFunction = () => void;

let messages: Message[] = [];
let listeners: voidFunction[] = [];

export const logHttp = (text: Message['text'], data: Message['data']) => {
  messages = [...messages, { type: 'http', id: Date.now(), dateTime: new Date(), text, data }]
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
