import { Module } from '@nestjs/common';
import { DailyShareController } from './daily-share.controller';
import { DailyShareService } from './daily-share.service';

@Module({
  controllers: [DailyShareController],
  providers: [DailyShareService],
})
export class DailyShareModule {}
