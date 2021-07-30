import React from 'react';
import { Card } from './index';
import '../App.css';

export default function Float({ float }) {
  if (float) {
    return (
      <div className={'float'}>
        <p className={'face-down'}></p>
        <p className={'face-down'}></p>
        <Card card={float[float.length - 1]} className={'single-card'} />
      </div>
    );
  } else {
    return <div></div>;
  }
}
