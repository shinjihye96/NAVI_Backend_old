import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DailyShareModule } from './daily-share/daily-share.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DailyShare } from './daily-share/daily-share.entity';

@Module({
  imports: [
    // ✅ TypeORM + SQLite 설정
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(process.cwd(), 'local-dev.sqlite'),
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')], // 모든 entity 등록
      synchronize: true, // 개발 시 자동 테이블 생성
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),  // 실제 파일 시스템 경로
      serveRoot: '/static',                       // API 대신 /static/… 로 접근
    }),

    // ✅ 각 기능 모듈 등록
    DailyShareModule,
  ],
})
export class AppModule {}
