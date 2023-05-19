import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly db: PrismaService,
    private readonly userService: UserService,
  ) {}

  private SignToken(Payload: JwtPayload) {
    return this.jwt.signAsync(Payload);
  }

  signIn = async (data: any): Promise<string> => {
    const user = await this.userService.findUserByEmail(data.email);
    if (!user) {
      return 'User not found';
      throw new Error('User not found');
    }
    const valid = await this.userService.validatePassword(
      data.password,
      user.password,
    );
    if (!valid) {
      throw new Error('Invalid password');
    }
    return await this.SignToken({ id: user.id, email: user.email });
  };

  register = async (data: any): Promise<string> => {
    const user = await this.userService.createUser(data);
    if (!user) {
      throw new Error('User already exists');
    }
    return await this.jwt.sign({ sub: user.id, email: user.email });
  };
}
