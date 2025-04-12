import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { DAILY_SHARE_MOCK } from 'src/mock/daily_share.mock';
// import { DailyShareItem } from 'src/types/daily-share.type';
import { Repository } from 'typeorm';
import { DailyShare } from './daily-share.entity';

@Injectable()
export class DailyShareService {
  
  constructor(
    @InjectRepository(DailyShare)
    // private shares: DailyShareItem[] = [...DAILY_SHARE_MOCK];
    private readonly shareRepo: Repository<DailyShare>,
  ) {}

  async findAll(): Promise<DailyShare[]> {
    return this.shareRepo.find();
  }

  async findOne(id: number): Promise<DailyShare | null> {
    return this.shareRepo.findOne({ where: { id } });
  }

  async create(data: Partial<DailyShare>): Promise<DailyShare> {
    const newPost = this.shareRepo.create({
      content: data.content ?? '',
      user: data.user ?? {
        name: '익명',
        avatarUrl: '',
        userType: '일반',
        timeAgo: '방금 전',
      },
      emojis: {
        heart: 0,
        like: 0,
        pray: 0,
        sad: 0,
        celebrate: 0,
      },
    });
    return this.shareRepo.save(newPost);
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
