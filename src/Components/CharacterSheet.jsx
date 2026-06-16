import React from 'react';
import { useGame } from '../context/GameContext';
import { Shield, Heart, Award, Coins, Backpack } from 'lucide-react';

export default function CharacterSheet() {
  const { state } = useGame();
  const { character, inventory } = state;

  const hpPercentage = (character.hp / character.maxHp) * 100;
  const xpPercentage = (character.xp / character.nextLevelXp) * 100;

  return (
    <div className="bg-slate-800 border-4 border-slate-700 p-4 rounded-lg shadow-xl">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-yellow-500 p-2 rounded border-2 border-yellow-600 text-slate-900">
          <Shield size={28} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-yellow-400">{character.name}</h2>
          <p className="text-sm text-slate-400 flex items-center gap-1">
            <Award size={14} /> Level {character.level} Adventurer
          </p>
        </div>
      </div>

      {/* HP Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm font-semibold mb-1 text-red-400">
          <span className="flex items-center gap-1"><Heart size={16}/> HP</span>
          <span>{character.hp} / {character.maxHp}</span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-4 p-0.5 border border-slate-600">
          <div 
            className="bg-red-500 h-full rounded-full transition-all duration-300" 
            style={{ width: `${hpPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* XP Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm font-semibold mb-1 text-purple-400">
          <span className="flex items-center gap-1"><Award size={16}/> XP</span>
          <span>{character.xp} / {character.nextLevelXp}</span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-4 p-0.5 border border-slate-600">
          <div 
            className="bg-purple-500 h-full rounded-full transition-all duration-300" 
            style={{ width: `${xpPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Gold Stat */}
      <div className="flex items-center justify-between bg-slate-900 p-3 rounded border border-slate-700 mb-4">
        <span className="text-slate-300 flex items-center gap-2 font-medium">
          <Coins className="text-yellow-500" size={20} /> Wallet Balance:
        </span>
        <span className="text-xl font-bold text-yellow-400">{character.gold}g</span>
      </div>

      {/* Loot / Inventory */}
      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Backpack size={16} /> Equipped Equipment
        </h3>
        {inventory.length === 0 ? (
          <p className="text-xs text-slate-500 italic p-3 bg-slate-900/50 rounded border border-dashed border-slate-700 text-center">
            No equipment items purchased yet. Visit the Armory shop!
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {inventory.map((item, i) => (
              <span key={i} className="text-xs bg-slate-900 text-emerald-400 px-2 py-1 rounded border border-emerald-800 font-mono">
                ⚔️ {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

