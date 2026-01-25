import React from 'react';
import { useGame } from '../contexts/GameContext';

export default function GameSettings({ onClose }) {
  const { state, dispatch } = useGame();
  const { rules } = state;

  const updateRule = (key, value) => {
    dispatch({ type: 'SET_RULES', payload: { [key]: value } });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-bold">Game Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* Number of Decks */}
        <div className="mb-6">
          <label className="text-white font-medium block mb-2">Number of Decks</label>
          <div className="flex gap-2">
            {[1, 2, 4, 6, 8].map((num) => (
              <button
                key={num}
                onClick={() => {
                  updateRule('numDecks', num);
                  dispatch({ type: 'INITIALIZE_SHOE' });
                }}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  rules.numDecks === num
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Dealer Rules */}
        <div className="mb-6">
          <label className="text-white font-medium block mb-2">Dealer Soft 17</label>
          <div className="flex gap-2">
            <button
              onClick={() => updateRule('dealerHitsSoft17', true)}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                rules.dealerHitsSoft17
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Hits (H17)
            </button>
            <button
              onClick={() => updateRule('dealerHitsSoft17', false)}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                !rules.dealerHitsSoft17
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Stands (S17)
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            H17 is more common and slightly worse for players
          </p>
        </div>

        {/* Toggle Options */}
        <div className="space-y-4 mb-6">
          <ToggleOption
            label="Double After Split (DAS)"
            description="Allow doubling down after splitting a pair"
            enabled={rules.doubleAfterSplit}
            onChange={(v) => updateRule('doubleAfterSplit', v)}
          />

          <ToggleOption
            label="Resplit Aces"
            description="Allow resplitting aces (rare)"
            enabled={rules.resplitAces}
            onChange={(v) => updateRule('resplitAces', v)}
          />

          <ToggleOption
            label="Surrender"
            description="Allow late surrender option"
            enabled={rules.surrender}
            onChange={(v) => updateRule('surrender', v)}
          />
        </div>

        {/* Blackjack Pays */}
        <div className="mb-6">
          <label className="text-white font-medium block mb-2">Blackjack Pays</label>
          <div className="flex gap-2">
            <button
              onClick={() => updateRule('blackjackPays', 1.5)}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                rules.blackjackPays === 1.5
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              3:2
            </button>
            <button
              onClick={() => updateRule('blackjackPays', 1.2)}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                rules.blackjackPays === 1.2
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              6:5
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Always look for 3:2 tables! 6:5 significantly increases house edge.
          </p>
        </div>

        {/* Penetration */}
        <div className="mb-6">
          <label className="text-white font-medium block mb-2">
            Deck Penetration: {(rules.penetration * 100).toFixed(0)}%
          </label>
          <input
            type="range"
            min="50"
            max="90"
            value={rules.penetration * 100}
            onChange={(e) => updateRule('penetration', parseInt(e.target.value) / 100)}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-gray-500 text-sm mt-1">
            How deep into the shoe before shuffling (higher = better for counting)
          </p>
        </div>

        {/* Training Options */}
        <div className="border-t border-gray-700 pt-6 mb-6">
          <h3 className="text-white font-medium mb-4">Training Helpers</h3>
          <div className="space-y-4">
            <ToggleOption
              label="Show Running Count"
              description="Display the Hi-Lo running count"
              enabled={state.showCount}
              onChange={() => dispatch({ type: 'TOGGLE_SHOW_COUNT' })}
            />

            <ToggleOption
              label="Show Basic Strategy"
              description="Display strategy hints during play"
              enabled={state.showStrategy}
              onChange={() => dispatch({ type: 'TOGGLE_SHOW_STRATEGY' })}
            />
          </div>
        </div>

        {/* Reset Stats */}
        <button
          onClick={() => dispatch({ type: 'RESET_STATS' })}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
        >
          Reset Statistics
        </button>
      </div>
    </div>
  );
}

function ToggleOption({ label, description, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <span className="text-white font-medium">{label}</span>
        {description && (
          <p className="text-gray-500 text-sm">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`w-12 h-6 rounded-full transition-colors relative ${
          enabled ? 'bg-blue-600' : 'bg-gray-700'
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
            enabled ? 'left-7' : 'left-1'
          }`}
        />
      </button>
    </div>
  );
}

export function QuickRulesDisplay() {
  const { state } = useGame();
  const { rules } = state;

  return (
    <div className="flex flex-wrap gap-2 text-xs">
      <span className="bg-gray-800 px-2 py-1 rounded text-gray-400">
        {rules.numDecks}D
      </span>
      <span className="bg-gray-800 px-2 py-1 rounded text-gray-400">
        {rules.dealerHitsSoft17 ? 'H17' : 'S17'}
      </span>
      <span className="bg-gray-800 px-2 py-1 rounded text-gray-400">
        {rules.doubleAfterSplit ? 'DAS' : 'No DAS'}
      </span>
      <span className="bg-gray-800 px-2 py-1 rounded text-gray-400">
        {rules.surrender ? 'LS' : 'No LS'}
      </span>
      <span className="bg-gray-800 px-2 py-1 rounded text-gray-400">
        BJ {rules.blackjackPays === 1.5 ? '3:2' : '6:5'}
      </span>
    </div>
  );
}
