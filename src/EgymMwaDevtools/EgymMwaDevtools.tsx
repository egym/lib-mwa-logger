import React, { FC, useCallback, useMemo, useState, useSyncExternalStore } from 'react';
import { getSnapshot, HttpMessage, Message, subscribe } from '../messages';
import { getPosition } from './helpers';
import DebugIcon from './DebugIcon';
import CloseIcon from './CloseIcon';

type Props = {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  test: string;
};

const EgymMwaDevtools: FC<Props> = ({ position }) => {
  const messages = useSyncExternalStore(subscribe, getSnapshot);
  const [open, setOpen] = useState(false);

  console.log('messages', messages);

  const positionStyles = useMemo(() => getPosition(position), [position]);

  const toggle = useCallback(() => {
    setOpen(prev => !prev)
  }, []);

  // @ts-ignore
  const httpMessages = useMemo<Record<string, HttpMessage[]>>(() => {
    return messages.filter(it => it.type === 'http').reduce<Record<string, Message[]>>((acc, it) => {
      if (it.type === 'http') {
        return {
          ...acc,
          [it.requestId]: [...(acc[it.requestId] || []), it],
        }
      }

      return acc;
    }, {})
  }, [messages]);

  const debugMessages = useMemo(() => {
    return messages.filter(it => it.type === 'debug');
  }, [])

  return (
    <div
      style={{
        position: 'fixed', left: 0, top: 0, zIndex: 9999, padding: open ? '15px' : undefined,
        width: open ? '100vw' : 'auto', height: open ? '100vh' : 'auto', boxSizing: 'border-box',
        ...positionStyles.wrapper,
      }}
    >
      <button
        style={{
          width: '30px',
          height: '30px',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '3px',
          cursor: 'pointer',
          boxShadow: 'rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset',
          backgroundImage: 'radial-gradient(100% 100% at 100% 0px, rgb(48 223 85) 0px, rgb(30 72 21) 100%)',
          position: 'absolute',
          ...positionStyles.button,
        }}
        onClick={toggle}
      >
        <DebugIcon/>
      </button>
      {
        open && (
          <div
            style={{
              position: 'absolute', top: '15px', left: '15px',
              width: 'calc(100% - 30px)',
              height: 'calc(100% - 30px)',
              background: 'white', borderRadius: '5px',
              boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
              padding: '15px',
              fontSize: '14px',
            }}
          >
            <button
              onClick={toggle}
              style={{
                width: '30px',
                height: '30px',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                padding: '3px',
                cursor: 'pointer',
                background: 'transparent',
                marginBottom: '20px',
              }}
            >
              <CloseIcon style={{ maxWidth: '100%', maxHeight: '100%' }}/>
            </button>

            {!Object.keys(httpMessages).length && !debugMessages.length && <div style={{ padding: '15px', textAlign: 'center', color: 'black' }}>All clear!</div>}

            {!!Object.keys(httpMessages).length && <div style={{ color: 'black', overflowY: 'scroll', maxHeight: '100%', paddingBottom: '100px' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '15px' }}>
                HTTP
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {Object.keys(httpMessages).map(httpRequestId => {
                  return <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid black', borderRadius: '3px', padding: '5px' , marginBottom: '20px'}}>
                    <pre style={{ marginBottom: '10px', color: 'darkblue', fontSize: '14px' }}>
                      {httpMessages[httpRequestId][0]?.method?.toUpperCase()} {httpMessages[httpRequestId][0].text}
                    </pre>
                    {httpMessages[httpRequestId].map(it => {
                      return <div>
                        <div style={{ fontSize: '12px' }}>
                          {it.direction?.toUpperCase()} at {it.dateTime.toLocaleString()}:
                        </div>
                        {it.data instanceof Error
                          ? <pre style={{ color: 'red' }}>{it.data.name} {it.data.message} {it.data.stack}</pre>
                          : (Array.isArray(it.data) || typeof it.data === 'object')
                          && (
                            <pre>
                              {JSON.stringify(it.data, null, 2)}
                            </pre>
                          ) || it.data}
                      </div>
                    })}
                  </div>
                })}
              </div>
            </div>}


          </div>
        )
      }
    </div>
  );
};

export default EgymMwaDevtools;