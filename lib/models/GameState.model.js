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

const screenshotSchema = new mongoose.Schema({
  id: Number,
  timestamp: String,
  waifu: String,
  mood: String,
  affection: Number,
  dialogue: String
}, { _id: false });

const giftSchema = new mongoose.Schema({
  id: String,
  name: String,
  icon: String,
  value: Number,
  timestamp: Number
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
  achievements: [{
    type: String
  }],
  unlockedOutfits: [{
    type: String
  }],
  currentOutfit: {
    type: String,
    default: 'default'
  },
  screenshots: [screenshotSchema],
  gifts: [giftSchema],
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
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const GameState = mongoose.models.GameState || mongoose.model('GameState', gameStateSchema);

export default GameState;
