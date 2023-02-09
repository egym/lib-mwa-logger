import React, { CSSProperties, FC, FormEventHandler } from 'react';
import CloseIcon from './CloseIcon';
import { SearchId } from './types';
import DownArrowIcon from './DownArrowIcon';

export type TitleWithSearchProps = {
  title: string;
  titleStyle?: CSSProperties;
  confirmSearch?: FormEventHandler;
  clearSearch?: () => void;
  searchId?: SearchId;
  hidden?: boolean;
  toggleHide?: () => void;
};

const TitleWithSearch: FC<TitleWithSearchProps> = ({
  title,
  titleStyle,
  searchId,
  confirmSearch,
  clearSearch,
  hidden,
  toggleHide,
}) => {
  return (
    <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '5px 10px',
        background: 'black',
        color: 'white',
        borderRadius: '2px',
        ...titleStyle
      }}>
        {toggleHide && (
          <button onClick={toggleHide} style={{
            background: 'none',
            border: 'none',
            width: '30px',
            height: '25px',
            paddingRight: '10px',
            paddingLeft: '5px',
            boxSizing: 'border-box',
          }}>
            <DownArrowIcon color="white" style={{
              width: '100%',
              height: '100%',
              marginTop: '1px',
              transform: !hidden ? 'rotateZ(180deg)' : undefined
            }}/>
          </button>
        )}
        {title}
      </div>
      {!hidden && confirmSearch && clearSearch && <form
        onSubmit={confirmSearch}
        style={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: '10px' }}
      >
        <div style={{ position: 'relative', height: '35px', width: '200px', marginRight: '10px', flex: 1 }}>
          <input type="text" id={searchId} placeholder="Search..." style={{
            position: 'absolute',
            background: 'white',
            border: '1px solid black',
            borderRadius: '2px',
            height: '100%',
            width: '100%',
            fontSize: '14px',
            fontWeight: 500,
            padding: '0 30px 0 5px',
            outline: 'none'
          }}/>
          <button type="button" onClick={clearSearch} style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '14px',
            height: '14px',
            background: 'none',
            border: 'none'
          }}>
            <CloseIcon style={{ maxWidth: '100%', maxHeight: '100%' }}/>
          </button>
        </div>
        <button type="submit" style={{
          display: 'block',
          height: '35px',
          background: 'white',
          border: '1px solid black',
          borderRadius: '2px',
          color: 'black',
          padding: '0 5px'
        }}>
          Search
        </button>
      </form>}
    </div>
  );
};

export default TitleWithSearch;