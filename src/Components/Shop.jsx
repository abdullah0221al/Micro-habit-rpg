import React from 'react';
import { useGame } from '../context/GameContext';
import { ShoppingBag, ShoppingCart } from 'lucide-react';

const SHOP_ITEMS = [
  { id: 'item_1', name: 'Mythic Coffee Flask', cost: 20, icon: '☕' },
  { id: 'item_2', name: 'Mechanical Keyboard Shield', cost: 50, icon: '⌨️' },
  { id: 'item_3', name: 'Blue-Light Elixir Glasses', cost: 75, icon: '👓' },
  { id: 'item_4', name: 'Ergonomic Throne Chair', cost: 150, icon: '💺' },
];

export default function Shop() {
  const { state, dispatch } = useGame();

  return (
    <div className="bg-slate-800 border-4 border-slate-700 p-4 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold text-yellow-500 mb-4 flex items-center gap-2">
        🏪 Item Shop & Armory
      </h2>
      
      <div className="space-y-3">
        {SHOP_ITEMS.map((item) => {
          const alreadyOwned = state.inventory.includes(item.name);
          return (
            <div key={item.id} className="bg-slate-900 border border-slate-700 p-3 rounded flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl" role="img" aria-label={item.name}>{item.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-xs text-yellow-500 font-mono">{item.cost} Gold</p>
                </div>
              </div>

              <button
                disabled={alreadyOwned}
                onClick={() => dispatch({ type: 'BUY_ITEM', payload: item })}
                className={`px-3 py-1.5 rounded text-xs border-b-2 font-bold flex items-center gap-1 transition-all ${
                  alreadyOwned 
                    ? 'bg-slate-800 text-slate-500 border-transparent cursor-not-allowed'
                    : 'bg-amber-600 hover:bg-amber-500 text-white border-amber-800'
                }`}
              >
                <ShoppingCart size={12} />
                {alreadyOwned ? 'Owned' : 'Purchase'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
