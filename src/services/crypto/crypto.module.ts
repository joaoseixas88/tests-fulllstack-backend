import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CRYPTO_SALT } from 'src/services/crypto/crypto.constants';

@Module({
  providers: [
    {
      provide: CRYPTO_SALT,
      useValue: 10,
    },
    {
      provide: CryptoService,
      useFactory: (salt: number) => new CryptoService(salt),
      inject: [CRYPTO_SALT],
    },
  ],
  exports: [CryptoService],
})
export class CryptoModule {}
