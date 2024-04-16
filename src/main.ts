import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { json } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.use(json({ limit: '30gb' }));

  const port = configService.get<number>('PORT');
  await app.listen(port);
  console.log(`API Started in port ${port}`);
}
bootstrap();
