import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt';
import { CryptoModule } from 'src/services/crypto/crypto.module';
import { LocalStrategy } from 'src/auth/strategies/local';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    CryptoModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
