import { GET, POST } from '../../app/api/game/state/route';
import { getServerSession } from 'next-auth';
import GameState from '@/lib/models/GameState.model';
import { NextResponse } from 'next/server';

// Mock next-auth
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

// Mock dbConnect
jest.mock('@/lib/db', () => jest.fn());

// Mock GameState model
jest.mock('@/lib/models/GameState.model', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  getOrCreate: jest.fn(),
}));

// Mock authOptions
jest.mock('../../app/api/auth/[...nextauth]/route', () => ({
  authOptions: {},
}));

describe('/api/game/state', () => {
  const mockSession = {
    user: {
      id: 'user123',
      name: 'Test User',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('should return 401 if not authorized', async () => {
      getServerSession.mockResolvedValue(null);
      
      const response = await GET(new Request('http://localhost/api/game/state'));
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
    });

    it('should return game state if authorized', async () => {
      getServerSession.mockResolvedValue(mockSession);
      const mockGameState = { userId: 'user123', gameState: 'playing' };
      GameState.getOrCreate.mockResolvedValue(mockGameState);

      const response = await GET(new Request('http://localhost/api/game/state'));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.gameState).toEqual(mockGameState);
      expect(GameState.getOrCreate).toHaveBeenCalledWith('user123');
    });
  });

  describe('POST', () => {
    it('should return 401 if not authorized', async () => {
      getServerSession.mockResolvedValue(null);
      
      const response = await POST(new Request('http://localhost/api/game/state', {
        method: 'POST',
        body: JSON.stringify({ gameState: 'playing' }),
      }));
      
      expect(response.status).toBe(401);
    });

    it('should create new game state if none exists', async () => {
      getServerSession.mockResolvedValue(mockSession);
      GameState.findOne.mockResolvedValue(null);
      
      const newGameState = { userId: 'user123', gameState: 'playing', save: jest.fn() };
      GameState.create.mockResolvedValue(newGameState);

      const body = { gameState: 'playing' };
      const response = await POST(new Request('http://localhost/api/game/state', {
        method: 'POST',
        body: JSON.stringify(body),
      }));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(GameState.create).toHaveBeenCalledWith({
        userId: 'user123',
        ...body
      });
    });

    it('should update existing game state', async () => {
      getServerSession.mockResolvedValue(mockSession);
      
      const existingGameState = { 
        userId: 'user123', 
        gameState: 'start', 
        save: jest.fn().mockResolvedValue(true) 
      };
      GameState.findOne.mockResolvedValue(existingGameState);

      const body = { gameState: 'playing', affection: 60 };
      const response = await POST(new Request('http://localhost/api/game/state', {
        method: 'POST',
        body: JSON.stringify(body),
      }));

      expect(response.status).toBe(200);
      expect(existingGameState.gameState).toBe('playing');
      expect(existingGameState.affection).toBe(60);
      expect(existingGameState.save).toHaveBeenCalled();
    });
  });
});
