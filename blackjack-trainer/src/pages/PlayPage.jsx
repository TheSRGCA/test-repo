import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../contexts/GameContext';
import Hand from '../components/Hand';
import { HandSignalButton } from '../components/HandSignals';
import { QuickCount } from '../components/CountingDisplay';
import { MiniStrategyHint } from '../components/StrategyChart';
import { DeviationAlert } from '../components/DeviationsChart';
import { QuickRulesDisplay } from '../components/GameSettings';
import { QuickStats } from '../components/Stats';
import { calculateHandValue, isBusted, isBlackjack, canSplit } from '../utils/deck';
import { checkDeviation } from '../data/deviations';

export default function PlayPage() {
  const {
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
  } = useGame();

  const [results, setResults] = useState(null);
  const [actionFeedback, setActionFeedback] = useState(null);
  const [activeDeviation, setActiveDeviation] = useState(null);

  const currentHand = state.playerHands[state.currentHandIndex] || [];
  const handValue = calculateHandValue(currentHand);
  const busted = isBusted(currentHand);
  const hasBlackjack = currentHand.length === 2 && isBlackjack(currentHand);
  const canSplitHand = canSplit(currentHand) && state.playerHands.length < 4;
  const canDoubleDown = currentHand.length === 2 && state.playerChips >= state.bets[state.currentHandIndex];
  const canSurrenderHand = currentHand.length === 2 && state.rules.surrender;

  // Check for deviation
  useEffect(() => {
    if (state.gamePhase === 'playerTurn' && state.showDeviations && currentHand.length >= 2) {
      const trueCount = getTrueCount();
      const dealerUpcard = state.dealerHand[0];
      const deviation = checkDeviation(currentHand, dealerUpcard, trueCount);
      setActiveDeviation(deviation);
    } else {
      setActiveDeviation(null);
    }
  }, [state.gamePhase, state.showDeviations, currentHand, state.dealerHand, getTrueCount]);

  // Handle busts and blackjacks automatically
  useEffect(() => {
    if (state.gamePhase === 'playerTurn') {
      if (busted) {
        const nextHandIndex = state.currentHandIndex + 1;
        if (nextHandIndex < state.playerHands.length) {
          dispatch({ type: 'PLAYER_STAND' });
        } else {
          dispatch({ type: 'END_DEALER_TURN' });
        }
      } else if (hasBlackjack && state.playerHands.length === 1) {
        dispatch({ type: 'PLAYER_STAND' });
      }
    }
  }, [busted, hasBlackjack, state.gamePhase, state.currentHandIndex, state.playerHands.length, dispatch]);

  // Handle dealer turn
  useEffect(() => {
    if (state.gamePhase === 'dealerTurn') {
      // Check if all player hands busted
      const allBusted = state.playerHands.every(hand => isBusted(hand));
      if (allBusted) {
        dispatch({ type: 'REVEAL_HOLE_CARD' });
        dispatch({ type: 'END_DEALER_TURN' });
      } else {
        dealerPlay();
      }
    }
  }, [state.gamePhase, state.playerHands, dealerPlay, dispatch]);

  // Handle payout
  useEffect(() => {
    if (state.gamePhase === 'payout') {
      const payoutResults = resolvePayouts();
      setResults(payoutResults);
    }
  }, [state.gamePhase, resolvePayouts]);

  // Record decision and give feedback
  const recordAction = useCallback((action) => {
    const correctActionData = getCorrectAction();
    if (correctActionData) {
      const isCorrect = action === correctActionData.action;
      dispatch({
        type: 'RECORD_DECISION',
        payload: { action, correctAction: correctActionData.action, isCorrect },
      });
      setActionFeedback({
        action,
        correctAction: correctActionData.action,
        isCorrect,
        isDeviation: correctActionData.isDeviation,
      });

      // Clear feedback after delay
      setTimeout(() => setActionFeedback(null), 1500);
    }
  }, [getCorrectAction, dispatch]);

  // Action handlers
  const handleHit = () => {
    recordAction('HIT');
    playerHit();
  };

  const handleStand = () => {
    recordAction('STAND');
    playerStand();
  };

  const handleDouble = () => {
    if (!canDoubleDown) return;
    recordAction('DOUBLE');
    playerDouble();
  };

  const handleSplit = () => {
    if (!canSplitHand) return;
    recordAction('SPLIT');
    playerSplit();
  };

  const handleSurrender = () => {
    if (!canSurrenderHand) return;
    recordAction('SURRENDER');
    playerSurrender();
  };

  // Start new hand
  const startNewHand = () => {
    setResults(null);
    setActionFeedback(null);
    setActiveDeviation(null);

    if (needsShuffle()) {
      dispatch({ type: 'SHUFFLE_SHOE' });
    }

    dispatch({ type: 'START_HAND' });
    setTimeout(() => dealInitialCards(), 300);
  };

  // Bet controls
  const adjustBet = (amount) => {
    const newBet = Math.max(5, Math.min(500, state.currentBet + amount));
    dispatch({ type: 'SET_BET', payload: newBet });
  };

  return (
    <div className="min-h-screen bg-felt flex flex-col">
      {/* Top bar */}
      <div className="bg-felt-dark p-3 flex flex-wrap items-center justify-between gap-2">
        <QuickRulesDisplay />
        {state.showCount && <QuickCount />}
        <QuickStats />
      </div>

      {/* Main game area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Shuffle indicator */}
        {needsShuffle() && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white px-4 py-2 rounded-full text-sm">
            Shuffle coming soon...
          </div>
        )}

        {/* Dealer hand */}
        <div className="mb-8">
          <p className="text-white text-sm mb-2 text-center opacity-75">Dealer</p>
          {state.dealerHand.length > 0 && (
            <Hand
              cards={state.dealerHand}
              isDealer
              hideHoleCard={!state.dealerHoleCardRevealed}
            />
          )}
        </div>

        {/* Strategy hint */}
        {state.showStrategy && state.gamePhase === 'playerTurn' && !busted && (
          <div className="mb-4">
            {getCorrectAction() && (
              <MiniStrategyHint
                action={getCorrectAction().action}
                isDeviation={getCorrectAction().isDeviation}
              />
            )}
          </div>
        )}

        {/* Deviation alert */}
        {activeDeviation && state.gamePhase === 'playerTurn' && (
          <div className="mb-4 max-w-sm">
            <DeviationAlert deviation={activeDeviation} trueCount={getTrueCount()} />
          </div>
        )}

        {/* Action feedback */}
        {actionFeedback && (
          <div className={`mb-4 px-4 py-2 rounded-lg ${
            actionFeedback.isCorrect ? 'bg-green-600' : 'bg-red-600'
          } animate-slide-up`}>
            <span className="text-white font-bold">
              {actionFeedback.isCorrect ? '✓ Correct!' : `✗ Should ${actionFeedback.correctAction}`}
            </span>
          </div>
        )}

        {/* Player hands */}
        <div className="flex gap-8 flex-wrap justify-center">
          {state.playerHands.map((hand, index) => (
            <div key={index} className="relative">
              <p className="text-white text-sm mb-2 text-center opacity-75">
                {state.playerHands.length > 1 ? `Hand ${index + 1}` : 'Your Hand'}
              </p>
              <Hand
                cards={hand}
                isActive={state.gamePhase === 'playerTurn' && index === state.currentHandIndex}
                bet={state.bets[index]}
                result={results?.[index]?.result}
              />
            </div>
          ))}
        </div>

        {/* Results display */}
        {results && (
          <div className="mt-6 text-center">
            <p className="text-white text-xl font-bold mb-2">
              {results.reduce((sum, r) => sum + r.payout, 0) > 0 ? (
                <span className="text-green-400">Won ${results.reduce((sum, r) => sum + r.payout, 0)}</span>
              ) : results.reduce((sum, r) => sum + r.payout, 0) < 0 ? (
                <span className="text-red-400">Lost ${Math.abs(results.reduce((sum, r) => sum + r.payout, 0))}</span>
              ) : (
                <span className="text-yellow-400">Push</span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="bg-felt-dark p-4">
        {state.gamePhase === 'betting' || state.gamePhase === 'ended' ? (
          <div className="flex flex-col items-center gap-4">
            {/* Bet controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => adjustBet(-5)}
                className="w-10 h-10 rounded-full bg-gray-700 text-white font-bold hover:bg-gray-600"
              >
                -
              </button>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-4 border-dashed border-white flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">${state.currentBet}</span>
              </div>
              <button
                onClick={() => adjustBet(5)}
                className="w-10 h-10 rounded-full bg-gray-700 text-white font-bold hover:bg-gray-600"
              >
                +
              </button>
            </div>

            {/* Deal button */}
            <button
              onClick={startNewHand}
              disabled={state.playerChips < state.currentBet}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold text-lg rounded-xl transition-colors"
            >
              Deal
            </button>
          </div>
        ) : state.gamePhase === 'playerTurn' && !busted ? (
          <div className="flex flex-wrap justify-center gap-3">
            <HandSignalButton
              action="HIT"
              onClick={handleHit}
              isCorrect={actionFeedback?.action === 'HIT' ? actionFeedback.isCorrect : null}
            />
            <HandSignalButton
              action="STAND"
              onClick={handleStand}
              isCorrect={actionFeedback?.action === 'STAND' ? actionFeedback.isCorrect : null}
            />
            <HandSignalButton
              action="DOUBLE"
              onClick={handleDouble}
              disabled={!canDoubleDown}
              isCorrect={actionFeedback?.action === 'DOUBLE' ? actionFeedback.isCorrect : null}
            />
            <HandSignalButton
              action="SPLIT"
              onClick={handleSplit}
              disabled={!canSplitHand}
              isCorrect={actionFeedback?.action === 'SPLIT' ? actionFeedback.isCorrect : null}
            />
            {state.rules.surrender && (
              <HandSignalButton
                action="SURRENDER"
                onClick={handleSurrender}
                disabled={!canSurrenderHand}
                isCorrect={actionFeedback?.action === 'SURRENDER' ? actionFeedback.isCorrect : null}
              />
            )}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            {state.gamePhase === 'dealing' && 'Dealing...'}
            {state.gamePhase === 'dealerTurn' && 'Dealer playing...'}
            {state.gamePhase === 'payout' && 'Calculating...'}
          </div>
        )}
      </div>
    </div>
  );
}
