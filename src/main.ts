import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS 설정정
  app.enableCors({
    origin: ['http://localhost:3001'], // 프론트엔드 주소만 허용
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
