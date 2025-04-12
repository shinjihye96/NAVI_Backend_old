import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyShare } from './daily-share.entity';
import { DailyShareService } from './daily-share.service';
import { DailyShareController } from './daily-share.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DailyShare])],
  providers: [DailyShareService],
  controllers: [DailyShareController],
  exports: [DailyShareService], // 하루공유 임시 데이터
})
export class DailyShareModule {}
