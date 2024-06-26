import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { getSnapshot, setCIConfig, subscribe } from '../messages';
import { getPosition } from './helpers';
import DebugIcon from './DebugIcon';
import CloseIcon from './CloseIcon';
import HttpLogs from './HttpLogs';
import DebugLogs from './DebugLogs';
import PortalsLogs from './PortalsLogs';
import WebVitalsLogs from './WebVitalsLogs';
import WSOD from './WSOD';
import { CIConfig } from '../types';
import CiConfigDisplay from './CIConfigDisplay';
import { setConfig } from '../config';

type Props = {
  enabled?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  wrapperStyle?: CSSProperties;
  buttonStyle?: CSSProperties;
  ciConfig?: CIConfig;
};

const EgymMwaDevtools: FC<Props> = ({ enabled, position, wrapperStyle, buttonStyle, ciConfig }) => {
  const messages = useSyncExternalStore(subscribe, getSnapshot);
  const [open, setOpen] = useState(false);
  const [positionStyles, setPositionStyles] = useState<ReturnType<typeof getPosition> | null>(null);

  const isEnabled = typeof enabled === 'boolean' ? enabled : true;

  useEffect(() => {
    if (!isEnabled) return;

    // adding timeout to make sure css variable accessible in the MWA
    setTimeout(() => {
      const styles = getPosition(position);
      setPositionStyles(styles);
    }, 1000);
  }, [position]);

  useEffect(() => {
    if (ciConfig && isEnabled) setCIConfig(ciConfig);
  }, [ciConfig, isEnabled]);

  useEffect(() => {
    if (!isEnabled) return;

    setConfig({ initialized: true })
  }, [])

  const contentWidth = useMemo(() => {
    if (!positionStyles) return undefined;

    return `calc(100% - ${positionStyles.safeArea.left} - ${positionStyles.safeArea.right})`
  }, [positionStyles]);

  const contentHeight = useMemo(() => {
    if (!positionStyles) return undefined;

    return `calc(100% - ${positionStyles.safeArea.top} - ${positionStyles.safeArea.bottom})`
  }, [positionStyles]);

  const toggle = useCallback(() => {
    setOpen(prev => !prev)
  }, []);

  return positionStyles ? (
    <div
      style={{
        fontFamily: 'HelveticaNeue',
        position: 'fixed', zIndex: 9999, padding: open ? '15px' : undefined,
        width: open ? '100vw' : 'auto', height: open ? '100vh' : 'auto', boxSizing: 'border-box',
        ...positionStyles.wrapper,
        ...wrapperStyle,
      }}
    >
      <button
        style={{
          width: '30px',
          height: '30px',
          color: '#fff',
          border: 'none',
          borderRadius: '2px',
          padding: '3px',
          cursor: 'pointer',
          boxShadow: 'rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset',
          backgroundImage: 'radial-gradient(100% 100% at 100% 0px, rgb(48 223 85) 0px, rgb(30 72 21) 100%)',
          position: 'absolute',
          ...positionStyles.button,
          ...buttonStyle
        }}
        onClick={toggle}
      >
        <DebugIcon/>
      </button>
      {
        open && (
          <div
            style={{
              position: 'absolute', top: positionStyles.safeArea.top, left: positionStyles.safeArea.left,
              width: contentWidth,
              height: contentHeight,
              background: 'white', borderRadius: '2px',
              boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
              fontSize: '14px',
              overflow: 'hidden',
              overflowY: 'auto'
            }}
          >
            <div style={{ zIndex: 1000, borderBottom: '1px solid #eeeeee', padding: '15px', position: 'sticky', top: 0, background: 'white', boxShadow: '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)' }}>
              <button
                onClick={toggle}
                style={{
                  width: '30px',
                  height: '30px',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '2px',
                  padding: '3px',
                  cursor: 'pointer',
                  background: 'transparent',
                }}
              >
                <CloseIcon style={{ maxWidth: '100%', maxHeight: '100%' }}/>
              </button>
            </div>

            <div style={{ padding: '15px', }}>
              {!messages.length && <div style={{ padding: '15px', textAlign: 'center', color: 'black' }}>All clear!</div>}

              <CiConfigDisplay config={ciConfig} />

              <WSOD />

              <HttpLogs />

              <DebugLogs />

              <PortalsLogs />

              <WebVitalsLogs />

            </div>

          </div>
        )
      }
    </div>
  ) : null;
};

export default EgymMwaDevtools;
