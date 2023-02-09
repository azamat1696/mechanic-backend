/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// import * as hbs from 'hbs';
import 'dotenv/config';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // Handlebars
  app.setViewEngine('hbs');
  // hbs.registerHelper('multiply', (a, b) => {
  //   return a * b;
  // });

  const port = process.env.PORT || 8000;
  console.log('PORT', port);
  await app.listen(port);
  const url = await app.getUrl();
  if (url) {
    console.log(`Application is running on: ${url}`);
  }
}

bootstrap();
