import React from 'react';
import '../App.css';

export default function Deck({ deck }) {
  if (deck) {
    let deckSize = deck.length;
    return (
      <div className={'deck'}>
        <div className={'top-card'}>
          <h3 className={'deck-text'}>Deck: {deckSize} </h3>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
