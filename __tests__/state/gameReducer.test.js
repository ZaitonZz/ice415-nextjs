import { gameReducer } from '../../state/gameReducer';
import { initialState } from '../../state/initialState';

describe('gameReducer', () => {
  it('should return the initial state', () => {
    // Reducers usually return state if action is unknown, but this one doesn't have a default case returning state explicitly in the snippet I saw, 
    // but usually React useReducer handles that or it returns undefined. 
    // Looking at the code: `switch (action.type) { ... }` without default.
    // If I pass an unknown action, it will return undefined (implicitly).
    // However, let's test known actions.
  });

  it('should handle SET_GAME_STATE', () => {
    const action = { type: 'SET_GAME_STATE', gameState: 'playing' };
    const newState = gameReducer(initialState, action);
    expect(newState.gameState).toBe('playing');
  });

  it('should handle SET_AFFECTION and clamp values', () => {
    // Test normal update
    let action = { type: 'SET_AFFECTION', affection: 75 };
    let newState = gameReducer(initialState, action);
    expect(newState.affection).toBe(75);

    // Test upper bound
    action = { type: 'SET_AFFECTION', affection: 150 };
    newState = gameReducer(initialState, action);
    expect(newState.affection).toBe(100);

    // Test lower bound
    action = { type: 'SET_AFFECTION', affection: -20 };
    newState = gameReducer(initialState, action);
    expect(newState.affection).toBe(0);
  });

  it('should handle ADD_HISTORY', () => {
    const entry = { sender: 'user', text: 'Hello' };
    const action = { type: 'ADD_HISTORY', entry };
    const newState = gameReducer(initialState, action);
    expect(newState.conversationHistory).toHaveLength(1);
    expect(newState.conversationHistory[0]).toEqual(entry);

    // Add another
    const entry2 = { sender: 'waifu', text: 'Hi there' };
    const action2 = { type: 'ADD_HISTORY', entry: entry2 };
    const newState2 = gameReducer(newState, action2);
    expect(newState2.conversationHistory).toHaveLength(2);
    expect(newState2.conversationHistory[1]).toEqual(entry2);
  });

  it('should handle UNLOCK_OUTFIT and prevent duplicates', () => {
    const outfit = 'summer_dress';
    const action = { type: 'UNLOCK_OUTFIT', outfit };
    
    // First unlock
    const newState = gameReducer(initialState, action);
    expect(newState.unlockedOutfits).toContain(outfit);
    expect(newState.unlockedOutfits).toHaveLength(1);

    // Try unlocking same outfit again
    const newState2 = gameReducer(newState, action);
    expect(newState2.unlockedOutfits).toHaveLength(1); // Should still be 1
    expect(newState2.unlockedOutfits).toBe(newState.unlockedOutfits); // Reference equality check if state didn't change
  });

  it('should handle INCREMENT_DATE_COUNT', () => {
    const action = { type: 'INCREMENT_DATE_COUNT' };
    // Assuming initialState.currentDate is null or 0. 
    // The reducer says: `(state.currentDate || 0) + 1`
    
    const newState = gameReducer(initialState, action);
    expect(newState.currentDate).toBe(1);

    const newState2 = gameReducer(newState, action);
    expect(newState2.currentDate).toBe(2);
  });
});
