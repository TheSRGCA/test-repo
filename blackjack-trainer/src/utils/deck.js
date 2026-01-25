// Card and Deck utilities

export const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const SUIT_SYMBOLS = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠',
};

export const SUIT_COLORS = {
  hearts: 'red',
  diamonds: 'red',
  clubs: 'black',
  spades: 'black',
};

// Create a single card
export function createCard(rank, suit) {
  return {
    rank,
    suit,
    value: getCardValue(rank),
    hiLoValue: getHiLoValue(rank),
    id: `${rank}-${suit}-${Math.random().toString(36).substr(2, 9)}`,
  };
}

// Get card value for blackjack
export function getCardValue(rank) {
  if (['J', 'Q', 'K'].includes(rank)) return 10;
  if (rank === 'A') return 11; // Ace initially counts as 11
  return parseInt(rank);
}

// Get Hi-Lo count value
export function getHiLoValue(rank) {
  if (['2', '3', '4', '5', '6'].includes(rank)) return 1;  // Low cards
  if (['7', '8', '9'].includes(rank)) return 0;            // Neutral
  if (['10', 'J', 'Q', 'K', 'A'].includes(rank)) return -1; // High cards
  return 0;
}

// Create a single deck
export function createDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push(createCard(rank, suit));
    }
  }
  return deck;
}

// Create multiple decks (shoe)
export function createShoe(numDecks = 6) {
  const shoe = [];
  for (let i = 0; i < numDecks; i++) {
    shoe.push(...createDeck());
  }
  return shoe;
}

// Fisher-Yates shuffle
export function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Calculate hand value
export function calculateHandValue(cards) {
  let value = 0;
  let aces = 0;

  for (const card of cards) {
    if (card.rank === 'A') {
      aces++;
      value += 11;
    } else if (['J', 'Q', 'K'].includes(card.rank)) {
      value += 10;
    } else {
      value += parseInt(card.rank);
    }
  }

  // Convert aces from 11 to 1 if needed
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }

  return value;
}

// Check if hand is soft (has an ace counting as 11)
export function isSoftHand(cards) {
  let value = 0;
  let aces = 0;

  for (const card of cards) {
    if (card.rank === 'A') {
      aces++;
      value += 11;
    } else if (['J', 'Q', 'K'].includes(card.rank)) {
      value += 10;
    } else {
      value += parseInt(card.rank);
    }
  }

  // Check if we have an ace that's still counting as 11
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }

  return aces > 0 && value <= 21;
}

// Check if hand is blackjack
export function isBlackjack(cards) {
  return cards.length === 2 && calculateHandValue(cards) === 21;
}

// Check if hand is busted
export function isBusted(cards) {
  return calculateHandValue(cards) > 21;
}

// Check if hand can split
export function canSplit(cards) {
  if (cards.length !== 2) return false;
  const value1 = cards[0].rank === 'A' ? 11 : getCardValue(cards[0].rank);
  const value2 = cards[1].rank === 'A' ? 11 : getCardValue(cards[1].rank);
  return value1 === value2;
}

// Check if hand is a pair
export function isPair(cards) {
  if (cards.length !== 2) return false;
  return cards[0].rank === cards[1].rank ||
    (getCardValue(cards[0].rank) === 10 && getCardValue(cards[1].rank) === 10);
}

// Get dealer upcard value
export function getDealerUpcard(dealerCards) {
  if (!dealerCards || dealerCards.length === 0) return null;
  return dealerCards[0];
}

// Calculate running count
export function calculateRunningCount(cards) {
  return cards.reduce((count, card) => count + card.hiLoValue, 0);
}

// Calculate true count
export function calculateTrueCount(runningCount, decksRemaining) {
  if (decksRemaining <= 0) return runningCount;
  return Math.round((runningCount / decksRemaining) * 10) / 10;
}

// Estimate decks remaining
export function estimateDecksRemaining(cardsDealt, totalDecks) {
  const cardsRemaining = (totalDecks * 52) - cardsDealt;
  return Math.max(0.5, cardsRemaining / 52);
}
