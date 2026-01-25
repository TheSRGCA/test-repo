// Basic Strategy Charts for Blackjack
// H = Hit, S = Stand, D = Double (hit if not allowed), Ds = Double (stand if not allowed)
// P = Split, Ph = Split if DAS allowed else Hit, Pd = Split if DAS allowed else Double
// Rh = Surrender if allowed else Hit, Rs = Surrender if allowed else Stand, Rp = Surrender if allowed else Split

// Dealer upcard indices: 2, 3, 4, 5, 6, 7, 8, 9, 10, A
const dealerCards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'];

// Hard totals strategy (rows 5-21)
export const hardTotals = {
  5:  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
  6:  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
  7:  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
  8:  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
  9:  ['H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
  10: ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H'],
  11: ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D'],
  12: ['H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
  13: ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
  14: ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
  15: ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'Rh', 'Rh'],
  16: ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'Rh', 'Rh', 'Rh'],
  17: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'Rs'],
  18: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
  19: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
  20: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
  21: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
};

// Soft totals strategy (A,2 through A,9)
export const softTotals = {
  13: ['H', 'H', 'H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],  // A,2
  14: ['H', 'H', 'H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],  // A,3
  15: ['H', 'H', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],  // A,4
  16: ['H', 'H', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],  // A,5
  17: ['H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],  // A,6
  18: ['Ds', 'Ds', 'Ds', 'Ds', 'Ds', 'S', 'S', 'H', 'H', 'H'],  // A,7
  19: ['S', 'S', 'S', 'S', 'Ds', 'S', 'S', 'S', 'S', 'S'],  // A,8
  20: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],  // A,9
};

// Pair splitting strategy
export const pairSplitting = {
  '2,2':   ['Ph', 'Ph', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H'],
  '3,3':   ['Ph', 'Ph', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H'],
  '4,4':   ['H', 'H', 'H', 'Ph', 'Ph', 'H', 'H', 'H', 'H', 'H'],
  '5,5':   ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H'],  // Never split 5s
  '6,6':   ['Ph', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H', 'H'],
  '7,7':   ['P', 'P', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H'],
  '8,8':   ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'Rp'],
  '9,9':   ['P', 'P', 'P', 'P', 'P', 'S', 'P', 'P', 'S', 'S'],
  '10,10': ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],  // Never split 10s
  'A,A':   ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
};

// Get dealer index from card
export function getDealerIndex(dealerCard) {
  const rank = dealerCard.rank || dealerCard;
  if (['J', 'Q', 'K'].includes(rank)) return 8; // 10 index
  if (rank === 'A') return 9;
  return dealerCards.indexOf(rank);
}

// Get basic strategy action
export function getBasicStrategy(playerCards, dealerUpcard, rules = {}) {
  const { doubleAfterSplit = true, surrender = true, resplitAces = false } = rules;

  const dealerIndex = getDealerIndex(dealerUpcard);
  const handValue = calculateHandValueForStrategy(playerCards);
  const isSoft = isHandSoft(playerCards);
  const isPairHand = isPairForStrategy(playerCards);

  let action;

  // Check for pairs first
  if (isPairHand && playerCards.length === 2) {
    const pairKey = getPairKey(playerCards);
    if (pairSplitting[pairKey]) {
      action = pairSplitting[pairKey][dealerIndex];
    }
  }

  // If no pair action, check soft totals
  if (!action && isSoft && softTotals[handValue]) {
    action = softTotals[handValue][dealerIndex];
  }

  // If still no action, use hard totals
  if (!action && hardTotals[handValue]) {
    action = hardTotals[handValue][dealerIndex];
  }

  // Default to hit if hand value not in charts
  if (!action) {
    action = handValue < 17 ? 'H' : 'S';
  }

  // Resolve conditional actions based on rules
  return resolveAction(action, rules, playerCards.length);
}

// Calculate hand value for strategy lookup
function calculateHandValueForStrategy(cards) {
  let value = 0;
  let aces = 0;

  for (const card of cards) {
    const rank = card.rank || card;
    if (rank === 'A') {
      aces++;
      value += 11;
    } else if (['J', 'Q', 'K'].includes(rank)) {
      value += 10;
    } else {
      value += parseInt(rank);
    }
  }

  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }

  return value;
}

// Check if hand is soft
function isHandSoft(cards) {
  let value = 0;
  let aces = 0;

  for (const card of cards) {
    const rank = card.rank || card;
    if (rank === 'A') {
      aces++;
      value += 11;
    } else if (['J', 'Q', 'K'].includes(rank)) {
      value += 10;
    } else {
      value += parseInt(rank);
    }
  }

  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }

  return aces > 0 && value <= 21;
}

// Check if hand is a pair
function isPairForStrategy(cards) {
  if (cards.length !== 2) return false;
  const rank1 = cards[0].rank || cards[0];
  const rank2 = cards[1].rank || cards[1];

  const val1 = ['J', 'Q', 'K'].includes(rank1) ? '10' : rank1;
  const val2 = ['J', 'Q', 'K'].includes(rank2) ? '10' : rank2;

  return val1 === val2;
}

// Get pair key for lookup
function getPairKey(cards) {
  const rank1 = cards[0].rank || cards[0];
  const rank2 = cards[1].rank || cards[1];

  const val1 = ['J', 'Q', 'K'].includes(rank1) ? '10' : rank1;
  const val2 = ['J', 'Q', 'K'].includes(rank2) ? '10' : rank2;

  return `${val1},${val2}`;
}

// Resolve conditional actions
function resolveAction(action, rules, cardCount) {
  const { doubleAfterSplit = true, surrender = true } = rules;
  const canDouble = cardCount === 2;

  switch (action) {
    case 'D':
      return canDouble ? 'DOUBLE' : 'HIT';
    case 'Ds':
      return canDouble ? 'DOUBLE' : 'STAND';
    case 'P':
      return 'SPLIT';
    case 'Ph':
      return doubleAfterSplit ? 'SPLIT' : 'HIT';
    case 'Pd':
      return doubleAfterSplit ? 'SPLIT' : (canDouble ? 'DOUBLE' : 'HIT');
    case 'Rh':
      return surrender && cardCount === 2 ? 'SURRENDER' : 'HIT';
    case 'Rs':
      return surrender && cardCount === 2 ? 'SURRENDER' : 'STAND';
    case 'Rp':
      return surrender && cardCount === 2 ? 'SURRENDER' : 'SPLIT';
    case 'H':
      return 'HIT';
    case 'S':
      return 'STAND';
    default:
      return action;
  }
}

// Action colors for display
export const actionColors = {
  H: { bg: 'bg-green-500', text: 'Hit' },
  S: { bg: 'bg-red-500', text: 'Stand' },
  D: { bg: 'bg-yellow-500', text: 'Double' },
  Ds: { bg: 'bg-yellow-600', text: 'Double/Stand' },
  P: { bg: 'bg-blue-500', text: 'Split' },
  Ph: { bg: 'bg-blue-400', text: 'Split/Hit' },
  Pd: { bg: 'bg-blue-600', text: 'Split/Double' },
  Rh: { bg: 'bg-purple-500', text: 'Surrender/Hit' },
  Rs: { bg: 'bg-purple-600', text: 'Surrender/Stand' },
  Rp: { bg: 'bg-purple-400', text: 'Surrender/Split' },
  HIT: { bg: 'bg-green-500', text: 'Hit' },
  STAND: { bg: 'bg-red-500', text: 'Stand' },
  DOUBLE: { bg: 'bg-yellow-500', text: 'Double' },
  SPLIT: { bg: 'bg-blue-500', text: 'Split' },
  SURRENDER: { bg: 'bg-purple-500', text: 'Surrender' },
};

export { dealerCards };
