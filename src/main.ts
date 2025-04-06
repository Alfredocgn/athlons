import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const logger = new Logger('Bootstrap');
  await app.listen(process.env.PORT ?? 3000);

  logger.log(`Server running on port ${process.env.PORT}`);
  logger.log(
    `GraphQL Playground: http://localhost:${process.env.PORT ?? 3000}/graphql`,
  );
}
bootstrap();
