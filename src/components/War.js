import React, { useState } from 'react';
import deck from '../cards';
import { Container, Button } from 'react-bootstrap';

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
    switch (start) {
      // Cards have been played outside of a 'war' senario
      case 'collect':
        // Player Wins
        if (currPlayerCard.Rank > currComputerCard.Rank) {
          setPlayerDeck(playerDeck.filter((card) => card !== playerCard));
          setComputerDeck(computerDeck.filter((card) => card !== computerCard));
          setPlayerDeck((playerDeck) => [...playerDeck, playerCard]);
          setPlayerDeck((playerDeck) => [...playerDeck, computerCard]);
          setStart('on');
          break;
          // Computer Wins
        }
        // Computer Wins
        else if (currComputerCard.Rank > currPlayerCard.Rank) {
          setComputerDeck(computerDeck.filter((card) => card !== computerCard));
          setPlayerDeck(playerDeck.filter((card) => card !== playerCard));
          setComputerDeck((computerDeck) => [...computerDeck, playerCard]);
          setComputerDeck((computerDeck) => [...computerDeck, computerCard]);
          setStart('on');
          break;
        }
        // Tie
        else if (currComputerCard.Rank === currPlayerCard.Rank) {
          // add cards to the float
          setStart('warUp');
          float();
          break;
        }
      // Cards have been played inside of a 'war' senario
      //   case 'warUp':
      //     console.log(currComputerCard, currPlayerCard);
      //     // Player Wins
      //     if (currPlayerCard.Rank > currComputerCard.Rank) {
      //       let tempPlayDeck = [...playerDeck];
      //       // put current card at back
      //       tempPlayDeck.push(tempPlayDeck.shift());
      //       // add player float
      //       playFloat.forEach((card) => {
      //         tempPlayDeck.push(card);
      //       });
      //       // add computer's card
      //       tempPlayDeck.push(computerCard);
      //       // add computer's float
      //       playFloat.forEach((card) => tempPlayDeck.push(card));
      //       console.log(tempPlayDeck);
      //       setPlayerDeck(tempPlayDeck);

      //       let tempCompDeck = [...computerDeck];
      //       // remove current card and float
      //       tempCompDeck.splice(0, compFloat.length + 1);
      //       console.log(tempCompDeck);
      //       setComputerDeck(tempCompDeck);

      //       // Remove current card from top of Deck
      //       //setPlayerDeck(playerDeck.filter((card) => card !== playerCard));
      //       //setComputerDeck(computerDeck.filter((card) => card !== computerCard));
      //       // add the current cards and each float to the bottom of the player's deck
      //       // Add Player's current card
      //       //setPlayerDeck((playerDeck) => [...playerDeck, playerCard]);
      //       // Add cards from Player's Float
      //       //playFloat.forEach((card) => {
      //       // setPlayerDeck((playerDeck) => [...playerDeck, card]);
      //       // });
      //       // Add Computer's current card
      //       // setPlayerDeck((playerDeck) => [...playerDeck, computerCard]);
      //       // Add Computer's Float
      //       // compFloat.forEach((card) => {
      //       //   setComputerDeck((computerDeck) => [...computerDeck, card]);
      //       // });
      //       // empty floats
      //       playFloat = [];
      //       compFloat = [];
      //       setPlayerFloat([]);
      //       setComputerFloat([]);
      //       setStart('on');
      //     }
      //     // Computer Wins
      //     else if (currComputerCard.Rank > currPlayerCard.Rank) {
      //       // Remove current card from top of Deck
      //       setPlayerDeck(playerDeck.filter((card) => card !== playerCard));
      //       setComputerDeck(computerDeck.filter((card) => card !== computerCard));
      //       // add the current cards and each float to the bottom of the computer's deck
      //       setComputerDeck((computerDeck) => [...computerDeck, computerCard]);
      //       compDeck.forEach((card) => {
      //         setComputerDeck((computerDeck) => [...computerDeck, card]);
      //       });
      //       setComputerDeck((computerDeck) => [...computerDeck, computerCard]);
      //       playDeck.forEach((card) => {
      //         setComputerDeck((computerDeck) => [...computerDeck, card]);
      //       });
      //       // empty floats
      //       setPlayerFloat([]);
      //       setComputerFloat([]);
      //       setStart('on');
      //     } else if (currComputerCard.Rank === currPlayerCard.Rank) {
      //       float();
      //       setStart('warUp');
      //       break;
      //     }
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
        <div>{start}</div>
        <div>Player Card:</div>
        <div>Computer Card:</div>
        <Button onClick={() => setCards(playerDeck, computerDeck)}>
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
            <div>{start}</div>
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
  } else if (start === 'warUp') {
    let playCard = playerCard.Rank;
    let compCard = computerCard.Rank;
    let playFloat = [
      playerFloat[0].Rank,
      playerFloat[1].Rank,
      playerFloat[2].Rank,
    ];
    let compFloat = [
      computerFloat[0].Rank,
      computerFloat[1].Rank,
      computerFloat[2].Rank,
    ];
    return (
      <Container>
        <h1>This Means WAR!</h1>
        <div>
          <div>{start}</div>
          <div>Player Card: {playCard}</div>
          <div>Computer Card: {compCard}</div>
        </div>
        <Button onClick={() => battle(playerFloat, computerFloat)}>
          Collect
        </Button>
        <div>Player Deck: {playerDeck.length}</div>
        <div>Computer Deck: {computerDeck.length}</div>
        <div>
          Player Float:
          <div>{playFloat[0]}</div>
          <div>{playFloat[1]}</div>
          <div>{playFloat[2]}</div>
        </div>
        <div>
          Computer Float:
          <div>{compFloat[0]}</div>
          <div>{compFloat[1]}</div>
          <div>{compFloat[2]}</div>
        </div>
      </Container>
    );
  }
}
