import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Check, Flame, Plus, Trash2 } from 'lucide-react';

export default function QuestList() {
  const { state, dispatch } = useGame();
  const [newQuestTitle, setNewQuestTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newQuestTitle.trim()) return;

    const quest = {
      id: Date.now().toString(),
      title: newQuestTitle,
      xpReward: Math.floor(Math.random() * 15) + 15,  // 15-30 XP
      goldReward: Math.floor(Math.random() * 10) + 10, // 10-20 Gold
      damage: Math.floor(Math.random() * 10) + 10,     // 10-20 Damage
    };

    dispatch({ type: 'ADD_QUEST', payload: quest });
    setNewQuestTitle('');
  };

  return (
    <div className="bg-slate-800 border-4 border-slate-700 p-4 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
        📜 Daily Quest Ledger
      </h2>

      {/* Quest Creator Form */}
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={newQuestTitle}
          onChange={(e) => setNewQuestTitle(e.target.value)}
          placeholder="Enter a daily real-life habit..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
        />
        <button 
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white p-2 rounded border-b-4 border-emerald-800 font-bold flex items-center justify-center transition-all"
        >
          <Plus size={18} />
        </button>
      </form>

      {/* Quest Cards rendering */}
      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
        {state.quests.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-6 italic">
            All cleared! Add more habits above to stay productive.
          </p>
        ) : (
          state.quests.map((quest) => (
            <div key={quest.id} className="bg-slate-900 border border-slate-700 p-3 rounded flex flex-col justify-between gap-3">
              <div>
                <h3 className="font-bold text-white text-sm">{quest.title}</h3>
                <div className="flex gap-3 mt-1 font-mono text-[11px]">
                  <span className="text-purple-400">+{quest.xpReward}XP</span>
                  <span className="text-yellow-500">+{quest.goldReward}g</span>
                  <span className="text-red-400">-{quest.damage}HP</span>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => dispatch({ type: 'COMPLETE_QUEST', payload: quest.id })}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white px-2 py-1 rounded text-xs border-b-2 border-emerald-900 font-bold flex items-center gap-1"
                >
                  <Check size={12} /> Complete
                </button>
                <button
                  onClick={() => dispatch({ type: 'FAIL_QUEST', payload: quest.id })}
                  className="bg-red-700 hover:bg-red-600 text-white px-2 py-1 rounded text-xs border-b-2 border-red-900 font-bold flex items-center gap-1"
                >
                  <Flame size={12} /> Fail
                </button>
                <button
                  onClick={() => dispatch({ type: 'DELETE_QUEST', payload: quest.id })}
                  className="text-slate-500 hover:text-slate-400 p-1 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
