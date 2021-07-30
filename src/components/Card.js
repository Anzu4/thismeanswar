import React from 'react';
import '../App.css';

export default function Card({ card }) {
  if (card) {
    return (
      <div className={'single-card'}>
        <p className={'card-suit'}>{card.Suit}</p>
        <p className={'card-value'}>{card.Rank}</p>
      </div>
    );
  } else {
    return (
      <div>
        <p className={'card-suit'}></p>
        <p className={'card-value'}></p>
      </div>
    );
  }
}
