/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // Handlebars
  app.setViewEngine('hbs');
  hbs.registerHelper('multiply', (a, b) => {
    return a * b;
  });

  // const configService = app.get(ConfigService);
  const port = process.env.APP_PORT;
  await app.listen(port);
}

bootstrap();
