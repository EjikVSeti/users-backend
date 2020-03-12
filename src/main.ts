import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setupSwagger } from './common/configurations/swagger';
import { setupApp } from './common/configurations/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupApp(app);
  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
