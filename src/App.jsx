import React from 'react';
import { GameProvider } from './context/GameContext';
import CharacterSheet from './components/CharacterSheet';
import QuestList from './components/QuestList';
import Shop from './components/Shop';

export default function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8">
        <header className="text-center max-w-xl mx-auto mb-8 bg-slate-900 border-4 border-double border-slate-700 p-4 rounded-xl shadow-2xl">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 uppercase tracking-wide">
            ⚔️ Micro-Habit RPG ⚔️
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Turn your real-world daily routines into epic character growth
          </p>
        </header>

        <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <section aria-label="Character Statistics">
            <CharacterSheet />
          </section>
          <section aria-label="Habits Ledger">
            <QuestList />
          </section>
          <section aria-label="Merchant Shop">
            <Shop />
          </section>
        </main>
        
        <footer className="text-center text-xs text-slate-600 mt-12 font-mono">
          React Production Project Build • Local Storage Active
        </footer>
      </div>
    </GameProvider>
  );
}
