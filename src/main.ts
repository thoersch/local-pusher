import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import WildcardsIoAdapter from './wildcards-io-adapter.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WildcardsIoAdapter(app));
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
