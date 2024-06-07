import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());

  setupSwagger(app);

  await app.listen(port, () =>
    console.log(`Server started on the port: ${port}`),
  );

  app.enableShutdownHooks();
}

bootstrap();
