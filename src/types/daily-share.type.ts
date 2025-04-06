export interface DailyShareUser {
    name: string;
    avatarUrl: string;
    userType: string;
    timeAgo: string;
  }
  
  export interface DailyShareEmojis {
    heart: number;
    like: number;
    pray: number;
    sad: number;
    celebrate: number;
  }
  
  export interface DailyShareItem {
    id: number;
    content: string;
    user: DailyShareUser;
    emojis: DailyShareEmojis;
  }
  