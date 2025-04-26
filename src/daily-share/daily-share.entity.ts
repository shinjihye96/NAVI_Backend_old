import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class DailyShare {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  moodStep: number; // 오늘의 기분 (1~5단계)

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
  emojis: {
    heart: { icon: string; count: number };
    like: { icon: string; count: number };
    pray: { icon: string; count: number };
    sad: { icon: string; count: number };
    celebrate: { icon: string; count: number };
  };

  @Column({ default: false })
  isFollowed: boolean;
}
