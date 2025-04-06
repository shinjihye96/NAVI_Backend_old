import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DailyShareModule } from './daily-share/daily-share.module';

@Module({
  imports: [DailyShareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
