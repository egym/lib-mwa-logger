import React from 'react';
import { FC } from 'react';
import { getHostEnvironment } from '../hostEnvironment';
import LogTypeWrapper from './LogTypeWrapper';

const HostEnvironmentDisplay: FC = () => {
  const environment = getHostEnvironment();

  return <LogTypeWrapper
    titleWithSearchProps={{
      title: environment.platformMatchesDevice ? 'Environment' : 'Environment: platform does not match the device',
      titleStyle: {
        background: environment.platformMatchesDevice ? 'linear-gradient(to right, #1E4815, #30DF55)' : '#D92845',
      }
    }}
  >
    <ul style={{ listStyle: 'none', border: '1px solid black', padding: '10px', borderRadius: '2px', marginBottom: '10px' }}>
      {Object.entries(environment).map(([key, value]) => {
        return <li
          key={key}
          style={{
            marginBottom: '5px',
            paddingBottom: '5px',
            borderBottom: '1px solid rgba(48, 223, 85, 0.5)'
          }}
        >
          <div style={{ fontWeight: '700' }}>
            {key}
          </div>
          <div>
            {Array.isArray(value) ? JSON.stringify(value) : String(value)}
          </div>
        </li>
      })}
    </ul>
  </LogTypeWrapper>
};

export default HostEnvironmentDisplay;
