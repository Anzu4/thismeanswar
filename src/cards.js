// Card Elements
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const deck = [];

// Loop over Card Elements to create deck array
// for (let i = 0; i < suits.length; i++) {
//   for (let j = 0; j < ranks.length; j++) {
//     let card = { Suit: suits[i], Rank: ranks[j] };
//     deck.push(card);
//   }
// }

for (let i = 0; i < suits.length; i++) {
  for (let j = 0; j < ranks.length; j++) {
    let card = [suits[i], ranks[j]];
    deck.push(card);
  }
}

export default deck;
