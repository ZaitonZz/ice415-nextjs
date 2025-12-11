export const initialState = {
  // Core game states
  gameState: "start", // start, waifuSelect, playing, ended, date, dateSelect, minigame, minigameSelect
  
  // Waifu and conversation
  selectedWaifu: null,
  waifuData: null, // Full waifu object from database with emotions
  mood: "neutral",
  affection: 50,
  currentImage: "",
  dialogue: "",
  choices: [],
  conversationHistory: [],
  conversationCount: 0,
  
  // Settings
  loading: false,
  soundEnabled: true,
  musicEnabled: true,
  showSettings: false,
  currentMusicRef: null,
  selectedMusicTrack: 0,
  greetingImage: "",
  
  // Features
  currentTheme: "purple",
  currentDate: null,
  dateLocation: null,
  miniGame: null,
  conversationMemory: [],
  storyProgress: 0,
  unlockedEndings: [],
  
  // Mini-game runtime state
  gameScore: 0,
  gameTime: 30,
  gameActive: false,
  currentTrivia: 0,
  selectedAnswer: null,
  
  // Admin panel
  showAdminPanel: false,
};
