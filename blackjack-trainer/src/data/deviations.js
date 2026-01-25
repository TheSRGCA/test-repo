// Strategy Deviations - The Illustrious 18 and Fab 4
// These are the most important plays that deviate from basic strategy based on true count

// The Illustrious 18 - Most valuable strategy deviations
// Format: { hand, dealerUpcard, basicAction, deviationAction, trueCountThreshold, description }
export const illustrious18 = [
  {
    id: 1,
    hand: '16',
    dealerUpcard: '10',
    basicAction: 'HIT',
    deviationAction: 'STAND',
    threshold: 0,
    thresholdType: '>=',
    description: 'Stand on 16 vs 10 at TC 0 or higher',
    importance: 'Most valuable deviation',
  },
  {
    id: 2,
    hand: '15',
    dealerUpcard: '10',
    basicAction: 'HIT',
    deviationAction: 'STAND',
    threshold: 4,
    thresholdType: '>=',
    description: 'Stand on 15 vs 10 at TC +4 or higher',
    importance: 'High value',
  },
  {
    id: 3,
    hand: '10,10',
    dealerUpcard: '5',
    basicAction: 'STAND',
    deviationAction: 'SPLIT',
    threshold: 5,
    thresholdType: '>=',
    description: 'Split 10s vs 5 at TC +5 or higher',
    importance: 'High value when conditions met',
  },
  {
    id: 4,
    hand: '10,10',
    dealerUpcard: '6',
    basicAction: 'STAND',
    deviationAction: 'SPLIT',
    threshold: 4,
    thresholdType: '>=',
    description: 'Split 10s vs 6 at TC +4 or higher',
    importance: 'High value when conditions met',
  },
  {
    id: 5,
    hand: '10',
    dealerUpcard: '10',
    basicAction: 'HIT',
    deviationAction: 'DOUBLE',
    threshold: 4,
    thresholdType: '>=',
    description: 'Double 10 vs 10 at TC +4 or higher',
    importance: 'High value',
  },
  {
    id: 6,
    hand: '12',
    dealerUpcard: '3',
    basicAction: 'HIT',
    deviationAction: 'STAND',
    threshold: 2,
    thresholdType: '>=',
    description: 'Stand on 12 vs 3 at TC +2 or higher',
    importance: 'Medium value',
  },
  {
    id: 7,
    hand: '12',
    dealerUpcard: '2',
    basicAction: 'HIT',
    deviationAction: 'STAND',
    threshold: 3,
    thresholdType: '>=',
    description: 'Stand on 12 vs 2 at TC +3 or higher',
    importance: 'Medium value',
  },
  {
    id: 8,
    hand: '11',
    dealerUpcard: 'A',
    basicAction: 'HIT',
    deviationAction: 'DOUBLE',
    threshold: 1,
    thresholdType: '>=',
    description: 'Double 11 vs A at TC +1 or higher',
    importance: 'High value',
  },
  {
    id: 9,
    hand: '9',
    dealerUpcard: '2',
    basicAction: 'HIT',
    deviationAction: 'DOUBLE',
    threshold: 1,
    thresholdType: '>=',
    description: 'Double 9 vs 2 at TC +1 or higher',
    importance: 'Medium value',
  },
  {
    id: 10,
    hand: '10',
    dealerUpcard: 'A',
    basicAction: 'HIT',
    deviationAction: 'DOUBLE',
    threshold: 4,
    thresholdType: '>=',
    description: 'Double 10 vs A at TC +4 or higher',
    importance: 'Medium value',
  },
  {
    id: 11,
    hand: '9',
    dealerUpcard: '7',
    basicAction: 'HIT',
    deviationAction: 'DOUBLE',
    threshold: 3,
    thresholdType: '>=',
    description: 'Double 9 vs 7 at TC +3 or higher',
    importance: 'Low value',
  },
  {
    id: 12,
    hand: '16',
    dealerUpcard: '9',
    basicAction: 'HIT',
    deviationAction: 'STAND',
    threshold: 5,
    thresholdType: '>=',
    description: 'Stand on 16 vs 9 at TC +5 or higher',
    importance: 'Low value',
  },
  {
    id: 13,
    hand: '13',
    dealerUpcard: '2',
    basicAction: 'STAND',
    deviationAction: 'HIT',
    threshold: -1,
    thresholdType: '<=',
    description: 'Hit 13 vs 2 at TC -1 or lower',
    importance: 'Low value',
  },
  {
    id: 14,
    hand: '12',
    dealerUpcard: '4',
    basicAction: 'STAND',
    deviationAction: 'HIT',
    threshold: 0,
    thresholdType: '<',
    description: 'Hit 12 vs 4 at TC below 0',
    importance: 'Low value',
  },
  {
    id: 15,
    hand: '12',
    dealerUpcard: '5',
    basicAction: 'STAND',
    deviationAction: 'HIT',
    threshold: -2,
    thresholdType: '<=',
    description: 'Hit 12 vs 5 at TC -2 or lower',
    importance: 'Low value',
  },
  {
    id: 16,
    hand: '12',
    dealerUpcard: '6',
    basicAction: 'STAND',
    deviationAction: 'HIT',
    threshold: -1,
    thresholdType: '<=',
    description: 'Hit 12 vs 6 at TC -1 or lower',
    importance: 'Low value',
  },
  {
    id: 17,
    hand: '13',
    dealerUpcard: '3',
    basicAction: 'STAND',
    deviationAction: 'HIT',
    threshold: -2,
    thresholdType: '<=',
    description: 'Hit 13 vs 3 at TC -2 or lower',
    importance: 'Low value',
  },
  {
    id: 18,
    hand: 'Insurance',
    dealerUpcard: 'A',
    basicAction: 'NO',
    deviationAction: 'YES',
    threshold: 3,
    thresholdType: '>=',
    description: 'Take insurance at TC +3 or higher',
    importance: 'Very high value',
  },
];

