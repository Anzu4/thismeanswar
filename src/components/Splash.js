import React from 'react';
import { Container, Button } from 'react-bootstrap';
import War from './War';

export default function Splash() {
  return (
    <Container fluid>
      <h1>This Means WAR!</h1>
      <Button>Play Game!</Button>
    </Container>
  );
}
