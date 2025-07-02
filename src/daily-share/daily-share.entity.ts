import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { MoodType } from './mood-type.enum';

@Entity()
export class DailyShare {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ // 오늘의 기분 (1~5단계)
    type: 'text',
    enum: MoodType,
  })
  moodStep: MoodType;

  @Column()
  content: string;

  @Column({ nullable: true })
  image?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('simple-json')
  user: {
    id: number;
    name: string;
    profileImage: string;
    userType: '환자' | '보호자';
  };

  @Column('simple-json')
  emojis: { type: string; icon: string; count: number }[]

  @Column({ default: false })
  isFollowed: boolean;
}
