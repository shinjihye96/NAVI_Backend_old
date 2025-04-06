import { Injectable } from '@nestjs/common';
import { DAILY_SHARE_MOCK } from 'src/mock/daily_share.mock';
import { DailyShareItem } from 'src/types/daily-share.type';

@Injectable()
export class DailyShareService {
  private shares: DailyShareItem[] = [...DAILY_SHARE_MOCK];

  findAll(): DailyShareItem[] {
    return this.shares;
  }

  findOne(id: number): DailyShareItem | undefined {
    return this.shares.find((item) => item.id === id);
  }

  create(data: Partial<DailyShareItem>): DailyShareItem {
    const newPost: DailyShareItem = {
      id: this.shares.length + 1,
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
    };
    this.shares.push(newPost);
    return newPost;
  }

  update(id: number, data: Partial<DailyShareItem>): DailyShareItem | null {
    const index = this.shares.findIndex((item) => item.id === id);
    if (index === -1) return null;
    this.shares[index] = { ...this.shares[index], ...data };
    return this.shares[index];
  }

  remove(id: number): DailyShareItem | null {
    const index = this.shares.findIndex((item) => item.id === id);
    if (index === -1) return null;
    const deleted = this.shares.splice(index, 1);
    return deleted[0];
  }
}
