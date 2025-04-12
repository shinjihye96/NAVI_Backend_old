import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DailyShare {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column('simple-json')
  user: {
    name: string;
    avatarUrl: string;
    userType: string;
    timeAgo: string;
  };

  @Column('simple-json')
  emojis: {
    heart: { icon: string; count: number };
    like: { icon: string; count: number };
    pray: { icon: string; count: number };
    sad: { icon: string; count: number };
    celebrate: { icon: string; count: number };
  };
}
