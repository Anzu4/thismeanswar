import React, { useState } from 'react';
import './App.css';
import { Container, Row, Button } from 'react-bootstrap';
import { War, Header, Footer } from './components';

function App() {
  const [game, setGame] = useState('off');

  if (game === 'off') {
    return (
      <Container className={'App'}>
        <Row>
          <Header />
        </Row>
        <Row>
          <div className={'splash_text_box'}>
            <p>'An ancient and brutal fight to the death!</p>
            <p>
              You and your opponent each recieve 26 cards. On each turn, you
              will each flip your top card. Highest card will capture both
              cards!
            </p>
            <p>
              If there is a tie, you will be placed in an epic battle where the
              top 2 cards are placed face-down, and the next card is placed
              face-up. Highest of the face-up cards captures all the cards from
              that round.
            </p>
            First player to obtain all 52 cards will be declared VICTORIOUS'
          </div>
        </Row>

        <Button className={'button'} onClick={() => setGame('on')}>
          Play WAR
        </Button>
        <Row>
          <div className={'team_text_box'}>
            <p>
              Solo project by Desiree Nelson for the MintBean Hiring Hackathon.
            </p>
            Made with create-react-app and Javascript. Deployed on Netlify!
          </div>
        </Row>
        <Footer />
      </Container>
    );
  } else {
    return <War />;
  }
}

export default App;
