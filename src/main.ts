import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalAuthGuard } from 'src/auth/guards/global-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const reflector = app.get(Reflector);
  const jwtGuard = app.get(JwtAuthGuard);
  app.useGlobalGuards(new GlobalAuthGuard(reflector, jwtGuard));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
