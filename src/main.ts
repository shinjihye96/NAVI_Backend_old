import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Swagger 설정
  const config = new DocumentBuilder() // 문서 정보 세팅팅
    .setTitle('하루공유 API')
    .setDescription('하루공유, 모아보기 API 문서입니다.')
    .setVersion('1.0')
    .addTag('DailyShare') // 컨트롤러에서 붙인 @ApiTags()와 맞춤
    .build();

  const document = SwaggerModule.createDocument(app, config); // 실제 문서 생성성
  SwaggerModule.setup('api-docs', app, document); // api-docs로 문서 열기기

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
