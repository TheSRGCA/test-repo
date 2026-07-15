import React, { useState, useEffect } from 'react';

const signals = {
  HIT: {
    name: 'Hit',
    icon: '👆',
    description: 'Tap or scratch the table with your finger',
    animation: 'signal-hit',
    gesture: (
      <div className="relative w-24 h-24">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-20 bg-gradient-to-b from-amber-200 to-amber-300 rounded-t-full relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-200 rounded-full" />
            <div className="absolute bottom-2 w-full flex justify-center">
              <span className="text-2xl">☝️</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-green-800 rounded" />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <span className="text-xs text-white bg-black bg-opacity-50 px-1 rounded">tap tap</span>
        </div>
      </div>
    ),
  },
  STAND: {
    name: 'Stand',
    icon: '✋',
    description: 'Wave your hand horizontally over your cards',
    animation: 'signal-stand',
    gesture: (
      <div className="relative w-24 h-24">
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="text-4xl animate-pulse">🤚</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-green-800 rounded" />
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
          <span className="text-xs text-white bg-black bg-opacity-50 px-1 rounded">wave</span>
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="w-16 h-0.5 bg-yellow-400 animate-pulse" />
        </div>
      </div>
    ),
  },
  DOUBLE: {
    name: 'Double Down',
    icon: '✌️',
    description: 'Place an additional bet beside your original bet and point with one finger',
    animation: '',
    gesture: (
      <div className="relative w-24 h-24">
        <div className="absolute bottom-2 left-4">
          <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-dashed border-white flex items-center justify-center">
            <span className="text-white text-xs">$</span>
          </div>
        </div>
        <div className="absolute bottom-2 left-12">
          <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-dashed border-white flex items-center justify-center animate-pulse">
            <span className="text-white text-xs">$</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-green-800 rounded" />
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-2xl">☝️</div>
      </div>
    ),
  },
  SPLIT: {
    name: 'Split',
    icon: '✌️',
    description: 'Place an additional bet and make a "V" sign with two fingers',
    animation: '',
    gesture: (
      <div className="relative w-24 h-24">
        <div className="absolute bottom-8 left-2">
          <div className="w-8 h-12 bg-white rounded border shadow flex items-center justify-center">
            <span className="text-red-600">A♥</span>
          </div>
        </div>
        <div className="absolute bottom-8 right-2">
          <div className="w-8 h-12 bg-white rounded border shadow flex items-center justify-center">
            <span className="text-black">A♠</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-green-800 rounded" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-2xl">✌️</div>
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <span className="text-yellow-400 text-lg">⟷</span>
        </div>
      </div>
    ),
  },
  SURRENDER: {
    name: 'Surrender',
    icon: '🏳️',
    description: 'Draw a horizontal line behind your bet with your finger',
    animation: '',
    gesture: (
      <div className="relative w-24 h-24">
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-dashed border-white flex items-center justify-center">
            <span className="text-white text-xs">$</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-green-800 rounded" />
        <div className="absolute bottom-8 left-2 right-2">
          <div className="h-0.5 bg-white animate-pulse" />
          <span className="text-xs text-white bg-black bg-opacity-50 px-1 rounded absolute -top-4 left-1/2 transform -translate-x-1/2">draw line</span>
        </div>
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-2xl">☝️</div>
      </div>
    ),
  },
};

export default function HandSignals({ highlightAction = null }) {
  const [activeSignal, setActiveSignal] = useState(null);

  useEffect(() => {
    if (!highlightAction || !signals[highlightAction]) {
      return;
    }

    // Use a microtask to avoid synchronous setState warning
    const id = requestAnimationFrame(() => {
      setActiveSignal(highlightAction);
    });

    const timer = setTimeout(() => setActiveSignal(null), 2000);

    return () => {
      cancelAnimationFrame(id);
      clearTimeout(timer);
    };
  }, [highlightAction]);

  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <h3 className="text-white text-lg font-bold mb-4 text-center">Casino Hand Signals</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(signals).map(([key, signal]) => (
          <div
            key={key}
            className={`bg-gray-800 rounded-lg p-3 transition-all duration-300 ${
              activeSignal === key ? 'ring-2 ring-yellow-400 scale-105' : ''
            }`}
          >
            <div className="flex flex-col items-center">
              {signal.gesture}
              <h4 className="text-white font-bold mt-2">{signal.name}</h4>
              <p className="text-gray-400 text-xs text-center mt-1">{signal.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HandSignalButton({ action, onClick, disabled = false, isCorrect = null }) {
  const signal = signals[action];
  if (!signal) return null;

  const getButtonStyle = () => {
    if (isCorrect === true) return 'ring-2 ring-green-500 bg-green-900';
    if (isCorrect === false) return 'ring-2 ring-red-500 bg-red-900';
    return 'bg-gray-800 hover:bg-gray-700';
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${getButtonStyle()} rounded-lg p-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center min-w-[80px]`}
    >
      <span className="text-2xl mb-1">{signal.icon}</span>
      <span className="text-white text-sm font-medium">{signal.name}</span>
    </button>
  );
}
