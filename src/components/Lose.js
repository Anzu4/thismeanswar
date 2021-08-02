import React, { useState } from 'react';
import War from './War';

export default function Lose() {
  const [reset, setReset] = useState('off');

  if (reset === 'off') {
    return (
      <div className={'lose-page'}>
        <div className={'win-lose-box'}>
          <p>The enemy's forces have overwhelmed you.</p>
          <button onClick={setReset('on')}>Play Again?</button>
        </div>
      </div>
    );
  } else if (reset === 'on') {
    return <War />;
  }
}
