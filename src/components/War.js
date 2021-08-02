import React, { useState } from 'react';
import deck from '../cards';
import '../App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Header, Footer, Card, Float, Deck, Win, Lose } from './index';

export default function War() {
  // Define States
  const [start, setStart] = useState('off');
  const [playerDeck, setPlayerDeck] = useState([]);
  const [computerDeck, setComputerDeck] = useState([]);
  const [playerCard, setPlayerCard] = useState();
  const [computerCard, setComputerCard] = useState();
  const [playerFloat, setPlayerFloat] = useState([]);
  const [computerFloat, setComputerFloat] = useState([]);

  // Start 'on'
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

  // Start 'collect'
  // Sets current playerCard and ComputerCard to state
  function setCards(playerDeck, computerDeck) {
    setPlayerCard(playerDeck[0]);
    setComputerCard(computerDeck[0]);
    setStart('collect');
  }

  // Start 'warUp'
  // temp float arrays outside of float function because they may be added to if a battle goes beyond 1 round
  let playFloat = [];
  let compFloat = [];
  let nextCard = 1;
  let floatEnd = nextCard + 2;

  // Add next 3 cards to each player's float.
  function float() {
    // Add next 3 cards to the floats
    for (let i = nextCard; i <= floatEnd; i++) {
      playFloat.push(playerDeck[i]);
      compFloat.push(computerDeck[i]);
    }
    nextCard += 3;
    playFloat.forEach((card) => {
      setPlayerFloat((playerFloat) => [...playerFloat, card]);
    });
    compFloat.forEach((card) => {
      setComputerFloat((computerFloat) => [...computerFloat, card]);
    });
  }

  // evaulates the current player and computer cards. Adds boths cards to respective winner's decks, or if there's a tie, starts the war!
  function determineWin(currPlayerCard, currComputerCard) {
    // Player Wins
    if (currPlayerCard.Rank > currComputerCard.Rank) {
      setPlayerDeck(playerDeck.filter((card) => card !== playerCard));
      setComputerDeck(computerDeck.filter((card) => card !== computerCard));
      setPlayerDeck((playerDeck) => [...playerDeck, playerCard]);
      setPlayerDeck((playerDeck) => [...playerDeck, computerCard]);
      setStart('on');
      // Computer Wins
    }
    // Computer Wins
    else if (currComputerCard.Rank > currPlayerCard.Rank) {
      setComputerDeck(computerDeck.filter((card) => card !== computerCard));
      setPlayerDeck(playerDeck.filter((card) => card !== playerCard));
      setComputerDeck((computerDeck) => [...computerDeck, playerCard]);
      setComputerDeck((computerDeck) => [...computerDeck, computerCard]);
      setStart('on');
    }
    // Tie
    else if (currComputerCard.Rank === currPlayerCard.Rank) {
      // add cards to the float
      setStart('warUp');
      float();
    }
  }

  // determines the winner of the float battle
  function battle(currPlayerFloat, currComputerFloat) {
    let playBattle = currPlayerFloat[playerFloat.length - 1];
    let compBattle = currComputerFloat[computerFloat.length - 1];

    // Player wins
    if (playBattle.Rank > compBattle.Rank) {
      let tempPlayDeck = [...playerDeck];
      let tempCompDeck = [...computerDeck];
      // Add player's card and float to bottom of the deck
      for (let i = 0; i < playerFloat.length + 1; i++) {
        tempPlayDeck.push(tempPlayDeck.shift());
      }
      // Add computer's card and float to bottom of the deck
      for (let j = 0; j < computerFloat.length + 1; j++) {
        tempPlayDeck.push(tempCompDeck.shift());
      }
      // Update State
      setPlayerDeck(tempPlayDeck);
      setComputerDeck(tempCompDeck);
      emptyFloats();
    }
    // Computer wins
    else if (compBattle.Rank > playBattle.Rank) {
      let tempCompDeck = [...computerDeck];
      let tempPlayDeck = [...playerDeck];
      // Add computer's card and float to bottom of the deck
      for (let i = 0; i < computerFloat.length + 1; i++) {
        tempCompDeck.push(tempCompDeck.shift());
      }
      // Add player's card and float to bottom of the deck
      for (let j = 0; j < playerFloat.length + 1; j++) {
        tempCompDeck.push(tempPlayDeck.shift());
      }
      // Update State
      setComputerDeck(tempCompDeck);
      setPlayerDeck(tempPlayDeck);
      emptyFloats();
    }
    // Tie
    else if (playBattle.Rank === compBattle.Rank) {
      () => alert('Tie');
      float();
      battle(playFloat, compFloat);
    }
  }

  function emptyFloats() {
    // Empty floats
    playFloat = [];
    compFloat = [];
    nextCard = 1;
    setPlayerFloat([]);
    setComputerFloat([]);
    setStart('on');
  }

  // The actual page render. Buttons will change based on what case the game is in and update states accordingly
  if (start === 'off') {
    return (
      <Container id={'battleground'}>
        <Header />
        <Row className={'army-header'}>Your Opponent's Army</Row>
        <Row className={'Opponent'}>
          <Col className={'float-box'}>
            <Float />
          </Col>
          <Col className={'card-box'}>
            <Card />
          </Col>
          <Col className={'deck-box'}>
            <Deck />
          </Col>
        </Row>
        <Row className={'Action'}>
          <Button variant='primary' onClick={() => shuffle(deck)}>
            Deal!
          </Button>
        </Row>
        <Row className={'army-header'}>Your Army</Row>
        <Row className={'Player'}>
          <Col className={'float-box'}>
            <Float />
          </Col>
          <Col className={'card-box'}>
            <Card />
          </Col>
          <Col className={'deck-box'}>
            <Deck />
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  } else if (start === 'on') {
    if (playerDeck.length > 0 && computerDeck.length > 0) {
      return (
        <Container id={'battleground'}>
          <Header />
          <Row className={'army-header'}>Your Opponent's Army</Row>
          <Row className={'Opponent'}>
            <Col className={'float-box'}>
              <Float />
            </Col>
            <Col className={'card-box'}>
              <Card />
            </Col>
            <Col className={'deck-box'}>
              <Deck deck={computerDeck} player={'red'} />
            </Col>
          </Row>
          <Button onClick={() => setCards(playerDeck, computerDeck)}>
            Play Card
          </Button>
          <Row className={'army-header'}>Your Army</Row>
          <Row className={'Player'}>
            <Col className={'float-box'}>
              <Float />
            </Col>
            <Col className={'card-box'}>
              <Card />
            </Col>
            <Col className={'deck-box'}>
              <Deck deck={playerDeck} player={'blue'} />
            </Col>
          </Row>
          <Footer />
        </Container>
      );
    } else if (playerDeck.length === 0) {
      return <Lose />;
    } else if (computerDeck.length === 0) {
      return <Win />;
    }
  } else if (start === 'collect') {
    if (playerDeck.length > 0 && computerDeck.length > 0) {
      return (
        <Container id={'battleground'}>
          <Header />
          <Row className={'army-header'}>Your Opponent's Army</Row>
          <Row className={'Opponent'}>
            <Col className={'float-box'}>
              <Float />
            </Col>
            <Col className={'card-box'}>
              <Card card={computerCard} />
            </Col>
            <Col className={'deck-box'}>
              <Deck deck={computerDeck} player={'red'} />
            </Col>
          </Row>
          <Button onClick={() => determineWin(playerCard, computerCard)}>
            Collect
          </Button>
          <Row className={'army-header'}>Your Army</Row>
          <Row className={'Player'}>
            <Col className={'float-box'}>
              <Float />
            </Col>
            <Col className={'card-box'}>
              <Card card={playerCard} />
            </Col>
            <Col className={'deck-box'}>
              <Deck deck={playerDeck} player={'blue'} />
            </Col>
          </Row>
          <Footer />
        </Container>
      );
    } else if (playerDeck.length === 0) {
      return <Lose />;
    } else if (computerDeck.length === 0) {
      return <Win />;
    }
  } else if (start === 'warUp') {
    if (playerDeck.length > 0 && computerDeck.length > 0) {
      return (
        <Container id={'battleground'}>
          <Header />
          <Row className={'army-header'}>Your Opponent's Army</Row>
          <Row className={'Opponent'}>
            <Col className={'float-box'}>
              <Float float={computerFloat} player={'red'} />
            </Col>
            <Col className={'card-box'}>
              <Card card={computerCard} />
            </Col>
            <Col className={'deck-box'}>
              <Deck deck={computerDeck} player={'red'} />
            </Col>
          </Row>
          <Button onClick={() => battle(playerFloat, computerFloat)}>
            Collect
          </Button>
          <Row className={'army-header'}>Your Army</Row>
          <Row className={'Player'}>
            <Col className={'float-box'}>
              <Float float={playerFloat} player={'blue'} />
            </Col>
            <Col className={'card-box'}>
              <Card card={playerCard} />
            </Col>
            <Col className={'deck-box'}>
              <Deck deck={playerDeck} player={'blue'} />
            </Col>
          </Row>
          <Footer />
        </Container>
      );
    } else if (playerDeck.length === 0) {
      return <Lose />;
    } else if (computerDeck.length === 0) {
      return <Win />;
    }
  }
}
