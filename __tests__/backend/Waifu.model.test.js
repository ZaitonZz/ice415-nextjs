import mongoose from 'mongoose';
import Waifu from '@/lib/models/Waifu.model';
import dbConnect from '@/lib/db';

describe('Waifu Model', () => {
  beforeAll(async () => {
    await dbConnect();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Waifu.deleteMany({});
  });

  it('should create a waifu successfully', async () => {
    const waifuData = {
      name: 'Test Waifu',
      personality: 'Sweet',
      description: 'A test waifu',
      yandereTrigger: 'Ignoring her',
      emotions: [
        { emotion: 'normal', imageUrl: 'http://example.com/normal.png' },
        { emotion: 'happy', imageUrl: 'http://example.com/happy.png' },
        { emotion: 'sad', imageUrl: 'http://example.com/sad.png' },
        { emotion: 'angry', imageUrl: 'http://example.com/angry.png' }
      ]
    };

    const waifu = await Waifu.create(waifuData);

    expect(waifu._id).toBeDefined();
    expect(waifu.name).toBe(waifuData.name);
    expect(waifu.emotions).toHaveLength(4);
  });

  it('should fail if emotions are missing', async () => {
    const waifuData = {
      name: 'Test Waifu',
      personality: 'Sweet',
      description: 'A test waifu',
      yandereTrigger: 'Ignoring her',
      emotions: [
        { emotion: 'normal', imageUrl: 'http://example.com/normal.png' }
      ]
    };

    await expect(Waifu.create(waifuData)).rejects.toThrow();
  });
});
