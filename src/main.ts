import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  await app.listen(configService.get<number>('PORT') ?? 4000);
}
bootstrap();
