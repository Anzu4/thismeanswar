import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import War from './War';

export default function Win() {
  const [reset, setReset] = useState('off');

  if (reset === 'off') {
    return (
      <div className={'win-page'}>
        <div className={'win-lose-box'}>
          <p>Your forces have overwhelemed the enemy! The day is yours!</p>
          <button onClick={setReset('on')}>Play Again?</button>
        </div>
      </div>
    );
  } else if (reset === 'on') {
    return <War />;
  }
}
