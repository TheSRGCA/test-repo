import React, { useState } from 'react';
import { illustrious18, fab4 } from '../data/deviations';

export default function DeviationsChart({ currentTrueCount = 0 }) {
  const [activeTab, setActiveTab] = useState('illustrious18');

  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <h3 className="text-white text-lg font-bold mb-4 text-center">Strategy Deviations</h3>

      {/* Tab buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('illustrious18')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            activeTab === 'illustrious18'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Illustrious 18
        </button>
        <button
          onClick={() => setActiveTab('fab4')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            activeTab === 'fab4'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Fab 4 (Surrender)
        </button>
      </div>

      {/* Current True Count indicator */}
      <div className="bg-gray-800 rounded-lg p-3 mb-4 text-center">
        <span className="text-gray-400 text-sm">Current True Count: </span>
        <span className={`font-bold text-lg ${
          currentTrueCount > 0 ? 'text-green-400' : currentTrueCount < 0 ? 'text-red-400' : 'text-yellow-400'
        }`}>
          {currentTrueCount >= 0 ? '+' : ''}{currentTrueCount.toFixed(1)}
        </span>
      </div>

      {/* Deviations table */}
      <div className="overflow-x-auto">
        {activeTab === 'illustrious18' ? (
          <DeviationsTable deviations={illustrious18} currentTC={currentTrueCount} />
        ) : (
          <DeviationsTable deviations={fab4} currentTC={currentTrueCount} isSurrender />
        )}
      </div>

      {/* Info box */}
      <div className="mt-4 bg-gray-800 rounded-lg p-3">
        <h4 className="text-white font-medium mb-2">How to Use Deviations</h4>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>1. Calculate the True Count (Running Count ÷ Decks Remaining)</li>
          <li>2. Check if the True Count meets the threshold</li>
          <li>3. If it does, use the Deviation Action instead of Basic Strategy</li>
          <li>4. Green highlight = deviation applies at current count</li>
        </ul>
      </div>
    </div>
  );
}

function DeviationsTable({ deviations, currentTC }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-gray-400 border-b border-gray-700">
          <th className="p-2 text-left">#</th>
          <th className="p-2 text-left">Hand</th>
          <th className="p-2 text-left">vs</th>
          <th className="p-2 text-left">Basic</th>
          <th className="p-2 text-left">TC</th>
          <th className="p-2 text-left">Deviation</th>
        </tr>
      </thead>
      <tbody>
        {deviations.map((dev) => {
          const applies = evaluateThreshold(currentTC, dev.threshold, dev.thresholdType);

          return (
            <tr
              key={dev.id}
              className={`border-b border-gray-800 transition-colors ${
                applies ? 'bg-green-900 bg-opacity-30' : ''
              }`}
            >
              <td className="p-2 text-gray-500">{dev.id}</td>
              <td className="p-2 text-white font-medium">{dev.hand}</td>
              <td className="p-2 text-gray-400">{dev.dealerUpcard}</td>
              <td className="p-2">
                <ActionBadge action={dev.basicAction} />
              </td>
              <td className="p-2">
                <span className={`font-mono ${applies ? 'text-green-400' : 'text-gray-400'}`}>
                  {dev.thresholdType}{dev.threshold >= 0 ? '+' : ''}{dev.threshold}
                </span>
              </td>
              <td className="p-2">
                <ActionBadge action={dev.deviationAction} highlight={applies} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function ActionBadge({ action, highlight = false }) {
  const colors = {
    HIT: 'bg-green-600',
    STAND: 'bg-red-600',
    DOUBLE: 'bg-yellow-600',
    SPLIT: 'bg-blue-600',
    SURRENDER: 'bg-purple-600',
    YES: 'bg-green-600',
    NO: 'bg-red-600',
  };

  return (
    <span className={`px-2 py-1 rounded text-white text-xs font-medium ${
      colors[action] || 'bg-gray-600'
    } ${highlight ? 'ring-2 ring-yellow-400' : ''}`}>
      {action}
    </span>
  );
}

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

export function DeviationAlert({ deviation, trueCount }) {
  if (!deviation) return null;

  return (
    <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-3 animate-pulse">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-yellow-400 text-xl">⚠️</span>
        <span className="text-yellow-400 font-bold">Deviation Alert!</span>
      </div>
      <p className="text-white text-sm">{deviation.description}</p>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-gray-400 text-sm">TC: {trueCount >= 0 ? '+' : ''}{trueCount.toFixed(1)}</span>
        <span className="text-gray-400">→</span>
        <ActionBadge action={deviation.deviationAction} highlight />
      </div>
    </div>
  );
}
