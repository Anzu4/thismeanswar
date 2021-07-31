import React, { useState } from 'react';
import './App.css';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { War, Header } from './components';

function App() {
  const [game, setGame] = useState('off');

  if (game === 'off') {
    return (
      <div>
        <Container className={'App'} fluid>
          <Row id={'site_header'}>
            <Header />
          </Row>
          <Row id={'splash-main'}>
            <Col className={'splash_text_box'}>
              <div className={'splash-text'}>
                <p>An ancient and brutal fight to the death!</p>
                <p>
                  You and your opponent each recieve 26 cards. On each turn, you
                  will each flip your top card. Highest card will capture both
                  cards!
                </p>
                <p>
                  If there is a tie, you will be placed in an epic battle where
                  the top 2 cards are placed face-down, and the next card is
                  placed face-up. Highest of the face-up cards captures all the
                  cards from that round.
                </p>
                <p>
                  First player to obtain all 52 cards will be declared
                  VICTORIOUS!!
                </p>
                <div>
                  <Button
                    className={'splash-button'}
                    onClick={() => setGame('on')}
                  >
                    Play WAR
                  </Button>
                </div>
                <div className={'splash-text'}>
                  <p>
                    Solo project by Desiree Nelson for the MintBean Hiring
                    Hackathon.
                  </p>
                  <p>
                    Made with create-react-app and Javascript. Deployed on
                    Netlify!
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return <War />;
  }
}

export default App;
