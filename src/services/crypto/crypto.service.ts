import { Inject, Injectable } from '@nestjs/common';
import { hash, compare as bcryptCompare } from 'bcrypt';
import { CRYPTO_SALT } from 'src/services/crypto/crypto.constants';

@Injectable()
export class CryptoService {
  constructor(@Inject(CRYPTO_SALT) private readonly salt: number) {}
  encrypt(plainText: string): Promise<string> {
    return hash(plainText, this.salt);
  }
  compare(plainText: string, hash: string): Promise<boolean> {
    return bcryptCompare(plainText, hash);
  }
}
