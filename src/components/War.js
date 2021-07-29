import React, { useState } from 'react';
import deck from '../cards';
import { Container, Button } from 'react-bootstrap';

function War() {
  const [start, setStart] = useState('off');
  const [playerDeck, setPlayerDeck] = useState([]);
  let [computerDeck, setComputerDeck] = useState([]);
  // let [playerCardSuit, setPlayerCardSuit] = useState();
  // let [playerCardRank, setPlayerCardRank] = useState();
  // let [computerCard, setComputerCard] = useState();

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

  function dealTwo(deck) {
    let playDeck = [];
    let compDeck = [];

    for (let i = 0; i < deck.length; i++) {
      let card = deck[i];
      if (i % 2 === 0) {
        playDeck.push(card);
      } else {
        compDeck.push(card);
      }
    }
    console.log(playDeck, compDeck);
    //setPlayerDeck(playDeck);
    playDeck.forEach((card, i) => {
      setPlayerDeck((playerDeck) => [...playerDeck, card]);
    });
    compDeck.forEach((card, i) => {
      setComputerDeck((computerDeck) => [...computerDeck, card]);
    });
  }

  function play(playerDeck, computerDeck) {
    // setPlayerCardSuit(playerDeck[0].Suit);
    // setPlayerCardRank(playerDeck[0].Rank);
    // setComputerCardSuit(computerDeck[0].Suit);
    //console.log('player: ' + playerDeck);
    // if (playerCard.value > computerCard.value) {
    //   playerDeck.push(playerCard, computerCard);
    // } else if (computerCard.value > playerCard.value) {
    //   computerDeck.push(computerCard, playerCard);
    // } else if (computerCard.value === playerCard.value) {
    //   alert('WAR');
    // }
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
        <Button onClick={() => play(playerDeck, computerDeck)}>
          Play Card
        </Button>
      </Container>
    );
    // } else if (computerDeck.length === 0) {
    //   alert('You Win!!');
    // } else if (playerDeck.length === 0) {
    //   alert('You Lose!');
    // }
  }
}

export default War;
