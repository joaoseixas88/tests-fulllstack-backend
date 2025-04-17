import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('credentials')
  @HttpCode(200)
  login(@Req() req: { user: { id: string; email: string; name: string } }) {
    return this.authService.login(req.user);
  }
}
