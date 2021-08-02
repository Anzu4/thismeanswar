import React from 'react';
import '../App.css';

export default function Card({ card }) {
  if (card) {
    if (card.Suit === 'Hearts') {
      return (
        <div className={'single-card'}>
          <p className={'card-suit-red'}>
            <i className='fas fa-heart'></i>
          </p>
          <p className={'card-value-red'}>{card.Rank}</p>
        </div>
      );
    } else if (card.Suit === 'Diamonds') {
      return (
        <div className={'single-card'}>
          <p className={'card-suit-red'}>
            <i className='fas fa-gem'></i>
          </p>
          <p className={'card-value-red'}>{card.Rank}</p>
        </div>
      );
    } else if (card.Suit === 'Spades') {
      return (
        <div className={'single-card'}>
          <p className={'card-suit-black'}>
            <i className='fas fa-spa'></i>
          </p>
          <p className={'card-value-black'}>{card.Rank}</p>
        </div>
      );
    } else if (card.Suit === 'Clubs') {
      return (
        <div className={'single-card'}>
          <p className={'card-suit-black'}>
            <i className='fas fa-horse-head'></i>
          </p>
          <p className={'card-value-black'}>{card.Rank}</p>
        </div>
      );
    }
  } else {
    return (
      <div>
        <p className={'card-suit'}></p>
        <p className={'card-value'}></p>
      </div>
    );
  }
}
