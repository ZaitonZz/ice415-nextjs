import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Waifu from '@/lib/models/Waifu.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../auth/[...nextauth]/route';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST /api/waifus/:id/emotions/:emotion/upload
export async function POST(request, { params }) {
  try {
    await dbConnect();
    const { id, emotion } = await params;
    
    // Check authentication and admin status
    const session = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Not authorized as admin' },
        { status: 401 }
      );
    }
    
    if (!['normal', 'happy', 'sad', 'angry'].includes(emotion)) {
      return NextResponse.json(
        { success: false, message: 'Invalid emotion. Must be one of: normal, happy, sad, angry' },
        { status: 400 }
      );
    }
    
    const formData = await request.formData();
    const file = formData.get('image');
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No image file uploaded' },
        { status: 400 }
      );
    }
    
    const waifu = await Waifu.findById(id);
    
    if (!waifu) {
      return NextResponse.json(
        { success: false, message: 'Waifu not found' },
        { status: 404 }
      );
    }
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'waifus',
          public_id: `waifu-${id}-${emotion}-${Date.now()}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });
    
    const imageUrl = result.secure_url;
    
    // Update or add emotion
    const emotionIndex = waifu.emotions.findIndex(e => e.emotion === emotion);
    if (emotionIndex !== -1) {
      waifu.emotions[emotionIndex].imageUrl = imageUrl;
    } else {
      waifu.emotions.push({ emotion, imageUrl });
    }
    
    await waifu.save();
    
    return NextResponse.json({
      success: true,
      message: 'Emotion image uploaded successfully',
      data: {
        emotion,
        imageUrl
      }
    });
    
  } catch (error) {
    console.error('Error uploading emotion image:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}
