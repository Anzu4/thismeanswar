import React, { useState } from 'react';
import deck from '../cards';
import { Container, Button } from 'react-bootstrap';

export default function War() {
  const [start, setStart] = useState('off');
  const [playerDeck, setPlayerDeck] = useState([]);
  const [computerDeck, setComputerDeck] = useState([]);
  const [playerCard, setPlayerCard] = useState();
  const [computerCard, setComputerCard] = useState();
  const [playerFloat, setPlayerFloat] = useState([]);
  const [computerFloat, setComputerFloat] = useState([]);

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

  // evaulates the current player and computer cards. Adds boths cards to respective winner's decks, or if there's a tie, starts the war!
  function determineWin(playerCard, computerCard) {
    switch (start) {
      // Cards have been played outside of a 'war' senario
      case 'collect':
        // Player Wins
        if (playerCard.Rank > computerCard.Rank) {
          setPlayerDeck(playerDeck.filter((card) => card !== playerCard));
          setComputerDeck(computerDeck.filter((card) => card !== computerCard));
          setPlayerDeck((playerDeck) => [...playerDeck, playerCard]);
          setPlayerDeck((playerDeck) => [...playerDeck, computerCard]);
          setStart('on');
          break;
          // Computer Wins
        }
        // Computer Wins
        else if (computerCard.Rank > playerCard.Rank) {
          setComputerDeck(computerDeck.filter((card) => card !== computerCard));
          setPlayerDeck(playerDeck.filter((card) => card !== playerCard));
          setComputerDeck((computerDeck) => [...computerDeck, playerCard]);
          setComputerDeck((computerDeck) => [...computerDeck, computerCard]);
          setStart('on');
          break;
        }
        // Tie
        else if (computerCard.Rank === playerCard.Rank) {
          setStart('warDown');
          float();
          setStart('warUp');
          break;
        }
      // Cards have been played inside of a 'war' senario
      case 'warDown':
        // Player Wins
        if (playerCard.Rank > computerCard.Rank) {
          // Remove current card from top of Deck
          setPlayerDeck(playerDeck.filter((card) => card !== playerCard));
          setComputerDeck(computerDeck.filter((card) => card !== computerCard));
          // add the current cards and each float to the bottom of the player's deck
          setPlayerDeck((playerDeck) => [...playerDeck, playerCard]);
          playDeck.forEach((card) => {
            setPlayerDeck((playerDeck) => [...playerDeck, card]);
          });
          setPlayerDeck((playerDeck) => [...playerDeck, computerCard]);
          compDeck.forEach((card) => {
            setComputerDeck((computerDeck) => [...computerDeck, card]);
          });
        } else if (computerCard.Rank > playerCard.Rank) {
        } else if (computerCard.Rank === playerCard.Rank) {
        }
    }
  }

  // Add next 3 cards to each player's float.
  function float() {
    let playFloat = [];
    let compFloat = [];
    // Add next 3 cards to the floats
    for (let i = 1; i < 3; i++) {
      playFloat.push(playerDeck[i]);
      compFloat.push(computerDeck[i]);
    }
    playFloat.forEach((card) => {
      setPlayerFloat((playerFloat) => [...playerFloat, card]);
    });
    compFloat.forEach((card) => {
      setComputerFloat((computerFloat) => [...computerFloat, card]);
    });
  }

  // The actual page render. Buttons will change based on what case the game is in and update states accordingly
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
        <div>
          <div>Player Deck: {playerDeck.length}</div>
          <div>Computer Deck: {computerDeck.length}</div>
        </div>
      </Container>
    );
  } else if (start === 'collect') {
    let playCard = playerCard.Rank;
    let compCard = computerCard.Rank;

    return (
      <Container>
        <h1>This Means WAR!</h1>
        <div>
          <div>
            <div>Player Card: {playCard}</div>
            <div>Computer Card: {compCard}</div>
          </div>
          <Button onClick={() => determineWin(playerCard, computerCard)}>
            Collect
          </Button>
          <div>Player Deck: {playerDeck.length}</div>
          <div>Computer Deck: {computerDeck.length}</div>
        </div>
      </Container>
    );
  } else if (start === 'warDown') {
    let playCard = playerCard.Rank;
    let compCard = computerCard.Rank;
    return (
      <Container>
        <h1>This Means WAR!</h1>
        <div>
          <div>Player Card: {playCard}</div>
          <div>Computer Card: {compCard}</div>
        </div>
        <Button>War!</Button>
        <div>Player Deck: {playerDeck.length}</div>
        <div>Computer Deck: {computerDeck.length}</div>
        <div>Player Float: {playerFloat}</div>
        <div>Computer Float: {computerFloat}</div>
      </Container>
    );
  } else if (start === 'warUp') {
    let playCard = playerCard.Rank;
    let compCard = computerCard.Rank;
    // let playFloat = [
    //   playerFloat[0].Rank,
    //   playerFloat[1].Rank,
    //   playerFloat[2].Rank,
    // ];
    // let compFloat = [
    //   computerFloat[0].Rank,
    //   computerFloat[1].Rank,
    //   computerFloat[2].Rank,
    // ];
    return (
      <Container>
        <h1>This Means WAR!</h1>
        <div>
          <div>Player Card: {playCard}</div>
          <div>Computer Card: {compCard}</div>
        </div>
        <Button>Collect</Button>
        <div>Player Deck: {playerDeck.length}</div>
        <div>Computer Deck: {computerDeck.length}</div>
        {/* <div>Player Float: {playFloat}</div>
        <div>Computer Float: {compFloat}</div> */}
      </Container>
    );
  }
}
