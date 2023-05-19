import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() data: authDto): Promise<string> {
    if (data.password !== data.confirmPassword) {
      return 'Password or Confirm Password do not match';
      // throw new Error('Password or Confirm Password do not match');
    }
    return this.authService.register(data);
  }
  @Post('login')
  async login(@Body() data: authDto): Promise<string> {
    return this.authService.signIn(data);
  }
}
