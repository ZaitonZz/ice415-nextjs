import { loadEnvConfig } from '@next/env';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

async function seed() {
  try {
    // Dynamic imports to ensure env vars are loaded first
    const dbConnect = (await import('../lib/db')).default;
    const User = (await import('../lib/models/User.model')).default;
    const Waifu = (await import('../lib/models/Waifu.model')).default;
    const GameState = (await import('../lib/models/GameState.model')).default;
    const { waifuTypes } = await import('../data/waifuTypes');
    const cloudinary = (await import('../lib/cloudinary')).default;

    console.log('Connecting to database...');
    await dbConnect();
    console.log('Connected to database.');

    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Waifu.deleteMany({});
    await GameState.deleteMany({});
    console.log('Data cleared.');

    console.log('Seeding Users...');
    // The User model has a pre-save hook that hashes the password,
    // so we should provide the plain text password here.
    
    const admin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'password123',
      isAdmin: true,
      isActive: true
    });

    const user = await User.create({
      username: 'user',
      email: 'user@example.com',
      password: 'password123',
      isAdmin: false,
      isActive: true
    });
    console.log('Users seeded: admin (password123), user (password123)');

    console.log('Seeding Waifus...');
    const waifuPromises = Object.entries(waifuTypes).map(async ([key, data]) => {
      // Mock emotions since they are required
      // Cast data to any to avoid TS issues with dynamic import if types aren't perfect
      const waifuData = data as any;
      
      const emotions = await Promise.all(['normal', 'happy', 'sad', 'angry'].map(async (emotion) => {
        const localPath = path.join(process.cwd(), 'assets', key, `${emotion}.png`);
        let imageUrl = `/assets/waifus/${key}/${emotion}.png`; // Default fallback

        if (fs.existsSync(localPath)) {
          try {
            console.log(`Uploading ${key}/${emotion}...`);
            const result = await cloudinary.uploader.upload(localPath, {
              folder: `ice415/waifus/${key}`,
              public_id: emotion,
              overwrite: true
            });
            imageUrl = result.secure_url;
          } catch (e) {
            console.error(`Failed to upload ${localPath}:`, e);
          }
        } else {
          console.warn(`Asset not found: ${localPath}, using fallback URL`);
        }

        return {
          emotion,
          imageUrl
        };
      }));

      return Waifu.create({
        ...waifuData,
        emotions,
        isActive: true
      });
    });

    await Promise.all(waifuPromises);
    console.log('Waifus seeded.');

    console.log('Seeding GameState...');
    // Create initial game state for the user
    await GameState.create({
      userId: user._id,
      gameState: 'start',
      selectedWaifu: null,
      mood: 'neutral',
      affection: 0,
      coins: 0
    });
    console.log('GameState seeded.');

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
