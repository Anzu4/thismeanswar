import React from 'react';
import '../App.css';

export default function Deck({ deck, player }) {
  if (deck) {
    let deckSize = deck.length;
    if (player === 'red') {
      return (
        <div className={'deck'}>
          <div className={'top-card-red'}>
            <h3 className={'deck-text'}>Deck: {deckSize} </h3>
          </div>
        </div>
      );
    } else if (player === 'blue') {
      return (
        <div className={'deck'}>
          <div className={'top-card-blue'}>
            <h3 className={'deck-text'}>Deck: {deckSize} </h3>
          </div>
        </div>
      );
    }
  } else {
    return <div></div>;
  }
}
