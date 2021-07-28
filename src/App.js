import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import { Deck } from './cards';
import Splash from './components/Splash';

class App extends Component {
  render() {
    let game = false;
    if (game) {
      return <h2>This will be the game board</h2>;
    } else {
      return <Splash />;
    }
  }
}

export default hot(module)(App);
