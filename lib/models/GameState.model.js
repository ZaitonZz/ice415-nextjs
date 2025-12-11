import mongoose from 'mongoose';

const conversationEntrySchema = new mongoose.Schema({
  player: String,
  waifu: String,
  mood: String,
  affection: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const gameStateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },
  gameState: {
    type: String,
    enum: ['start', 'waifuSelect', 'playing', 'ended', 'date', 'minigame'],
    default: 'start'
  },
  selectedWaifu: {
    type: String,
    enum: ['sweet', 'cheerful', 'shy', 'friendly', 'warm', 'mysterious', null],
    default: null
  },
  mood: {
    type: String,
    enum: ['neutral', 'happy', 'sad', 'angry', 'yandere', 'shy', 'excited', 'worried', 'jealous', 'loving', 'disappointed', 'playful'],
    default: 'neutral'
  },
  affection: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  },
  conversationCount: {
    type: Number,
    default: 0,
    min: 0
  },
  conversationHistory: [conversationEntrySchema],
  currentDate: {
    type: Number,
    default: 0,
    min: 0
  },
  dateLocation: {
    type: String,
    default: null
  },
  storyProgress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  unlockedEndings: [{
    type: String
  }],
  conversationMemory: [conversationEntrySchema],
  currentTheme: {
    type: String,
    default: 'purple'
  },
  lastInteraction: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  minimize: false
});

// Add compound index for efficient querying
gameStateSchema.index({ userId: 1, gameState: 1 });

// Ensure model is not recompiled if already exists
const GameState = mongoose.models.GameState || mongoose.model('GameState', gameStateSchema);

export default GameState;
