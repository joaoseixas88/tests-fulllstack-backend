import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'radash';
import { User } from 'src/modules/user/model';
import { UserService } from 'src/modules/user/user.service';
import { CryptoService } from 'src/services/crypto/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly crypto: CryptoService,
  ) {}
  generateToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;
    const passwordMatches = await this.crypto.compare(
      password,
      user.password ?? '',
    );
    if (!passwordMatches) {
      throw new UnauthorizedException();
    }
    return omit(user, ['password']);
  }

  login(user: { id: string; email: string; name: string }) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email: user.email,
        name: user.name,
      },
    };
  }
}
