import React from 'react';
import { Card } from './index';
import '../App.css';

export default function Float({ float, player }) {
  if (float) {
    if (player === 'red') {
      return (
        <div className={'float'}>
          <p className={'face-down-red'}></p>
          <p className={'face-down-red'}></p>
          <Card card={float[float.length - 1]} className={'single-card'} />
        </div>
      );
    } else if (player === 'blue') {
      return (
        <div className={'float'}>
          <p className={'face-down-blue'}></p>
          <p className={'face-down-blue'}></p>
          <Card card={float[float.length - 1]} className={'single-card'} />
        </div>
      );
    }
  } else {
    return <div></div>;
  }
}
