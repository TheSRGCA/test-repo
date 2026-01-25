import React from 'react';
import { useGame } from '../contexts/GameContext';
import { getHiLoValue, RANKS } from '../utils/deck';
import { getRecommendedBet } from '../data/deviations';

export default function CountingDisplay({ showDetails = false }) {
  const { state, getTrueCount } = useGame();
  const trueCount = getTrueCount();
  const recommendedBet = getRecommendedBet(trueCount);

  const getCountColor = (count) => {
    if (count > 2) return 'text-green-400';
    if (count < -2) return 'text-red-400';
    return 'text-yellow-400';
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <h3 className="text-white text-lg font-bold mb-4 text-center">Card Counting</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Running Count */}
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <p className="text-gray-400 text-sm mb-1">Running Count</p>
          <p className={`text-3xl font-bold ${getCountColor(state.runningCount)}`}>
            {state.runningCount >= 0 ? '+' : ''}{state.runningCount}
          </p>
        </div>

        {/* True Count */}
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <p className="text-gray-400 text-sm mb-1">True Count</p>
          <p className={`text-3xl font-bold ${getCountColor(trueCount)}`}>
            {trueCount >= 0 ? '+' : ''}{trueCount.toFixed(1)}
          </p>
        </div>
      </div>

      {/* Decks Remaining */}
      <div className="bg-gray-800 rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Decks Remaining</span>
          <span className="text-white font-medium">
            {((state.rules.numDecks * 52 - state.cardsDealt) / 52).toFixed(1)}
          </span>
        </div>
        <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((state.rules.numDecks * 52 - state.cardsDealt) / (state.rules.numDecks * 52)) * 100}%` }}
          />
        </div>
      </div>

      {/* Betting Recommendation */}
      <div className="bg-gray-800 rounded-lg p-3 mb-4">
        <p className="text-gray-400 text-sm mb-2">Recommended Bet</p>
        <div className="flex items-center justify-between">
          <span className="text-white font-bold text-xl">{recommendedBet.units}x</span>
          <span className="text-gray-400 text-sm">{recommendedBet.description}</span>
        </div>
        <div className="mt-2 flex gap-1">
          {[1, 2, 4, 8, 12, 16].map((units) => (
            <div
              key={units}
              className={`flex-1 h-2 rounded ${
                units <= recommendedBet.units ? 'bg-green-500' : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hi-Lo Chart */}
      {showDetails && (
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-gray-400 text-sm mb-3 text-center">Hi-Lo Card Values</p>
          <div className="grid grid-cols-13 gap-1 text-center">
            {RANKS.map((rank) => {
              const value = getHiLoValue(rank);
              return (
                <div key={rank} className="flex flex-col">
                  <span className="text-white text-xs font-medium">{rank}</span>
                  <span className={`text-sm font-bold ${
                    value > 0 ? 'text-green-400' : value < 0 ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {value > 0 ? '+' : ''}{value}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded" />
              <span className="text-gray-300">Low (2-6): +1</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-gray-500 rounded" />
              <span className="text-gray-300">Neutral (7-9): 0</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded" />
              <span className="text-gray-300">High (10-A): -1</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function QuickCount() {
  const { state, getTrueCount } = useGame();
  const trueCount = getTrueCount();

  const getCountColor = (count) => {
    if (count > 2) return 'bg-green-600';
    if (count < -2) return 'bg-red-600';
    return 'bg-yellow-600';
  };

  return (
    <div className="flex gap-2">
      <div className={`${getCountColor(state.runningCount)} px-3 py-1 rounded-full`}>
        <span className="text-white text-sm font-medium">RC: {state.runningCount >= 0 ? '+' : ''}{state.runningCount}</span>
      </div>
      <div className={`${getCountColor(trueCount)} px-3 py-1 rounded-full`}>
        <span className="text-white text-sm font-medium">TC: {trueCount >= 0 ? '+' : ''}{trueCount.toFixed(1)}</span>
      </div>
    </div>
  );
}
