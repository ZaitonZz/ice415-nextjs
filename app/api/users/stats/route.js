import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User.model';
import GameState from '@/lib/models/GameState.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

// GET /api/users/stats
export async function GET(request) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Not authorized' },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    
    const user = await User.findById(userId);
    const gameState = await GameState.findOne({ userId });
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: {
        username: user.username,
        joinDate: user.createdAt,
        lastPlayed: gameState ? gameState.lastPlayed : null,
        endingsUnlocked: gameState ? gameState.unlockedEndings.length : 0,
        conversationCount: gameState ? gameState.conversationCount : 0
      }
    });
    
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}
