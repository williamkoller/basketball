import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { swaggerConfig } from '@/docs/swagger-config';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  swaggerConfig(app);
  await app.listen(process.env.PORT, () => logger.log(`App running 🔥`));
}
bootstrap();
