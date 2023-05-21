import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('createUser')
  // createUser(@Body() input: UserDto) {
  //   return this.userService.createUser(input);
  // }
  // @UseGuards(AuthGuard)
  // @Get(':email')
  // async getUserByEmail(
  //   @Param('email') email: any,
  //   @Req() req: Request,
  //   @Body() input: Record<string, any>,
  // ) {
  //   console.log('token :>> ', req['token']);
  //   console.log('input :>> ', input);
  //   return await this.userService.findUserByEmail(email.email);
  // }

  @UseGuards(AuthGuard)
  @Post('deleteUser')
  async deleteUser(@Body() id: string) {
    return await this.userService.deleteUser(id);
  }

  @Get('profile/:email')
  async getProfile(@Param('email') email: string) {
    return await this.userService.findProfile(email);
  }
}
