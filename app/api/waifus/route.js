import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Waifu from '@/lib/models/Waifu.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// GET /api/waifus
export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');
    
    const query = {};
    if (isActive !== null && isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    
    const waifus = await Waifu.find(query).sort({ order: 1, createdAt: 1 });
    
    return NextResponse.json({
      success: true,
      count: waifus.length,
      data: waifus
    });
  } catch (error) {
    console.error('Error fetching waifus:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}

// POST /api/waifus
export async function POST(request) {
  try {
    await dbConnect();
    
    // Check authentication and admin status
    const session = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Not authorized as admin' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const {
      name,
      personality,
      description,
      color,
      icon,
      traits,
      yandereTrigger,
      emotions,
      isActive,
      order
    } = body;
    
    // Check if waifu with same name already exists
    const existingWaifu = await Waifu.findOne({ name });
    if (existingWaifu) {
      return NextResponse.json(
        { success: false, message: 'Waifu with this name already exists' },
        { status: 400 }
      );
    }
    
    // Create waifu
    const waifu = await Waifu.create({
      name,
      personality,
      description,
      color,
      icon,
      traits,
      yandereTrigger,
      emotions,
      isActive,
      order
    });
    
    return NextResponse.json({
      success: true,
      data: waifu
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating waifu:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}
