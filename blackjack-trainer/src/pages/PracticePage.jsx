import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import { createDeck, shuffleDeck } from '../utils/deck';
import { getBasicStrategy, actionColors } from '../data/basicStrategy';

const modes = [
  { id: 'counting', label: 'Card Counting', description: 'Practice keeping the running count' },
  { id: 'strategy', label: 'Basic Strategy', description: 'Test your strategy knowledge' },
  { id: 'speed', label: 'Speed Counting', description: 'Count as fast as you can' },
];

export default function PracticePage() {
  const [mode, setMode] = useState('counting');

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      {/* Mode selector */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex-1 min-w-[140px] p-3 rounded-lg transition-colors ${
              mode === m.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <span className="font-medium block">{m.label}</span>
            <span className="text-xs opacity-75">{m.description}</span>
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        {mode === 'counting' && <CountingPractice />}
        {mode === 'strategy' && <StrategyPractice />}
        {mode === 'speed' && <SpeedPractice />}
      </div>
    </div>
  );
}

function CountingPractice() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userCount, setUserCount] = useState('');
  const [actualCount, setActualCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [cardsPerRound, setCardsPerRound] = useState(5);

  const startNewRound = useCallback(() => {
    const deck = shuffleDeck(createDeck());
    const roundCards = deck.slice(0, cardsPerRound);
    setCards(roundCards);
    setCurrentIndex(0);
    setUserCount('');
    setActualCount(roundCards.reduce((sum, card) => sum + card.hiLoValue, 0));
    setShowResult(false);
  }, [cardsPerRound]);

  useEffect(() => {
    // Defer initialization to avoid synchronous setState warning
    const id = requestAnimationFrame(() => startNewRound());
    return () => cancelAnimationFrame(id);
  }, [startNewRound]);

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const checkAnswer = () => {
    const correct = parseInt(userCount) === actualCount;
    setScore({
      correct: score.correct + (correct ? 1 : 0),
      total: score.total + 1,
    });
    setShowResult(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-6 text-center">
        <h2 className="text-white text-xl font-bold mb-2">Running Count Practice</h2>
        <p className="text-gray-400 mb-4">Watch the cards and calculate the running count</p>

        <div className="flex justify-center gap-2 mb-4">
          {[3, 5, 7, 10].map((num) => (
            <button
              key={num}
              onClick={() => setCardsPerRound(num)}
              className={`px-3 py-1 rounded ${
                cardsPerRound === num ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}
            >
              {num} cards
            </button>
          ))}
        </div>

        <div className="bg-gray-800 rounded-lg p-4 mb-4 text-sm text-gray-400">
          Score: {score.correct}/{score.total} ({score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%)
        </div>
      </div>

      {/* Cards display */}
      <div className="bg-felt rounded-xl p-6">
        <div className="flex justify-center gap-2 flex-wrap mb-6">
          {cards.slice(0, currentIndex + 1).map((card, idx) => (
            <div key={idx} className="transform transition-all duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
              <Card card={card} />
              {showResult && (
                <div className={`text-center mt-1 font-bold ${
                  card.hiLoValue > 0 ? 'text-green-400' : card.hiLoValue < 0 ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {card.hiLoValue > 0 ? '+' : ''}{card.hiLoValue}
                </div>
              )}
            </div>
          ))}
        </div>

        {currentIndex < cards.length - 1 ? (
          <button
            onClick={nextCard}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            Next Card ({currentIndex + 1}/{cards.length})
          </button>
        ) : !showResult ? (
          <div className="space-y-4">
            <div>
              <label className="text-white block mb-2">What's the running count?</label>
              <input
                type="number"
                value={userCount}
                onChange={(e) => setUserCount(e.target.value)}
                className="w-full p-3 bg-gray-800 text-white rounded-lg text-center text-xl"
                placeholder="Enter count..."
              />
            </div>
            <button
              onClick={checkAnswer}
              disabled={userCount === ''}
              className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg font-medium"
            >
              Check Answer
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`text-center text-xl font-bold ${
              parseInt(userCount) === actualCount ? 'text-green-400' : 'text-red-400'
            }`}>
              {parseInt(userCount) === actualCount ? '✓ Correct!' : `✗ Wrong! The count was ${actualCount}`}
            </div>
            <button
              onClick={startNewRound}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Next Round
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StrategyPractice() {
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCard, setDealerCard] = useState(null);
  const [correctAction, setCorrectAction] = useState(null);
  const [userAction, setUserAction] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [handType, setHandType] = useState('all'); // all, hard, soft, pairs

  const generateHand = useCallback(() => {
    const deck = shuffleDeck(createDeck());
    let hand;

    if (handType === 'hard') {
      // Generate hard hand (no aces or ace counts as 1)
      do {
        hand = [deck[0], deck[1]];
      } while (hand[0].rank === 'A' || hand[1].rank === 'A');
    } else if (handType === 'soft') {
      // Generate soft hand (has ace counting as 11)
      hand = [{ ...deck[0], rank: 'A' }, deck.find(c => !['A', '10', 'J', 'Q', 'K'].includes(c.rank))];
    } else if (handType === 'pairs') {
      // Generate pair
      hand = [deck[0], { ...deck[0], suit: deck[0].suit === 'hearts' ? 'spades' : 'hearts' }];
    } else {
      hand = [deck[0], deck[1]];
    }

    const dealer = deck[2];
    const action = getBasicStrategy(hand, dealer, {});

    setPlayerCards(hand);
    setDealerCard(dealer);
    setCorrectAction(action);
    setUserAction(null);
    setShowResult(false);
  }, [handType]);

  useEffect(() => {
    // Defer initialization to avoid synchronous setState warning
    const id = requestAnimationFrame(() => generateHand());
    return () => cancelAnimationFrame(id);
  }, [generateHand]);

  const handleAction = (action) => {
    setUserAction(action);
    const correct = action === correctAction;
    setScore({
      correct: score.correct + (correct ? 1 : 0),
      total: score.total + 1,
    });
    setShowResult(true);
  };

  const actions = ['HIT', 'STAND', 'DOUBLE', 'SPLIT', 'SURRENDER'];

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-6 text-center">
        <h2 className="text-white text-xl font-bold mb-2">Basic Strategy Practice</h2>
        <p className="text-gray-400 mb-4">What's the correct play?</p>

        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          {['all', 'hard', 'soft', 'pairs'].map((type) => (
            <button
              key={type}
              onClick={() => setHandType(type)}
              className={`px-3 py-1 rounded capitalize ${
                handType === type ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="bg-gray-800 rounded-lg p-4 text-sm text-gray-400">
          Score: {score.correct}/{score.total} ({score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%)
        </div>
      </div>

      <div className="bg-felt rounded-xl p-6">
        {/* Dealer card */}
        <div className="text-center mb-6">
          <p className="text-white text-sm mb-2 opacity-75">Dealer shows</p>
          {dealerCard && <div className="flex justify-center"><Card card={dealerCard} /></div>}
        </div>

        {/* Player hand */}
        <div className="text-center mb-6">
          <p className="text-white text-sm mb-2 opacity-75">Your hand</p>
          <div className="flex justify-center gap-2">
            {playerCards.map((card, idx) => (
              <Card key={idx} card={card} />
            ))}
          </div>
        </div>

        {/* Action buttons */}
        {!showResult ? (
          <div className="grid grid-cols-5 gap-2">
            {actions.map((action) => (
              <button
                key={action}
                onClick={() => handleAction(action)}
                className={`py-3 rounded-lg font-medium text-white ${actionColors[action]?.bg || 'bg-gray-600'} hover:opacity-90`}
              >
                {action}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`text-center text-xl font-bold ${
              userAction === correctAction ? 'text-green-400' : 'text-red-400'
            }`}>
              {userAction === correctAction ? (
                '✓ Correct!'
              ) : (
                <>✗ Wrong! Correct answer: <span className={actionColors[correctAction]?.bg + ' px-2 py-1 rounded'}>{correctAction}</span></>
              )}
            </div>
            <button
              onClick={generateHand}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Next Hand
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SpeedPractice() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [runningCount, setRunningCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [speed, setSpeed] = useState(1000); // ms per card

  const startPractice = () => {
    const deck = shuffleDeck(createDeck());
    setCards(deck);
    setCurrentIndex(0);
    setRunningCount(0);
    setIsRunning(true);
    setStartTime(Date.now());
    setEndTime(null);
  };

  useEffect(() => {
    if (!isRunning || currentIndex >= cards.length) {
      if (isRunning && currentIndex >= cards.length) {
        // Defer end-of-practice state updates
        const id = requestAnimationFrame(() => {
          setIsRunning(false);
          setEndTime(Date.now());
        });
        return () => cancelAnimationFrame(id);
      }
      return;
    }

    const timer = setTimeout(() => {
      setRunningCount((prev) => prev + cards[currentIndex].hiLoValue);
      setCurrentIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isRunning, currentIndex, cards, speed]);

  const elapsed = endTime && startTime ? ((endTime - startTime) / 1000).toFixed(1) : null;

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-6 text-center">
        <h2 className="text-white text-xl font-bold mb-2">Speed Counting</h2>
        <p className="text-gray-400 mb-4">Count through an entire deck as fast as you can</p>

        <div className="flex justify-center gap-2 mb-4">
          {[2000, 1000, 500, 250].map((ms) => (
            <button
              key={ms}
              onClick={() => setSpeed(ms)}
              disabled={isRunning}
              className={`px-3 py-1 rounded ${
                speed === ms ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
              } disabled:opacity-50`}
            >
              {ms >= 1000 ? `${ms / 1000}s` : `${ms}ms`}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-felt rounded-xl p-6 text-center">
        {!isRunning && cards.length === 0 ? (
          <button
            onClick={startPractice}
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-xl"
          >
            Start Practice
          </button>
        ) : isRunning ? (
          <div>
            <div className="mb-4">
              <span className="text-gray-400">Card {currentIndex + 1} / 52</span>
            </div>
            {cards[currentIndex] && (
              <div className="flex justify-center mb-4">
                <Card card={cards[currentIndex]} />
              </div>
            )}
            <div className="text-white text-2xl font-bold">
              Running Count: {runningCount >= 0 ? '+' : ''}{runningCount}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-green-400 text-xl font-bold">Practice Complete!</p>
            <p className="text-white">Time: {elapsed} seconds</p>
            <p className="text-white text-2xl">Final Count: {runningCount >= 0 ? '+' : ''}{runningCount}</p>
            <p className={`text-lg font-bold ${runningCount === 0 ? 'text-green-400' : 'text-red-400'}`}>
              {runningCount === 0 ? '✓ Perfect! Count is balanced' : `✗ Count should be 0 (off by ${Math.abs(runningCount)})`}
            </p>
            <button
              onClick={startPractice}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {isRunning && (
        <div className="bg-gray-900 rounded-xl p-4">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${(currentIndex / 52) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
