import React, { useState } from 'react';
import './App.css';
import { Container, Button } from 'react-bootstrap';
import War from './components/War';

function App() {
  const [game, setGame] = useState('off');

  if (game === 'off') {
    return (
      <Container>
        <h1>This Means WAR!</h1>
        <Button onClick={() => setGame('on')}>Play WAR</Button>
      </Container>
    );
  } else {
    return <War />;
  }
}

export default App;
