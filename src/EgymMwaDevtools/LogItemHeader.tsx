import React, { Dispatch, FC, SetStateAction } from 'react';
import DownArrowIcon from './DownArrowIcon';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  color?: string;
  text: string;
};

const LogItemHeader: FC<Props> = ({ open, setOpen, color = 'black', text }) => {
  return (
    <div style={{ marginBottom: '10px', fontSize: '14px', display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
      <button onClick={() => setOpen(prev => !prev)} style={{ background: 'none', border: 'none', width: '30px', boxSizing: 'border-box', height: '17px', paddingRight: '10px', paddingLeft: '5px' }}>
        <DownArrowIcon style={{ width: '100%', height: '100%', marginTop: '2px', transform: open ? 'rotateZ(180deg)' : undefined }} />
      </button>
      <div
        style={{
          flex: 1, wordBreak: 'break-all', lineHeight: '20px',
          color,
          ... !open ? {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            lineClamp: 1,
          } : {}
        }}>
        {text}
      </div>
    </div>
  );
};

export default LogItemHeader;