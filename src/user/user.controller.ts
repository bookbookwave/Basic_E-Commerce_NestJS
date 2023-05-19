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
import { UserDto } from './user.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createUser')
  createUser(@Body() input: UserDto) {
    return this.userService.createUser(input);
  }
  @Post('deleteUser')
  async deleteUser(@Body() id: string) {
    return await this.userService.deleteUser(id);
  }
  // @UseGuards(AuthGuard)
  @Get(':email')
  async getUserByEmail(
    @Param('email') email: any,
    @Req() req: Request,
    @Body() input: Record<string, any>,
  ) {
    console.log('token :>> ', req['token']);
    console.log('input :>> ', input);
    return await this.userService.findUserByEmail(email.email);
  }
  @Get('profile/:email')
  async getProfile(@Param('email') email: string) {
    return await this.userService.findProfile(email);
  }
}
