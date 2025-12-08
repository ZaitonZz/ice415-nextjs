import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Waifu from '@/lib/models/Waifu.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

// GET /api/waifus/:id
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const waifu = await Waifu.findById(id);
    
    if (!waifu) {
      return NextResponse.json(
        { success: false, message: 'Waifu not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: waifu
    });
  } catch (error) {
    console.error('Error fetching waifu:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}

// PUT /api/waifus/:id
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    // Check authentication and admin status
    const session = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Not authorized as admin' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    let waifu = await Waifu.findById(id);
    
    if (!waifu) {
      return NextResponse.json(
        { success: false, message: 'Waifu not found' },
        { status: 404 }
      );
    }
    
    // Update waifu
    waifu = await Waifu.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });
    
    return NextResponse.json({
      success: true,
      data: waifu
    });
    
  } catch (error) {
    console.error('Error updating waifu:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}

// DELETE /api/waifus/:id
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    // Check authentication and admin status
    const session = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Not authorized as admin' },
        { status: 401 }
      );
    }
    
    const waifu = await Waifu.findById(id);
    
    if (!waifu) {
      return NextResponse.json(
        { success: false, message: 'Waifu not found' },
        { status: 404 }
      );
    }
    
    await waifu.deleteOne();
    
    return NextResponse.json({
      success: true,
      data: {}
    });
    
  } catch (error) {
    console.error('Error deleting waifu:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}
