import React, { useState } from 'react';
import deck from '../cards';
import { Container, Button } from 'react-bootstrap';

export default function War() {
  let computerDeck = [];
  let playerDeck = [];

  let [start, setStart] = useState('off');

  function shuffle(deck) {
    for (let i = 0; i < deck.length; i++) {
      let j = Math.floor(Math.random() * i);
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
    dealTwo(deck);
    setStart('on');
    console.log(start);
  }

  function dealTwo(deck) {
    for (let i = 0; i < deck.length; i++) {
      if (i % 2 === 0) {
        playerDeck.push(deck[i]);
      } else {
        computerDeck.push(deck[i]);
      }
    }
  }

  if (start === 'off') {
    return (
      <Container>
        <h1>This Means WAR!</h1>
        <Button varient='primary' onClick={() => shuffle(deck)}>
          Deal!
        </Button>
      </Container>
    );
  } else {
    return (
      <Container>
        <h1>This Means War!</h1>
        <Button onClick={() => alert('begin!')}>Play Card</Button>
      </Container>
    );
  }
}
