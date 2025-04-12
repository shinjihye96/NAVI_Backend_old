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
    heart: number;
    like: number;
    pray: number;
    sad: number;
    celebrate: number;
  };
}
