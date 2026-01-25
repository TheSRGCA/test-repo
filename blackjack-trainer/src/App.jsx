import React, { useState } from 'react';
import { GameProvider } from './contexts/GameContext';
import PlayPage from './pages/PlayPage';
import LearnPage from './pages/LearnPage';
import PracticePage from './pages/PracticePage';
import GameSettings from './components/GameSettings';

const pages = [
  { id: 'play', label: 'Play', icon: '🎰' },
  { id: 'learn', label: 'Learn', icon: '📚' },
  { id: 'practice', label: 'Practice', icon: '🎯' },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('play');
  const [showSettings, setShowSettings] = useState(false);

  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-950 flex flex-col">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🃏</span>
              <div>
                <h1 className="text-white font-bold text-lg">Blackjack Trainer</h1>
                <p className="text-gray-500 text-xs">Master Card Counting</p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              title="Settings"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {currentPage === 'play' && <PlayPage />}
          {currentPage === 'learn' && <LearnPage />}
          {currentPage === 'practice' && <PracticePage />}
        </main>

        {/* Bottom navigation */}
        <nav className="bg-gray-900 border-t border-gray-800 px-4 py-2 safe-area-bottom">
          <div className="max-w-md mx-auto flex justify-around">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setCurrentPage(page.id)}
                className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                  currentPage === page.id
                    ? 'text-blue-400 bg-blue-900 bg-opacity-30'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <span className="text-xl mb-1">{page.icon}</span>
                <span className="text-xs font-medium">{page.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Settings modal */}
        {showSettings && <GameSettings onClose={() => setShowSettings(false)} />}
      </div>
    </GameProvider>
  );
}
