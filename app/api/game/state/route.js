import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import GameState from '@/lib/models/GameState.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

// GET /api/game/state
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
    
    const gameState = await GameState.getOrCreate(session.user.id);
    
    return NextResponse.json({
      success: true,
      data: {
        gameState
      }
    });
  } catch (error) {
    console.error('Error fetching game state:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}

// POST /api/game/state
export async function POST(request) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Not authorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const userId = session.user.id;
    
    // Get or create game state
    let gameState = await GameState.findOne({ userId });
    
    if (!gameState) {
      gameState = await GameState.create({
        userId,
        ...body
      });
    } else {
      // Update existing game state
      Object.keys(body).forEach(key => {
        if (body[key] !== undefined) {
          gameState[key] = body[key];
        }
      });
      
      gameState.lastPlayed = Date.now();
      await gameState.save();
    }
    
    return NextResponse.json({
      success: true,
      message: 'Game state saved successfully',
      data: {
        gameState
      }
    });
    
  } catch (error) {
    console.error('Error saving game state:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}

// DELETE /api/game/state
export async function DELETE(request) {
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
    
    let gameState = await GameState.findOne({ userId });
    
    if (!gameState) {
      gameState = await GameState.create({ userId });
    } else {
      await gameState.reset();
    }
    
    return NextResponse.json({
      success: true,
      message: 'Game state reset successfully',
      data: {
        gameState
      }
    });
    
  } catch (error) {
    console.error('Error resetting game state:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}
