import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyShare } from './daily-share.entity';
import { DailyShareController } from './daily-share.controller';
import { DailyShareService } from './daily-share.service';

@Module({
  imports: [TypeOrmModule.forFeature([DailyShare])],
  controllers: [DailyShareController],
  providers: [DailyShareService],
  exports: [DailyShareService], // seed나 main.ts에서 사용할 수도 있으니 export 추가
})
export class DailyShareModule {}
