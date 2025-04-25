import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyShare } from './daily-share.entity';
import { CreateDailyShareDto } from './dto/create-daily-share.dto';
import { UpdateDailyShareDto } from './dto/update-daily-share.dto';

@Injectable()
export class DailyShareService {
  constructor(
    @InjectRepository(DailyShare)
    private readonly shareRepo: Repository<DailyShare>,
  ) {}

  findAll(): Promise<DailyShare[]> {
    return this.shareRepo.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: number): Promise<DailyShare | null> {
    return this.shareRepo.findOne({ where: { id } });
  }

  create(data: CreateDailyShareDto): Promise<DailyShare> {
    const newShare = this.shareRepo.create({
      ...data,
      user: {
        id: 1,
        name: '지혜',
        profileImage: '',
        userType: '환자',
      },
      emojis: {
        heart: { icon: '💚', count: 0 },
        like: { icon: '👍', count: 0 },
        pray: { icon: '🙏', count: 0 },
        sad: { icon: '😢', count: 0 },
        celebrate: { icon: '🎉', count: 0 },
      },
      isFollowed: false,
    });

    return this.shareRepo.save(newShare);
  }

  async update(id: number, data: UpdateDailyShareDto): Promise<DailyShare | null> {
    const found = await this.shareRepo.findOne({ where: { id } });
    if (!found) return null;

    const updated = this.shareRepo.merge(found, data);
    return this.shareRepo.save(updated);
  }

  async remove(id: number): Promise<DailyShare | null> {
    const found = await this.shareRepo.findOne({ where: { id } });
    if (!found) return null;

    await this.shareRepo.remove(found);
    return found;
  }
}
