import React, { useState } from 'react';
import { hardTotals, softTotals, pairSplitting, actionColors, dealerCards } from '../data/basicStrategy';

export default function StrategyChart({ highlightCell = null }) {
  const [activeChart, setActiveChart] = useState('hard');

  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <h3 className="text-white text-lg font-bold mb-4 text-center">Basic Strategy Charts</h3>

      {/* Chart tabs */}
      <div className="flex gap-2 mb-4">
        {['hard', 'soft', 'pairs'].map((chart) => (
          <button
            key={chart}
            onClick={() => setActiveChart(chart)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeChart === chart
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {chart === 'hard' ? 'Hard Totals' : chart === 'soft' ? 'Soft Totals' : 'Pairs'}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {Object.entries(actionColors).slice(0, 6).map(([key, { bg, text }]) => (
          <div key={key} className="flex items-center gap-1">
            <span className={`w-4 h-4 ${bg} rounded`} />
            <span className="text-gray-400 text-xs">{text}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="overflow-x-auto">
        {activeChart === 'hard' && <HardTotalsChart highlightCell={highlightCell} />}
        {activeChart === 'soft' && <SoftTotalsChart highlightCell={highlightCell} />}
        {activeChart === 'pairs' && <PairSplittingChart highlightCell={highlightCell} />}
      </div>
    </div>
  );
}

function HardTotalsChart({ highlightCell }) {
  const rows = Object.entries(hardTotals).reverse();

  return (
    <table className="w-full text-center text-sm">
      <thead>
        <tr>
          <th className="p-1 text-gray-400"></th>
          {dealerCards.map((card) => (
            <th key={card} className="p-1 text-gray-400 font-medium">{card}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(([total, actions]) => (
          <tr key={total}>
            <td className="p-1 text-white font-medium">{total}</td>
            {actions.map((action, idx) => {
              const isHighlighted = highlightCell?.type === 'hard' &&
                highlightCell?.row === total &&
                highlightCell?.col === dealerCards[idx];

              return (
                <td key={idx} className="p-1">
                  <span className={`strategy-cell inline-block w-8 h-8 leading-8 rounded font-bold text-white ${
                    actionColors[action]?.bg || 'bg-gray-600'
                  } ${isHighlighted ? 'ring-2 ring-yellow-400 scale-110' : ''} transition-transform cursor-pointer`}>
                    {action}
                  </span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SoftTotalsChart({ highlightCell }) {
  const rows = Object.entries(softTotals).reverse();
  const softLabels = {
    13: 'A,2',
    14: 'A,3',
    15: 'A,4',
    16: 'A,5',
    17: 'A,6',
    18: 'A,7',
    19: 'A,8',
    20: 'A,9',
  };

  return (
    <table className="w-full text-center text-sm">
      <thead>
        <tr>
          <th className="p-1 text-gray-400"></th>
          {dealerCards.map((card) => (
            <th key={card} className="p-1 text-gray-400 font-medium">{card}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(([total, actions]) => (
          <tr key={total}>
            <td className="p-1 text-white font-medium">{softLabels[total]}</td>
            {actions.map((action, idx) => {
              const isHighlighted = highlightCell?.type === 'soft' &&
                highlightCell?.row === total &&
                highlightCell?.col === dealerCards[idx];

              return (
                <td key={idx} className="p-1">
                  <span className={`strategy-cell inline-block w-8 h-8 leading-8 rounded font-bold text-white ${
                    actionColors[action]?.bg || 'bg-gray-600'
                  } ${isHighlighted ? 'ring-2 ring-yellow-400 scale-110' : ''} transition-transform cursor-pointer`}>
                    {action}
                  </span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PairSplittingChart({ highlightCell }) {
  const rows = Object.entries(pairSplitting);

  return (
    <table className="w-full text-center text-sm">
      <thead>
        <tr>
          <th className="p-1 text-gray-400"></th>
          {dealerCards.map((card) => (
            <th key={card} className="p-1 text-gray-400 font-medium">{card}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(([pair, actions]) => (
          <tr key={pair}>
            <td className="p-1 text-white font-medium">{pair}</td>
            {actions.map((action, idx) => {
              const isHighlighted = highlightCell?.type === 'pairs' &&
                highlightCell?.row === pair &&
                highlightCell?.col === dealerCards[idx];

              return (
                <td key={idx} className="p-1">
                  <span className={`strategy-cell inline-block w-8 h-8 leading-8 rounded font-bold text-white ${
                    actionColors[action]?.bg || 'bg-gray-600'
                  } ${isHighlighted ? 'ring-2 ring-yellow-400 scale-110' : ''} transition-transform cursor-pointer`}>
                    {action}
                  </span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function MiniStrategyHint({ action, isDeviation = false }) {
  if (!action) return null;

  const color = actionColors[action]?.bg || 'bg-gray-600';
  const text = actionColors[action]?.text || action;

  return (
    <div className={`${color} px-3 py-1 rounded-full inline-flex items-center gap-2`}>
      <span className="text-white font-bold">{text}</span>
      {isDeviation && (
        <span className="text-yellow-300 text-xs font-medium">(Deviation)</span>
      )}
    </div>
  );
}
