import React from 'react';
import { useGame } from '../contexts/GameContext';

export default function Stats() {
  const { state } = useGame();

  const winRate = state.handsPlayed > 0
    ? ((state.handsWon / state.handsPlayed) * 100).toFixed(1)
    : 0;

  const accuracy = state.totalDecisions > 0
    ? ((state.correctDecisions / state.totalDecisions) * 100).toFixed(1)
    : 0;

  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <h3 className="text-white text-lg font-bold mb-4 text-center">Statistics</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <StatCard
          label="Hands Played"
          value={state.handsPlayed}
          icon="🎴"
        />
        <StatCard
          label="Win Rate"
          value={`${winRate}%`}
          icon="📈"
          color={parseFloat(winRate) >= 45 ? 'text-green-400' : 'text-red-400'}
        />
        <StatCard
          label="Chips"
          value={`$${state.playerChips}`}
          icon="💰"
          color={state.playerChips >= 1000 ? 'text-green-400' : 'text-red-400'}
        />
        <StatCard
          label="Strategy Accuracy"
          value={`${accuracy}%`}
          icon="🎯"
          color={parseFloat(accuracy) >= 90 ? 'text-green-400' : parseFloat(accuracy) >= 70 ? 'text-yellow-400' : 'text-red-400'}
        />
      </div>

      {/* Win/Loss/Push breakdown */}
      <div className="bg-gray-800 rounded-lg p-3">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Results Breakdown</span>
          <span className="text-white">{state.handsPlayed} total</span>
        </div>
        <div className="flex h-4 rounded-full overflow-hidden bg-gray-700">
          {state.handsPlayed > 0 && (
            <>
              <div
                className="bg-green-500 transition-all duration-300"
                style={{ width: `${(state.handsWon / state.handsPlayed) * 100}%` }}
              />
              <div
                className="bg-yellow-500 transition-all duration-300"
                style={{ width: `${(state.handsPushed / state.handsPlayed) * 100}%` }}
              />
              <div
                className="bg-red-500 transition-all duration-300"
                style={{ width: `${(state.handsLost / state.handsPlayed) * 100}%` }}
              />
            </>
          )}
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <span className="text-green-400">Won: {state.handsWon}</span>
          <span className="text-yellow-400">Push: {state.handsPushed}</span>
          <span className="text-red-400">Lost: {state.handsLost}</span>
        </div>
      </div>

      {/* Decision accuracy breakdown */}
      {state.totalDecisions > 0 && (
        <div className="bg-gray-800 rounded-lg p-3 mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Decision Accuracy</span>
            <span className="text-white">{state.totalDecisions} decisions</span>
          </div>
          <div className="flex h-4 rounded-full overflow-hidden bg-gray-700">
            <div
              className="bg-green-500 transition-all duration-300"
              style={{ width: `${(state.correctDecisions / state.totalDecisions) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <span className="text-green-400">Correct: {state.correctDecisions}</span>
            <span className="text-red-400">Incorrect: {state.totalDecisions - state.correctDecisions}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color = 'text-white' }) {
  return (
    <div className="bg-gray-800 rounded-lg p-3 text-center">
      <span className="text-2xl mb-1 block">{icon}</span>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      <p className="text-gray-400 text-xs">{label}</p>
    </div>
  );
}

export function QuickStats() {
  const { state } = useGame();

  return (
    <div className="flex gap-4 text-sm">
      <span className="text-gray-400">
        Chips: <span className={state.playerChips >= 1000 ? 'text-green-400' : 'text-red-400'}>${state.playerChips}</span>
      </span>
      <span className="text-gray-400">
        Hands: <span className="text-white">{state.handsPlayed}</span>
      </span>
      {state.totalDecisions > 0 && (
        <span className="text-gray-400">
          Accuracy: <span className="text-white">{((state.correctDecisions / state.totalDecisions) * 100).toFixed(0)}%</span>
        </span>
      )}
    </div>
  );
}