// The Fab 4 - Surrender deviations
export const fab4 = [
  {
    id: 1,
    hand: '14',
    dealerUpcard: '10',
    basicAction: 'HIT',
    deviationAction: 'SURRENDER',
    threshold: 3,
    thresholdType: '>=',
    description: 'Surrender 14 vs 10 at TC +3 or higher',
    importance: 'High value',
  },
  {
    id: 2,
    hand: '15',
    dealerUpcard: '10',
    basicAction: 'SURRENDER',
    deviationAction: 'HIT',
    threshold: 0,
    thresholdType: '<',
    description: 'Hit (don\'t surrender) 15 vs 10 at TC below 0',
    importance: 'Medium value',
  },
  {
    id: 3,
    hand: '15',
    dealerUpcard: '9',
    basicAction: 'HIT',
    deviationAction: 'SURRENDER',
    threshold: 2,
    thresholdType: '>=',
    description: 'Surrender 15 vs 9 at TC +2 or higher',
    importance: 'Medium value',
  },
  {
    id: 4,
    hand: '15',
    dealerUpcard: 'A',
    basicAction: 'HIT',
    deviationAction: 'SURRENDER',
    threshold: 1,
    thresholdType: '>=',
    description: 'Surrender 15 vs A at TC +1 or higher',
    importance: 'Medium value',
  },
];

// Check if deviation applies
export function checkDeviation(hand, dealerUpcard, trueCount, deviations = [...illustrious18, ...fab4]) {
  for (const deviation of deviations) {
    if (matchesDeviation(hand, dealerUpcard, deviation)) {
      const applies = evaluateThreshold(trueCount, deviation.threshold, deviation.thresholdType);
      if (applies) {
        return deviation;
      }
    }
  }
  return null;
}

// Match hand to deviation
function matchesDeviation(hand, dealerUpcard, deviation) {
  const dealerRank = dealerUpcard.rank || dealerUpcard;
  const normalizedDealer = ['J', 'Q', 'K'].includes(dealerRank) ? '10' : dealerRank;

  if (normalizedDealer !== deviation.dealerUpcard) return false;

  // Special case for insurance
  if (deviation.hand === 'Insurance') return true;

  // Check if hand matches
  const handStr = getHandString(hand);
  return handStr === deviation.hand;
}

// Get hand string for comparison
function getHandString(cards) {
  if (!Array.isArray(cards)) return String(cards);

  // Check for pairs
  if (cards.length === 2) {
    const rank1 = cards[0].rank || cards[0];
    const rank2 = cards[1].rank || cards[1];
    const val1 = ['J', 'Q', 'K'].includes(rank1) ? '10' : rank1;
    const val2 = ['J', 'Q', 'K'].includes(rank2) ? '10' : rank2;

    if (val1 === val2) {
      return `${val1},${val2}`;
    }
  }

  // Return hand total
  let value = 0;
  for (const card of cards) {
    const rank = card.rank || card;
    if (rank === 'A') {
      value += 11;
    } else if (['J', 'Q', 'K'].includes(rank)) {
      value += 10;
    } else {
      value += parseInt(rank);
    }
  }

  // Adjust for aces
  let aces = cards.filter(c => (c.rank || c) === 'A').length;
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }

  return String(value);
}

// Evaluate threshold condition
function evaluateThreshold(trueCount, threshold, thresholdType) {
  switch (thresholdType) {
    case '>=':
      return trueCount >= threshold;
    case '>':
      return trueCount > threshold;
    case '<=':
      return trueCount <= threshold;
    case '<':
      return trueCount < threshold;
    case '=':
      return trueCount === threshold;
    default:
      return false;
  }
}

// Get deviation action if applicable
export function getDeviationAction(hand, dealerUpcard, trueCount, rules = {}) {
  const deviation = checkDeviation(hand, dealerUpcard, trueCount);
  if (deviation) {
    return {
      action: deviation.deviationAction,
      deviation: deviation,
    };
  }
  return null;
}

// Betting spread recommendations based on true count
export const bettingSpread = [
  { trueCount: -Infinity, maxCount: 0, units: 1, description: 'Minimum bet' },
  { trueCount: 1, maxCount: 1, units: 2, description: '2x bet' },
  { trueCount: 2, maxCount: 2, units: 4, description: '4x bet' },
  { trueCount: 3, maxCount: 3, units: 8, description: '8x bet' },
  { trueCount: 4, maxCount: 4, units: 12, description: '12x bet' },
  { trueCount: 5, maxCount: Infinity, units: 16, description: 'Max bet' },
];

// Get recommended bet units based on true count
export function getRecommendedBet(trueCount) {
  for (let i = bettingSpread.length - 1; i >= 0; i--) {
    if (trueCount >= bettingSpread[i].trueCount) {
      return bettingSpread[i];
    }
  }
  return bettingSpread[0];
}
