import React, { useState } from 'react';
import StrategyChart from '../components/StrategyChart';
import DeviationsChart from '../components/DeviationsChart';
import CountingDisplay from '../components/CountingDisplay';
import HandSignals from '../components/HandSignals';
import Stats from '../components/Stats';
import { useGame } from '../contexts/GameContext';

const tabs = [
  { id: 'basic-strategy', label: 'Basic Strategy', icon: '📊' },
  { id: 'counting', label: 'Hi-Lo Counting', icon: '🔢' },
  { id: 'deviations', label: 'Deviations', icon: '⚡' },
  { id: 'hand-signals', label: 'Hand Signals', icon: '✋' },
  { id: 'stats', label: 'Your Stats', icon: '📈' },
];

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState('basic-strategy');
  const { getTrueCount } = useGame();

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      {/* Tab navigation */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="max-w-4xl mx-auto">
        {activeTab === 'basic-strategy' && <BasicStrategySection />}
        {activeTab === 'counting' && <CountingSection />}
        {activeTab === 'deviations' && <DeviationsSection trueCount={getTrueCount()} />}
        {activeTab === 'hand-signals' && <HandSignalsSection />}
        {activeTab === 'stats' && <Stats />}
      </div>
    </div>
  );
}

function BasicStrategySection() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-white text-2xl font-bold mb-4">What is Basic Strategy?</h2>
        <p className="text-gray-300 mb-4">
          Basic Strategy is the mathematically optimal way to play every hand in blackjack.
          It was developed by running millions of computer simulations to determine the best
          action (hit, stand, double, split, or surrender) for every possible combination of
          player hand vs dealer upcard.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-white font-bold mb-2">Why Learn It?</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>Reduces house edge from ~5% to ~0.5%</li>
              <li>Foundation for card counting</li>
              <li>Makes every decision automatic</li>
              <li>Maximizes your winning potential</li>
            </ul>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-white font-bold mb-2">How to Use the Charts</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>Find your hand total on the left</li>
              <li>Find dealer's upcard on top</li>
              <li>The intersection shows your action</li>
              <li>Practice until it's automatic!</li>
            </ul>
          </div>
        </div>
      </div>

      <StrategyChart />

      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="text-white text-lg font-bold mb-4">Key Strategy Concepts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-yellow-400 font-bold mb-2">Hard Hands</h4>
            <p className="text-gray-400 text-sm">
              Hands without an ace, or where the ace counts as 1 (to avoid busting).
              These are the most common hands you'll play.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-green-400 font-bold mb-2">Soft Hands</h4>
            <p className="text-gray-400 text-sm">
              Hands with an ace counting as 11. You can't bust with one hit,
              making these hands more flexible and valuable.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-blue-400 font-bold mb-2">Pairs</h4>
            <p className="text-gray-400 text-sm">
              Two cards of the same value. Splitting creates two separate hands,
              each with its own bet. Know when to split and when not to!
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-purple-400 font-bold mb-2">Surrender</h4>
            <p className="text-gray-400 text-sm">
              Give up half your bet to fold a bad hand. Only available as first action.
              Use it on hard 15 vs 10 and hard 16 vs 9/10/A.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CountingSection() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-white text-2xl font-bold mb-4">The Hi-Lo Card Counting System</h2>
        <p className="text-gray-300 mb-4">
          Hi-Lo is the most popular and effective card counting system. It's balanced (the count ends
          at 0 after a full deck), easy to learn, and powerful enough to gain a real edge over the casino.
        </p>

        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <h3 className="text-white font-bold mb-3">Card Values</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-green-900 rounded-lg p-3">
              <p className="text-green-400 text-2xl font-bold">+1</p>
              <p className="text-white">2, 3, 4, 5, 6</p>
              <p className="text-gray-400 text-sm">Low cards (good for player)</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <p className="text-gray-400 text-2xl font-bold">0</p>
              <p className="text-white">7, 8, 9</p>
              <p className="text-gray-400 text-sm">Neutral cards</p>
            </div>
            <div className="bg-red-900 rounded-lg p-3">
              <p className="text-red-400 text-2xl font-bold">-1</p>
              <p className="text-white">10, J, Q, K, A</p>
              <p className="text-gray-400 text-sm">High cards (bad for player)</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-white font-bold mb-2">Why High Count = Good</h4>
            <p className="text-gray-400 text-sm">
              When the count is high, more 10s and Aces remain in the deck.
              This means more blackjacks (3:2 payout), better doubles, and
              the dealer is more likely to bust.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-white font-bold mb-2">Why Low Count = Bad</h4>
            <p className="text-gray-400 text-sm">
              When the count is low (negative), more small cards remain.
              The dealer is less likely to bust, and you're less likely
              to get blackjack. Bet minimum or leave.
            </p>
          </div>
        </div>
      </div>

      <CountingDisplay showDetails />

      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="text-white text-lg font-bold mb-4">Running Count vs True Count</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-yellow-400 font-bold mb-2">Running Count (RC)</h4>
            <p className="text-gray-400 text-sm mb-2">
              The sum of all card values you've seen. Start at 0 and add/subtract
              as each card is dealt.
            </p>
            <p className="text-white text-sm">
              Example: You see 3, 7, K, 5, 2, A<br />
              RC = +1 + 0 + (-1) + 1 + 1 + (-1) = <span className="text-green-400">+1</span>
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-blue-400 font-bold mb-2">True Count (TC)</h4>
            <p className="text-gray-400 text-sm mb-2">
              Running Count divided by decks remaining. This standardizes the
              advantage across different shoe depths.
            </p>
            <p className="text-white text-sm">
              Example: RC = +6, 2 decks remaining<br />
              TC = 6 ÷ 2 = <span className="text-green-400">+3</span>
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-white font-bold mb-2">Betting with the Count</h4>
          <div className="grid grid-cols-6 gap-2 text-center text-sm">
            <div className="bg-red-900 rounded p-2">
              <p className="text-white font-bold">TC ≤ 0</p>
              <p className="text-gray-400">1 unit</p>
            </div>
            <div className="bg-yellow-900 rounded p-2">
              <p className="text-white font-bold">TC +1</p>
              <p className="text-gray-400">2 units</p>
            </div>
            <div className="bg-yellow-800 rounded p-2">
              <p className="text-white font-bold">TC +2</p>
              <p className="text-gray-400">4 units</p>
            </div>
            <div className="bg-green-900 rounded p-2">
              <p className="text-white font-bold">TC +3</p>
              <p className="text-gray-400">8 units</p>
            </div>
            <div className="bg-green-800 rounded p-2">
              <p className="text-white font-bold">TC +4</p>
              <p className="text-gray-400">12 units</p>
            </div>
            <div className="bg-green-700 rounded p-2">
              <p className="text-white font-bold">TC +5</p>
              <p className="text-gray-400">16 units</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeviationsSection({ trueCount }) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-white text-2xl font-bold mb-4">Strategy Deviations</h2>
        <p className="text-gray-300 mb-4">
          While basic strategy is optimal for a neutral deck, card counting reveals when
          deviations from basic strategy become more profitable. These are the most
          important plays to memorize after mastering basic strategy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-yellow-400 font-bold mb-2">The Illustrious 18</h3>
            <p className="text-gray-400 text-sm">
              The 18 most valuable strategy deviations, ranked by their impact on
              expected value. Includes standing on 16 vs 10, insurance, and splitting 10s.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-purple-400 font-bold mb-2">The Fab 4</h3>
            <p className="text-gray-400 text-sm">
              Four surrender deviations that can save significant money when the
              count is right. Only applicable at casinos that offer surrender.
            </p>
          </div>
        </div>
      </div>

      <DeviationsChart currentTrueCount={trueCount} />

      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="text-white text-lg font-bold mb-4">Most Important Deviations</h3>

        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-white font-bold">Insurance at TC +3</h4>
              <span className="bg-green-600 px-2 py-1 rounded text-xs text-white">High Value</span>
            </div>
            <p className="text-gray-400 text-sm">
              Normally never take insurance. But at TC +3 or higher, there are enough
              10-value cards remaining that insurance becomes a profitable bet.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-white font-bold">Stand on 16 vs 10 at TC 0</h4>
              <span className="bg-green-600 px-2 py-1 rounded text-xs text-white">Most Valuable</span>
            </div>
            <p className="text-gray-400 text-sm">
              Basic strategy says hit 16 vs 10. But at TC 0 or higher, standing becomes
              slightly better because more 10s remain to bust you if you hit.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-white font-bold">Double 10 vs 10 at TC +4</h4>
              <span className="bg-yellow-600 px-2 py-1 rounded text-xs text-white">Medium Value</span>
            </div>
            <p className="text-gray-400 text-sm">
              Normally just hit. But when the count is very high, there are so many
              10s and Aces that doubling becomes profitable despite the dealer's strong upcard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HandSignalsSection() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-white text-2xl font-bold mb-4">Casino Hand Signals</h2>
        <p className="text-gray-300 mb-4">
          In a casino, you must use specific hand signals to indicate your decisions.
          This protects both you and the casino by providing clear evidence on security
          cameras of what action you wanted to take.
        </p>

        <div className="bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-lg p-4 mb-4">
          <h3 className="text-yellow-400 font-bold mb-2">Important Rules</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>Always use hand signals - verbal commands alone may not be accepted</li>
            <li>Never touch your cards in a shoe game (face-up cards)</li>
            <li>In hand-held games, only touch cards with one hand</li>
            <li>Never touch your bet once cards are dealt</li>
          </ul>
        </div>
      </div>

      <HandSignals />

      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="text-white text-lg font-bold mb-4">Shoe Game vs Hand-Held Game</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-blue-400 font-bold mb-2">Shoe Game (6-8 decks)</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><span className="text-green-400">Hit:</span> Tap or scratch the table</li>
              <li><span className="text-red-400">Stand:</span> Wave hand horizontally</li>
              <li><span className="text-yellow-400">Double:</span> Place extra bet, point one finger</li>
              <li><span className="text-blue-400">Split:</span> Place extra bet, make V sign</li>
              <li><span className="text-purple-400">Surrender:</span> Draw line behind bet</li>
            </ul>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-green-400 font-bold mb-2">Hand-Held Game (1-2 decks)</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><span className="text-green-400">Hit:</span> Scrape cards toward you on felt</li>
              <li><span className="text-red-400">Stand:</span> Slide cards under your bet</li>
              <li><span className="text-yellow-400">Double:</span> Place cards face-up, add bet</li>
              <li><span className="text-blue-400">Split:</span> Place cards face-up, add bet</li>
              <li><span className="text-purple-400">Blackjack:</span> Turn cards over immediately</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
