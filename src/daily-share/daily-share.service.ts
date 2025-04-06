import { Injectable } from '@nestjs/common';

@Injectable()
export class DailyShareService {
  private shares = [
    {
      id: 1,
      content: '오늘은 정말 따뜻한 햇살이 좋았어요.',
      user: { name: '지혜', avatarUrl: '', userType: '일반', timeAgo: '1시간 전' },
      emojis: { heart: 12, like: 8, pray: 1, sad: 0, celebrate: 4 }
    },
  ];

  findAll() {
    return this.shares;
  }

  findOne(id: number) {
    return this.shares.find(item => item.id === id);
  }

  create(data: any) {
    const newPost = {
      id: this.shares.length + 1,
      ...data,
      user: data.user ?? { name: '익명', avatarUrl: '', userType: '일반', timeAgo: '방금 전' },
      emojis: { heart: 0, like: 0, pray: 0, sad: 0, celebrate: 0 },
    };
    this.shares.push(newPost);
    return newPost;
  }

  update(id: number, data: any) {
    const index = this.shares.findIndex(item => item.id === id);
    if (index === -1) return null;
    this.shares[index] = { ...this.shares[index], ...data };
    return this.shares[index];
  }

  remove(id: number) {
    const index = this.shares.findIndex(item => item.id === id);
    if (index === -1) return null;
    const deleted = this.shares.splice(index, 1);
    return deleted[0];
  }
}
