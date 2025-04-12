import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DailyShareService } from './daily-share/daily-share.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Seed 실행
  const dailyShareService = app.get(DailyShareService);
  await dailyShareService.seedMockData(); // ← 이거 꼭 필요함!

  // ✅ CORS 설정
  app.enableCors({
    origin: ['http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
