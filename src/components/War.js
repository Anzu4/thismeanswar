import React, { useState } from 'react';
import deck from '../cards';
import { Container, Button } from 'react-bootstrap';

function War() {
  const [start, setStart] = useState('off');
  const [playerDeck, setPlayerDeck] = useState([]);
  const [computerDeck, setComputerDeck] = useState([]);
  const [playerCard, setPlayerCard] = useState();
  const [computerCard, setComputerCard] = useState();

  // Shuffles the deck of cards, and calls the dealTwo function
  function shuffle(deck) {
    setStart('on');
    let tempDeck = [...deck];
    for (let i = 0; i < tempDeck.length; i++) {
      let j = Math.floor(Math.random() * i);
      let temp = tempDeck[i];
      tempDeck[i] = tempDeck[j];
      tempDeck[j] = temp;
    }
    dealTwo(tempDeck);
  }
  // Deals the shuffled cards between 2 players and updates their states
  function dealTwo(deck) {
    // temp arrays to store cards as they are dealt.
    let playDeck = [];
    let compDeck = [];

    // deals shuffled deck, one for player, one for computer etc...
    for (let i = 0; i < deck.length; i++) {
      let card = deck[i];
      if (i % 2 === 0) {
        playDeck.push(card);
      } else {
        compDeck.push(card);
      }
    }
    // iterates over the temp arrays defined above and puts them into the respective states.
    playDeck.forEach((card, i) => {
      setPlayerDeck((playerDeck) => [...playerDeck, card]);
    });
    compDeck.forEach((card, i) => {
      setComputerDeck((computerDeck) => [...computerDeck, card]);
    });
  }

  // Sets current playerCard and ComputerCard to state
  function play(playerDeck, computerDeck) {
    setPlayerCard(playerDeck[0]);
    setComputerCard(computerDeck[0]);
    setStart('collect');
  }

  // 
  function determineWin(playerCard, computerCard) {
    if (playerCard.Rank > computerCard.Rank) {
      setPlayerDeck(playerDeck.filter((card) => card !== playerCard));
      setComputerDeck(computerDeck.filter((card) => card !== computerCard));
      setPlayerDeck((playerDeck) => [...playerDeck, playerCard]);
      setPlayerDeck((playerDeck) => [...playerDeck, computerCard]);
      setStart('on');
    } else if (computerCard.Rank > playerCard.Rank) {
      setComputerDeck(computerDeck.filter((card) => card !== computerCard));
      setPlayerDeck(playerDeck.filter((card) => card !== playerCard));
      setComputerDeck((computerDeck) => [...computerDeck, playerCard]);
      setComputerDeck((computerDeck) => [...computerDeck, computerCard]);
      setStart('on');
    } else if (computerCard.Rank === playerCard.Rank) {
      alert('WAR');
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
  } else if (start === 'on') {
    return (
      <Container>
        <h1>This Means WAR!</h1>
        <Button onClick={() => play(playerDeck, computerDeck)}>
          Play Card
        </Button>
      </Container>
    );
  } else if (start === 'collect') {
    return (
      <Container>
        <h1>This Means WAR!</h1>
        <Button onClick={() => determineWin(playerCard, computerCard)}>
          {' '}
          Collect{' '}
        </Button>
      </Container>
    );
  } else if (start === 'warDown') {
    return (
      <Container>
        <h1>This Means WAR!</h1>

      </Container>
    );
  }
}

export default War;
