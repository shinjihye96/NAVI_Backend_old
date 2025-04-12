import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DAILY_SHARE_MOCK } from 'src/mock/daily_share.mock';
// import { DailyShareItem } from 'src/types/daily-share.type';
import { DeepPartial, Repository } from 'typeorm';
import { DailyShare } from './daily-share.entity';

@Injectable()
export class DailyShareService {
  constructor(
    @InjectRepository(DailyShare)
    private readonly shareRepo: Repository<DailyShare>,
  ) {}

  async seedMockData(): Promise<void> {
    const count = await this.shareRepo.count();
    if (count === 0) {
      await this.shareRepo.save(DAILY_SHARE_MOCK);
      console.log('[Seed] Mock data inserted!');
    } else {
      console.log('[Seed] Data already exists. Skipping seed.');
    }
  }

  async findAll(): Promise<DailyShare[]> {
    return this.shareRepo.find();
  }

  async findOne(id: number): Promise<DailyShare | null> {
    return this.shareRepo.findOne({ where: { id } });
  }

  async create(data: Partial<DailyShare>): Promise<DailyShare> {
    const newPost: DeepPartial<DailyShare> = {
      content: data.content ?? '',
      user: data.user ?? {
        name: '익명',
        avatarUrl: '',
        userType: '일반',
        timeAgo: '방금 전',
      },
      emojis: {
        heart: { icon: '💚', count: 0 },
        like: { icon: '👍', count: 0 },
        pray: { icon: '🙏', count: 0 },
        sad: { icon: '😢', count: 0 },
        celebrate: { icon: '🎉', count: 0 },
      }      
    };
  
    const created = this.shareRepo.create(newPost);
    return this.shareRepo.save(created);
  }
  

  async update(id: number, data: Partial<DailyShare>): Promise<DailyShare | null> {
    const post = await this.shareRepo.findOne({ where: { id } });
    if (!post) return null;

    const updated = Object.assign(post, data);
    return this.shareRepo.save(updated);
  }

  async remove(id: number): Promise<DailyShare | null> {
    const post = await this.shareRepo.findOne({ where: { id } });
    if (!post) return null;

    await this.shareRepo.remove(post);
    return post;
  }
}