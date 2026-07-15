import React, { createContext, useContext, useReducer, useCallback } from 'react';
import {
  createShoe,
  shuffleDeck,
  calculateHandValue,
  isBlackjack,
  isBusted,
  isSoftHand,
  calculateRunningCount,
  calculateTrueCount,
  estimateDecksRemaining,
} from '../utils/deck';
import { getBasicStrategy } from '../data/basicStrategy';
import { getDeviationAction } from '../data/deviations';

const GameContext = createContext(null);

const defaultRules = {
  numDecks: 6,
  dealerHitsSoft17: true,
  doubleAfterSplit: true,
  resplitAces: false,
  surrender: true,
  blackjackPays: 1.5,
  penetration: 0.75, // How deep into shoe before shuffle
};

const initialState = {
  // Game rules
  rules: defaultRules,

  // Deck state
  shoe: [],
  discardPile: [],
  cardsDealt: 0,

  // Hand state
  playerHands: [[]], // Array of hands for splits
  currentHandIndex: 0,
  dealerHand: [],
  dealerHoleCardRevealed: false,

  // Game state
  gamePhase: 'betting', // betting, dealing, playerTurn, dealerTurn, payout, ended
  currentBet: 10,
  playerChips: 1000,
  bets: [10],

  // Counting state
  runningCount: 0,
  cardsSeenThisShoe: [],

  // Training state
  showCount: false,
  showStrategy: false,
  showDeviations: false,
  trainingMode: 'practice', // practice, counting, strategy, deviations

  // Stats
  handsPlayed: 0,
  handsWon: 0,
  handsLost: 0,
  handsPushed: 0,
  correctDecisions: 0,
  totalDecisions: 0,

  // Last action result
  lastAction: null,
  lastCorrectAction: null,
  lastFeedback: null,
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_RULES':
      return { ...state, rules: { ...state.rules, ...action.payload } };

    case 'INITIALIZE_SHOE': {
      const newShoe = shuffleDeck(createShoe(state.rules.numDecks));
      return {
        ...state,
        shoe: newShoe,
        discardPile: [],
        cardsDealt: 0,
        runningCount: 0,
        cardsSeenThisShoe: [],
      };
    }

    case 'SHUFFLE_SHOE': {
      const combinedCards = [...state.shoe, ...state.discardPile];
      const newShoe = shuffleDeck(combinedCards);
      return {
        ...state,
        shoe: newShoe,
        discardPile: [],
        cardsDealt: 0,
        runningCount: 0,
        cardsSeenThisShoe: [],
      };
    }

    case 'DEAL_CARD': {
      if (state.shoe.length === 0) return state;
      const [, ...remainingShoe] = state.shoe;
      return {
        ...state,
        shoe: remainingShoe,
        cardsDealt: state.cardsDealt + 1,
      };
    }

    case 'START_HAND': {
      return {
        ...state,
        playerHands: [[]],
        currentHandIndex: 0,
        dealerHand: [],
        dealerHoleCardRevealed: false,
        gamePhase: 'dealing',
        bets: [state.currentBet],
        lastAction: null,
        lastCorrectAction: null,
        lastFeedback: null,
      };
    }

    case 'DEAL_INITIAL_CARDS': {
      const { playerCards, dealerCards, newShoe, cardsDealt } = action.payload;
      const seenCards = [playerCards[0], playerCards[1], dealerCards[0]];
      const runningCount = calculateRunningCount([...state.cardsSeenThisShoe, ...seenCards]);

      return {
        ...state,
        playerHands: [playerCards],
        dealerHand: dealerCards,
        shoe: newShoe,
        cardsDealt: state.cardsDealt + cardsDealt,
        cardsSeenThisShoe: [...state.cardsSeenThisShoe, ...seenCards],
        runningCount,
        gamePhase: 'playerTurn',
      };
    }

    case 'PLAYER_HIT': {
      const { card, newShoe } = action.payload;
      const updatedHands = [...state.playerHands];
      updatedHands[state.currentHandIndex] = [...updatedHands[state.currentHandIndex], card];
      const newSeenCards = [...state.cardsSeenThisShoe, card];
      const runningCount = calculateRunningCount(newSeenCards);

      return {
        ...state,
        playerHands: updatedHands,
        shoe: newShoe,
        cardsDealt: state.cardsDealt + 1,
        cardsSeenThisShoe: newSeenCards,
        runningCount,
      };
    }

    case 'PLAYER_STAND': {
      const nextHandIndex = state.currentHandIndex + 1;
      if (nextHandIndex < state.playerHands.length) {
        return { ...state, currentHandIndex: nextHandIndex };
      }
      return { ...state, gamePhase: 'dealerTurn' };
    }

    case 'PLAYER_DOUBLE': {
      const { card, newShoe } = action.payload;
      const updatedHands = [...state.playerHands];
      updatedHands[state.currentHandIndex] = [...updatedHands[state.currentHandIndex], card];
      const updatedBets = [...state.bets];
      updatedBets[state.currentHandIndex] *= 2;
      const newSeenCards = [...state.cardsSeenThisShoe, card];
      const runningCount = calculateRunningCount(newSeenCards);

      const nextHandIndex = state.currentHandIndex + 1;
      const nextPhase = nextHandIndex < state.playerHands.length ? 'playerTurn' : 'dealerTurn';

      return {
        ...state,
        playerHands: updatedHands,
        bets: updatedBets,
        shoe: newShoe,
        cardsDealt: state.cardsDealt + 1,
        cardsSeenThisShoe: newSeenCards,
        runningCount,
        currentHandIndex: nextHandIndex < state.playerHands.length ? nextHandIndex : state.currentHandIndex,
        gamePhase: nextPhase,
      };
    }

    case 'PLAYER_SPLIT': {
      const { cards, newShoe } = action.payload;
      const currentHand = state.playerHands[state.currentHandIndex];
      const newHand1 = [currentHand[0], cards[0]];
      const newHand2 = [currentHand[1], cards[1]];

      const updatedHands = [...state.playerHands];
      updatedHands.splice(state.currentHandIndex, 1, newHand1, newHand2);

      const updatedBets = [...state.bets];
      updatedBets.splice(state.currentHandIndex, 0, state.bets[state.currentHandIndex]);

      const newSeenCards = [...state.cardsSeenThisShoe, ...cards];
      const runningCount = calculateRunningCount(newSeenCards);

      return {
        ...state,
        playerHands: updatedHands,
        bets: updatedBets,
        shoe: newShoe,
        cardsDealt: state.cardsDealt + 2,
        cardsSeenThisShoe: newSeenCards,
        runningCount,
      };
    }

    case 'PLAYER_SURRENDER': {
      const updatedBets = [...state.bets];
      updatedBets[state.currentHandIndex] /= 2;

      const nextHandIndex = state.currentHandIndex + 1;
      if (nextHandIndex < state.playerHands.length) {
        return { ...state, bets: updatedBets, currentHandIndex: nextHandIndex };
      }
      return { ...state, bets: updatedBets, gamePhase: 'payout' };
    }

    case 'REVEAL_HOLE_CARD': {
      const holeCard = state.dealerHand[1];
      const newSeenCards = [...state.cardsSeenThisShoe, holeCard];
      const runningCount = calculateRunningCount(newSeenCards);

      return {
        ...state,
        dealerHoleCardRevealed: true,
        cardsSeenThisShoe: newSeenCards,
        runningCount,
      };
    }

    case 'DEALER_HIT': {
      const { card, newShoe } = action.payload;
      const newSeenCards = [...state.cardsSeenThisShoe, card];
      const runningCount = calculateRunningCount(newSeenCards);

      return {
        ...state,
        dealerHand: [...state.dealerHand, card],
        shoe: newShoe,
        cardsDealt: state.cardsDealt + 1,
        cardsSeenThisShoe: newSeenCards,
        runningCount,
      };
    }

    case 'END_DEALER_TURN': {
      return { ...state, gamePhase: 'payout' };
    }

    case 'RESOLVE_PAYOUTS': {
      const { results, totalWinnings } = action.payload;
      return {
        ...state,
        playerChips: state.playerChips + totalWinnings,
        handsPlayed: state.handsPlayed + results.length,
        handsWon: state.handsWon + results.filter(r => r.result === 'win' || r.result === 'blackjack').length,
        handsLost: state.handsLost + results.filter(r => r.result === 'lose').length,
        handsPushed: state.handsPushed + results.filter(r => r.result === 'push').length,
        gamePhase: 'ended',
      };
    }

    case 'SET_BET': {
      return {
        ...state,
        currentBet: action.payload,
        bets: [action.payload],
      };
    }

    case 'RESET_HAND': {
      return {
        ...state,
        playerHands: [[]],
        currentHandIndex: 0,
        dealerHand: [],
        dealerHoleCardRevealed: false,
        gamePhase: 'betting',
        bets: [state.currentBet],
        lastAction: null,
        lastCorrectAction: null,
        lastFeedback: null,
      };
    }

    case 'RECORD_DECISION': {
      const { action: playerAction, correctAction, isCorrect } = action.payload;
      return {
        ...state,
        lastAction: playerAction,
        lastCorrectAction: correctAction,
        lastFeedback: isCorrect ? 'correct' : 'incorrect',
        correctDecisions: state.correctDecisions + (isCorrect ? 1 : 0),
        totalDecisions: state.totalDecisions + 1,
      };
    }

    case 'SET_TRAINING_MODE': {
      return {
        ...state,
        trainingMode: action.payload,
        showCount: action.payload === 'counting' || action.payload === 'deviations',
        showStrategy: action.payload === 'strategy' || action.payload === 'deviations',
        showDeviations: action.payload === 'deviations',
      };
    }

    case 'TOGGLE_SHOW_COUNT': {
      return { ...state, showCount: !state.showCount };
    }

    case 'TOGGLE_SHOW_STRATEGY': {
      return { ...state, showStrategy: !state.showStrategy };
    }

    case 'RESET_STATS': {
      return {
        ...state,
        handsPlayed: 0,
        handsWon: 0,
        handsLost: 0,
        handsPushed: 0,
        correctDecisions: 0,
        totalDecisions: 0,
      };
    }

    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Initialize shoe on first render
  React.useEffect(() => {
    if (state.shoe.length === 0) {
      dispatch({ type: 'INITIALIZE_SHOE' });
    }
  }, [state.shoe.length]);

  // Check if shuffle needed
  const needsShuffle = useCallback(() => {
    const totalCards = state.rules.numDecks * 52;
    const shufflePoint = totalCards * state.rules.penetration;
    return state.cardsDealt >= shufflePoint;
  }, [state.cardsDealt, state.rules.numDecks, state.rules.penetration]);

  // Calculate true count
  const getTrueCount = useCallback(() => {
    const decksRemaining = estimateDecksRemaining(state.cardsDealt, state.rules.numDecks);
    return calculateTrueCount(state.runningCount, decksRemaining);
  }, [state.runningCount, state.cardsDealt, state.rules.numDecks]);

  // Get correct action for current hand
  const getCorrectAction = useCallback(() => {
    const currentHand = state.playerHands[state.currentHandIndex];
    const dealerUpcard = state.dealerHand[0];

    if (!currentHand || currentHand.length === 0 || !dealerUpcard) return null;

    const trueCount = getTrueCount();

    // Check for deviation first
    if (state.showDeviations) {
      const deviation = getDeviationAction(currentHand, dealerUpcard, trueCount);
      if (deviation) {
        return { action: deviation.action, isDeviation: true, deviation: deviation.deviation };
      }
    }

    // Get basic strategy
    const basicAction = getBasicStrategy(currentHand, dealerUpcard, state.rules);
    return { action: basicAction, isDeviation: false };
  }, [state.playerHands, state.currentHandIndex, state.dealerHand, state.rules, state.showDeviations, getTrueCount]);

  // Deal initial cards
  const dealInitialCards = useCallback(() => {
    if (state.shoe.length < 4) {
      dispatch({ type: 'SHUFFLE_SHOE' });
      return;
    }

    const playerCards = [state.shoe[0], state.shoe[2]];
    const dealerCards = [state.shoe[1], state.shoe[3]];
    const newShoe = state.shoe.slice(4);

    dispatch({
      type: 'DEAL_INITIAL_CARDS',
      payload: { playerCards, dealerCards, newShoe, cardsDealt: 4 },
    });
  }, [state.shoe]);

  // Player actions
  const playerHit = useCallback(() => {
    if (state.shoe.length === 0) return;
    const [card, ...newShoe] = state.shoe;
    dispatch({ type: 'PLAYER_HIT', payload: { card, newShoe } });
  }, [state.shoe]);

  const playerStand = useCallback(() => {
    dispatch({ type: 'PLAYER_STAND' });
  }, []);

  const playerDouble = useCallback(() => {
    if (state.shoe.length === 0) return;
    const [card, ...newShoe] = state.shoe;
    dispatch({ type: 'PLAYER_DOUBLE', payload: { card, newShoe } });
  }, [state.shoe]);

  const playerSplit = useCallback(() => {
    if (state.shoe.length < 2) return;
    const cards = [state.shoe[0], state.shoe[1]];
    const newShoe = state.shoe.slice(2);
    dispatch({ type: 'PLAYER_SPLIT', payload: { cards, newShoe } });
  }, [state.shoe]);

  const playerSurrender = useCallback(() => {
    dispatch({ type: 'PLAYER_SURRENDER' });
  }, []);

  // Dealer plays
  const dealerPlay = useCallback(async () => {
    dispatch({ type: 'REVEAL_HOLE_CARD' });

    let currentDealerHand = [...state.dealerHand];
    let currentShoe = [...state.shoe];
    let dealerValue = calculateHandValue(currentDealerHand);
    let isSoft = isSoftHand(currentDealerHand);

    // Dealer hits on soft 17 if rule enabled
    while (dealerValue < 17 || (dealerValue === 17 && isSoft && state.rules.dealerHitsSoft17)) {
      if (currentShoe.length === 0) break;

      const [card, ...newShoe] = currentShoe;
      currentShoe = newShoe;
      currentDealerHand = [...currentDealerHand, card];

      dispatch({ type: 'DEALER_HIT', payload: { card, newShoe } });

      dealerValue = calculateHandValue(currentDealerHand);
      isSoft = isSoftHand(currentDealerHand);

      // Small delay for animation
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    dispatch({ type: 'END_DEALER_TURN' });
  }, [state.dealerHand, state.shoe, state.rules.dealerHitsSoft17]);

  // Resolve payouts
  const resolvePayouts = useCallback(() => {
    const dealerValue = calculateHandValue(state.dealerHand);
    const dealerBusted = isBusted(state.dealerHand);
    const dealerHasBlackjack = isBlackjack(state.dealerHand);

    const results = state.playerHands.map((hand, index) => {
      const playerValue = calculateHandValue(hand);
      const playerBusted = isBusted(hand);
      const playerHasBlackjack = isBlackjack(hand);
      const bet = state.bets[index];

      let result;
      let payout = 0;

      if (playerBusted) {
        result = 'lose';
        payout = -bet;
      } else if (playerHasBlackjack && !dealerHasBlackjack) {
        result = 'blackjack';
        payout = bet * state.rules.blackjackPays;
      } else if (dealerHasBlackjack && !playerHasBlackjack) {
        result = 'lose';
        payout = -bet;
      } else if (dealerBusted) {
        result = 'win';
        payout = bet;
      } else if (playerValue > dealerValue) {
        result = 'win';
        payout = bet;
      } else if (playerValue < dealerValue) {
        result = 'lose';
        payout = -bet;
      } else {
        result = 'push';
        payout = 0;
      }

      return { hand, result, payout, bet };
    });

    const totalWinnings = results.reduce((sum, r) => sum + r.payout, 0);

    dispatch({
      type: 'RESOLVE_PAYOUTS',
      payload: { results, totalWinnings },
    });

    return results;
  }, [state.playerHands, state.dealerHand, state.bets, state.rules.blackjackPays]);

  const value = {
    state,
    dispatch,
    needsShuffle,
    getTrueCount,
    getCorrectAction,
    dealInitialCards,
    playerHit,
    playerStand,
    playerDouble,
    playerSplit,
    playerSurrender,
    dealerPlay,
    resolvePayouts,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
