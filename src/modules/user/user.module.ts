import { Module } from '@nestjs/common';
import { CryptoModule } from 'src/services/crypto/crypto.module';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    PrismaModule,
    CryptoModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [UserService],
})
export class UserModule {}
