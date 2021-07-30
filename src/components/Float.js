import React from 'react';
import { Card } from './index';
import '../App.css';

export default function Float({ float }) {
  if (float) {
    return (
      <div className={'float-box'}>
        X X
        <Card card={float[float.length - 1]} />
      </div>
    );
  } else {
    return <p>Float</p>;
  }
}
