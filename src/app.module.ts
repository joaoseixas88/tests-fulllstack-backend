import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { CryptoModule } from './services/crypto/crypto.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UserModule, CryptoModule, AuthModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
