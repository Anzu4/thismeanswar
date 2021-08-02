import React, { useState } from 'react';
import War from './War';

export default function Lose() {
  const [game, setGame] = useState('off');

  if (game === 'off') {
    return (
      <div className={'lose-page'}>
        <div className={'win-lose-box'}>
          <p>The enemy's forces have overwhelmed you.</p>
          <button>Play Again?</button>
        </div>
      </div>
    );
  } else {
    return <War />;
  }
}
