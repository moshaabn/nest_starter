import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { I18nMiddleware } from './infrastructures/middlewares/i18n-middleware';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('NestJS Project API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('nestjs')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.use((req, res, next) => new I18nMiddleware().use(req, res, next));

  await app.listen(3000);
}
bootstrap();
