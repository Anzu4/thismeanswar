import React from 'react';
import { Container, Button } from 'react-bootstrap';
import deck from '../cards';

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

function dealTwo(deck){
  
}

function showDeck(deck) {
  console.log(deck);
}

export default function Splash() {
  return (
    <Container fluid>
      <h1>This Means WAR!</h1>
      <Button onClick={() => shuffle(deck)}>Play Game!</Button>
    </Container>
  );
}
