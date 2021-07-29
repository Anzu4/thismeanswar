import React, { useState, Component } from 'react';
import deck from '../cards';
import { Container, Button } from 'react-bootstrap';

// class War extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       //deck: this.props.deck,
//       playerDeck: [],
//       start: 'off',
//       computerDeck: [],
//     };
//     this.shuffle = this.shuffle.bind(this);
//     this.dealTwo = this.dealTwo.bind(this);
//     // this.play = this.play.bind(this);
//   }

//   shuffle = (deck) => {
//     for (let i = 0; i < deck.length; i++) {
//       let j = Math.floor(Math.random() * i);
//       let temp = deck[i];
//       deck[i] = deck[j];
//       deck[j] = temp;
//     }
//     this.dealTwo(deck);
//     //console.log(deck);
//     this.setState({ start: 'on' });
//     //console.log(playerDeck, computerDeck);
//   };

//   dealTwo(deck) {
//     const player = [];
//     const computer = [];
//     //const playerDeck = this.state.playerDeck;
//     for (let i = 0; i < deck.length; i++) {
//       let card = deck[i];
//       this.setState({
//         playerDeck: [...this.state.playerDeck, [card]],
//       });
//       // if (i % 2 === 0) {
//       //   //player.push(deck[i]);
//       //   this.setState(
//       //     { playerDeck: [...this.state.playerDeck, card] },
//       //     () => {}
//       //   );
//       //   //console.log(card);
//       // } else {
//       //   computer.push(deck[i]);
//       // }
//     }
//     //console.log(player, computer);
//     console.log(this.state.playerDeck);
//     // this.setState(
//     //   () => ({ playerDeck: [...this.state.playerDeck, deck[i]] }),
//     //   () => {
//     //     console.log(this.state.playerDeck);
//     //   }
//     // );
//   }

//   //play()

//   render() {
//     let deck = this.props.deck;
//     if (this.state.start === 'off') {
//       return (
//         <Container>
//           <h1>This Means WAR!</h1>
//           <Button varient='primary' onClick={() => this.shuffle(deck)}>
//             Deal!
//           </Button>
//         </Container>
//       );
//     } else {
//       return (
//         <Container>
//           <h1>This Means War!</h1>
//           {/* <Button onClick={() => play(playerDeck, computerDeck)}>
//             Play Card
//           </Button> */}
//           Play!
//         </Container>
//       );
//       //return <h1>This Means WAR!</h1>;
//     }
//   }
// }

function War() {
  let playDeck = [];
  let compDeck = [];

  const [start, setStart] = useState('off');
  const [playerDeck, setPlayerDeck] = useState([]);
  let [computerDeck, setComputerDeck] = useState([]);
  // let [playerCardSuit, setPlayerCardSuit] = useState();
  // let [playerCardRank, setPlayerCardRank] = useState();
  // let [computerCard, setComputerCard] = useState();

  //const deck = props.deck;

  function shuffle(deck) {
    setStart('on');
    for (let i = 0; i < deck.length; i++) {
      let j = Math.floor(Math.random() * i);
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }

    dealTwo(deck);
    //setPlayerDeck([...playerDeck, playDeck]);
    //console.log(deck);
    //handleNewDecks(playDeck, compDeck);
    //setPlayerDeck((playerDeck) => [...playerDeck, deck[0]]);
    console.log(playDeck, compDeck);
    console.log(playerDeck);
    //console.log(computerDeck);
  }

  let playDeck = [];
  let compDeck = [];
  function dealTwo(deck) {
    for (let i = 0; i < deck.length; i++) {
      let card = deck[i];
      if (i % 2 === 0) {
        playDeck.push(card);
      } else {
        compDeck.push(card);
      }
    }
    //console.log(playDeck, compDeck);
    setPlayerDeck((playerDeck) => [...playerDeck, playDeck]);
  }

  // function handleNewDecks(playDeck, compDeck) {
  //   playDeck.map((playCard) =>
  //     Object.assign(playCard, {
  //       Suit: playCard.Suit,
  //       Rank: playCard.Rank,
  //     })
  //   );
  //   setPlayerDeck([...playerDeck, playDeck]);
  // }

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
