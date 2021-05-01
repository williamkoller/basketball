import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { swaggerConfig } from '@/docs/swagger-config';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { ModelNotFoundException } from '@/common/filters/model-not-found.exception.filter';

const key = 'fetch';

global[key] = require('node-fetch');

declare const module: any;

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new ModelNotFoundException());
  swaggerConfig(app);
  await app.listen(process.env.PORT, () => logger.log(`App running 🔥`));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
