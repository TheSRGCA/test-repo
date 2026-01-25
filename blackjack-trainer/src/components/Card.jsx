import React from 'react';
import { SUIT_SYMBOLS, SUIT_COLORS } from '../utils/deck';

export default function Card({ card, hidden = false, small = false }) {
  const sizeClasses = small
    ? 'w-12 h-16 text-sm'
    : 'w-16 h-24 sm:w-20 sm:h-28 text-base sm:text-lg';

  if (hidden) {
    return (
      <div className={`${sizeClasses} rounded-lg bg-gradient-to-br from-blue-800 to-blue-900 border-2 border-blue-600 shadow-lg flex items-center justify-center`}>
        <div className="w-3/4 h-3/4 rounded border-2 border-blue-500 bg-blue-700 flex items-center justify-center">
          <span className="text-blue-400 text-2xl">?</span>
        </div>
      </div>
    );
  }

  const color = SUIT_COLORS[card.suit];
  const symbol = SUIT_SYMBOLS[card.suit];
  const textColor = color === 'red' ? 'text-red-600' : 'text-gray-900';

  return (
    <div className={`${sizeClasses} rounded-lg bg-white border border-gray-300 shadow-lg flex flex-col p-1 sm:p-2 relative overflow-hidden`}>
      {/* Top left */}
      <div className={`flex flex-col items-center leading-none ${textColor}`}>
        <span className="font-bold">{card.rank}</span>
        <span className="text-xs sm:text-sm">{symbol}</span>
      </div>

      {/* Center symbol */}
      <div className={`absolute inset-0 flex items-center justify-center ${textColor}`}>
        <span className="text-2xl sm:text-4xl opacity-30">{symbol}</span>
      </div>

      {/* Bottom right (rotated) */}
      <div className={`absolute bottom-1 right-1 sm:bottom-2 sm:right-2 flex flex-col items-center leading-none transform rotate-180 ${textColor}`}>
        <span className="font-bold">{card.rank}</span>
        <span className="text-xs sm:text-sm">{symbol}</span>
      </div>
    </div>
  );
}

export function MiniCard({ card }) {
  if (!card) return null;

  const color = SUIT_COLORS[card.suit];
  const symbol = SUIT_SYMBOLS[card.suit];
  const textColor = color === 'red' ? 'text-red-600' : 'text-gray-900';

  return (
    <div className="w-8 h-10 rounded bg-white border border-gray-300 flex flex-col items-center justify-center p-0.5">
      <span className={`text-xs font-bold ${textColor}`}>{card.rank}</span>
      <span className={`text-xs ${textColor}`}>{symbol}</span>
    </div>
  );
}

export function CardStack({ cards, hidden = false, overlap = true }) {
  return (
    <div className="flex">
      {cards.map((card, index) => (
        <div
          key={card.id || index}
          className={`${overlap && index > 0 ? '-ml-8 sm:-ml-10' : ''} transform transition-transform duration-300`}
          style={{ zIndex: index }}
        >
          <Card card={card} hidden={hidden && index === 1} />
        </div>
      ))}
    </div>
  );
}
