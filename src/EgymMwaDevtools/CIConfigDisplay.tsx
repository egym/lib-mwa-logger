import React from 'react';
import { FC } from 'react';
import { CIConfig } from '../types';
import LogTypeWrapper from './LogTypeWrapper';

type Props = {
  config?: CIConfig;
};

const CiConfigDisplay: FC<Props> = ({ config }) => {
  if (!config) return null;

  return <LogTypeWrapper
    titleWithSearchProps={{
      title: "CI",
      titleStyle: {
        background: 'linear-gradient(to right, #C75300, #FF8F3D)',
      }
    }}
  >
    <ul style={{ listStyle: 'none', border: '1px solid black', padding: '10px', borderRadius: '2px', marginBottom: '10px' }}>
      {Object.values(config).map(({ value, description }) => {
        return <li
          key={value}
          style={{
            marginBottom: '5px',
            paddingBottom: '5px',
            borderBottom: '1px solid rgba(255, 143, 61, 0.5)'
          }}
        >
          <div style={{ fontWeight: '700' }}>
            {description}
          </div>
          <div>
            {value}
          </div>
        </li>
      })}
    </ul>
  </LogTypeWrapper>
};

export default CiConfigDisplay;