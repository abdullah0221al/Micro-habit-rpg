import React, { createContext, useContext, useReducer, useEffect } from 'react';

const GameContext = createContext();

const initialState = {
  character: { name: 'Level 1 Hero', hp: 100, maxHp: 100, xp: 0, nextLevelXp: 100, level: 1, gold: 30 },
  quests: [
    { id: '1', title: 'Hydrate (Drink 8oz Water)', xpReward: 15, goldReward: 10, damage: 15, type: 'daily' },
    { id: '2', title: 'Read 10 Pages of a Book', xpReward: 30, goldReward: 20, damage: 20, type: 'daily' }
  ],
  inventory: []
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'LOAD_SAVED_STATE':
      return action.payload;

    case 'ADD_QUEST':
      return { ...state, quests: [...state.quests, action.payload] };

    case 'DELETE_QUEST':
      return { ...state, quests: state.quests.filter(q => q.id !== action.payload) };
      
    case 'COMPLETE_QUEST': {
      const quest = state.quests.find(q => q.id === action.payload);
      if (!quest) return state;

      let newXp = state.character.xp + quest.xpReward;
      let newLevel = state.character.level;
      let newNextLevelXp = state.character.nextLevelXp;
      let leveledUp = false;

      if (newXp >= newNextLevelXp) {
        leveledUp = true;
        newXp = newXp - newNextLevelXp;
        newLevel += 1;
        newNextLevelXp = newLevel * 100; // Each level requires more XP
      }

      return {
        ...state,
        character: {
          ...state.character,
          xp: newXp,
          level: newLevel,
          nextLevelXp: newNextLevelXp,
          gold: state.character.gold + quest.goldReward,
          hp: Math.min(state.character.maxHp, state.character.hp + 5) // Small heal on completion
        }
      };
    }

    case 'FAIL_QUEST': {
      const quest = state.quests.find(q => q.id === action.payload);
      if (!quest) return state;

      const newHp = Math.max(0, state.character.hp - quest.damage);
      
      if (newHp === 0) {
        // Player "faints" penalty: lose 25 gold, reset HP to full
        alert('💥 You took too much damage and fainted! You lost 25 Gold.');
        return {
          ...state,
          character: {
            ...state.character,
            hp: state.character.maxHp,
            gold: Math.max(0, state.character.gold - 25)
          }
        };
      }

      return {
        ...state,
        character: { ...state.character, hp: newHp }
      };
    }

    case 'BUY_ITEM':
      if (state.character.gold < action.payload.cost) {
        alert('❌ Not enough gold!');
        return state;
      }
      return {
        ...state,
        character: { ...state.character, gold: state.character.gold - action.payload.cost },
        inventory: [...state.inventory, action.payload.name]
      };

    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('rpg_habit_state');
    if (saved) {
      try {
        dispatch({ type: 'LOAD_SAVED_STATE', payload: JSON.parse(saved) });
      } catch (e) {
        console.error("Failed to load saved state", e);
      }
    }
  }, []);

  // Save to local storage when state changes
  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem('rpg_habit_state', JSON.stringify(state));
    }
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
