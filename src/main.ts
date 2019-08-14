import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { MyLogger } from './common/loggers/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置路由前缀
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3001);
}
bootstrap();
