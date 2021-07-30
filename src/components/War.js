import React, { useState } from 'react';
import deck from '../cards';
import '../App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Header, Footer, Card, Float } from './index';

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

  // Add next 3 cards to each player's float.
  function float() {
    let nextCard = 1;
    let floatEnd = nextCard + 2;
    // Add next 3 cards to the floats
    for (let i = nextCard; i <= floatEnd; i++) {
      playFloat.push(playerDeck[i]);
      compFloat.push(computerDeck[i]);
      nextCard += 3;
    }
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
  function battle(playerFloat, computerFloat) {
    let playBattle = playerFloat[playerFloat.length - 1];
    let compBattle = computerFloat[computerFloat.length - 1];

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
    }
    // Tie
    else if (playBattle.Rank === compBattle.Rank) {
      float();
    }

    // Empty floats
    playFloat = [];
    compFloat = [];
    setPlayerFloat([]);
    setComputerFloat([]);
    setStart('on');
  }

  // The actual page render. Buttons will change based on what case the game is in and update states accordingly
  if (start === 'off') {
    return (
      <Container id={'battleground'}>
        <Header />
        <Row className={'Opponant'}>
          <Col className={'Opp-float'}>
            <p>Float</p>
          </Col>
          <Col className={'Opp-card'}>
            <p>Card</p>
          </Col>
          <Col className={'Opp-deck'}>
            <p>Deck</p>
          </Col>
        </Row>
        <Row className={'Action'}>
          <Button variant='primary' onClick={() => shuffle(deck)}>
            Deal!
          </Button>
        </Row>
        <Row className={'Player'}>
          <Col className={'Play-float'}>
            <p>Float</p>
          </Col>
          <Col className={'Play-card'}>
            <p>Card</p>
          </Col>
          <Col className={'Play-deck'}>
            <p>Deck</p>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  } else if (start === 'on') {
    if (playerDeck.length > 0 && computerDeck.length > 0) {
      //let compCard = computerCard;
      //console.log(computerCard);
      return (
        <Container id={'battleground'}>
          <Header />
          <Row className={'Opponant'}>
            <Col className={'float-box'}>
              <Float />
            </Col>
            <Col className={'single-card'}>
              <Card />
            </Col>
            <Col className={'Opp-deck'}>
              <p>{computerDeck.length}</p>
            </Col>
          </Row>
          <Button onClick={() => setCards(playerDeck, computerDeck)}>
            Play Card
          </Button>
          <Row className={'Player'}>
            <Col className={'float-box'}>
              <Float />
            </Col>
            <Col className={'single-card'}>
              <Card />
            </Col>
            <Col className={'Play-deck'}>
              <p>{playerDeck.length}</p>
            </Col>
          </Row>
          <Footer />
        </Container>
      );
    } else if (playerDeck.length === 0) {
      console.log('You lose!');
    } else if (computerDeck.length === 0) {
      console.log('You WIN!');
    }
  } else if (start === 'collect') {
    if (playerDeck.length > 0 && computerDeck.length > 0) {
      // let playCard = playerCard.Rank;
      // let compCard = computerCard.Rank;

      return (
        <Container id={'battleground'}>
          <Header />
          <Row className={'Opponant'}>
            <Col className={'float-box'}>
              <Float />
            </Col>
            <Col className={'Opp-card'}>
              <Card card={computerCard} />
            </Col>
            <Col className={'Opp-deck'}>
              <p>{computerDeck.length}</p>
            </Col>
          </Row>
          <Button onClick={() => determineWin(playerCard, computerCard)}>
            Collect
          </Button>
          <Row className={'Player'}>
            <Col className={'float-box'}>
              <Float />
            </Col>
            <Col className={'single-card'}>
              <Card card={playerCard} />
            </Col>
            <Col className={'Play-deck'}>
              <p>{playerDeck.length}</p>
            </Col>
          </Row>
          <Footer />
        </Container>
      );
    } else if (playerDeck.length === 0) {
      console.log('You lose!');
    } else if (computerDeck.length === 0) {
      console.log('You WIN!');
    }
  } else if (start === 'warUp') {
    if (playerDeck.length > 0 && computerDeck.length > 0) {
      // let playCard = playerCard.Rank;
      // let compCard = computerCard.Rank;
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
        <Container id={'battleground'}>
          <Header />
          <Row className={'Opponant'}>
            <Col className={'float-box'}>
              <Float float={computerFloat} />
            </Col>
            <Col className={'single-card'}>
              <Card card={computerCard} />
            </Col>
            <Col className={'Opp-deck'}>
              <p>{computerDeck.length}</p>
            </Col>
          </Row>
          <Button onClick={() => battle(playerFloat, computerFloat)}>
            Collect
          </Button>
          <Row className={'Player'}>
            <Col className={'float-box'}>
              <Float float={playerFloat} />
            </Col>
            <Col className={'single-card'}>
              <Card card={playerCard} />
            </Col>
            <Col className={'Play-deck'}>
              <p>{playerDeck.length}</p>
            </Col>
          </Row>
          <Footer />
        </Container>
      );
    } else if (playerDeck.length === 0) {
      console.log('You lose!');
    } else if (computerDeck.length === 0) {
      console.log('You WIN!');
    }
  }
}
