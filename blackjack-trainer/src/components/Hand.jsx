import React from 'react';
import { CardStack } from './Card';
import { calculateHandValue, isSoftHand, isBlackjack, isBusted } from '../utils/deck';

export default function Hand({
  cards,
  isDealer = false,
  hideHoleCard = false,
  isActive = false,
  result = null,
  bet = null,
}) {
  const handValue = cards.length > 0 ? calculateHandValue(cards) : 0;
  const soft = isSoftHand(cards);
  const blackjack = isBlackjack(cards);
  const busted = isBusted(cards);

  const getResultColor = () => {
    switch (result) {
      case 'win':
      case 'blackjack':
        return 'bg-green-500';
      case 'lose':
        return 'bg-red-500';
      case 'push':
        return 'bg-yellow-500';
      default:
        return '';
    }
  };

  const getResultText = () => {
    switch (result) {
      case 'win':
        return 'WIN';
      case 'blackjack':
        return 'BLACKJACK!';
      case 'lose':
        return 'LOSE';
      case 'push':
        return 'PUSH';
      default:
        return '';
    }
  };

  return (
    <div className={`relative ${isActive ? 'ring-2 ring-yellow-400 ring-offset-4 ring-offset-felt rounded-lg p-2' : 'p-2'}`}>
      {/* Cards */}
      <CardStack cards={cards} hidden={isDealer && hideHoleCard} />

      {/* Hand value */}
      {cards.length > 0 && (
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
            busted ? 'bg-red-600 text-white' :
            blackjack ? 'bg-yellow-500 text-black' :
            'bg-gray-800 text-white'
          }`}>
            {hideHoleCard && isDealer ? (
              cards[0].rank === 'A' ? '11' : calculateHandValue([cards[0]])
            ) : (
              <>
                {soft && handValue <= 21 && !blackjack ? `${handValue - 10}/` : ''}
                {blackjack ? 'BJ' : handValue}
              </>
            )}
          </span>

          {busted && !isDealer && (
            <span className="text-red-500 font-bold animate-pulse">BUST!</span>
          )}
        </div>
      )}

      {/* Bet chip */}
      {bet && !isDealer && (
        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-4 border-dashed border-white flex items-center justify-center shadow-lg">
          <span className="text-white text-xs font-bold">${bet}</span>
        </div>
      )}

      {/* Result overlay */}
      {result && (
        <div className={`absolute inset-0 flex items-center justify-center ${getResultColor()} bg-opacity-80 rounded-lg`}>
          <span className="text-white font-bold text-lg">{getResultText()}</span>
        </div>
      )}
    </div>
  );
}
