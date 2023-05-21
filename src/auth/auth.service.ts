import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { authDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) {}

  private SignToken(Payload: JwtPayload) {
    return this.jwt.signAsync(Payload);
  }

  signIn = async (data: authDto): Promise<string> => {
    try {
      const user = await this.userService.findUserByEmail(data.email);
      if (!user) {
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
    } catch (error) {
      throw new Error(error);
    }
  };

  register = async (data: authDto): Promise<string> => {
    try {
      const hasRegistered = await this.userService.findUserByEmail(data.email);
      if (hasRegistered) {
        throw new Error(`User email : ${data.email} already exists`);
      }
      const user = await this.userService.createUser(data);
      if (!user) {
        throw new Error('User Creation Failed');
      }
      return await this.jwt.sign({ sub: user.id, email: user.email });
    } catch (error) {
      throw new Error(error);
    }
  };
}
