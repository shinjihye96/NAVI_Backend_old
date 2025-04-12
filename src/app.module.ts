import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DailyShareModule } from './daily-share/daily-share.module';
import { DailyShare } from './daily-share/daily-share.entity';

@Module({
  imports: [
    // ✅ TypeORM + SQLite 설정
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'local-dev.sqlite',
      entities: [DailyShare,], // ✅ 모든 Entity 등록
      synchronize: true,            // 개발 시 자동 테이블 생성
    }),

    // ✅ 각 기능 모듈 등록
    DailyShareModule,
  ],
})
export class AppModule {}
