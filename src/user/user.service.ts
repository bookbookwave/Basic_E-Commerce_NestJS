import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { hashSync, compareSync } from 'bcryptjs';
import { User } from '@prisma/client';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

  createUser = async (Input: UserDto) => {
    try {
      const user = await this.db.user.create({
        data: {
          email: Input.email,
          password: hashSync(Input.password, 10),
          name: Input.name,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteUser = async (id: string): Promise<boolean> => {
    try {
      const user = await this.db.user.delete({ where: { id: id } });
      if (!user) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(error);
    }
  };

  validatePassword = async (password: any, password1: any) => {
    try {
      return compareSync(password, password1);
    } catch (error) {
      throw new Error(error);
    }
  };

  findUserByEmail = async (email: any): Promise<User> => {
    try {
      return await this.db.user.findUnique({ where: { email: email } });
    } catch (error) {
      throw new Error(error);
    }
  };
  findProfile = async (email: string): Promise<any> => {
    try {
      const user = await this.db.user.findUnique({
        where: { email: email },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      const orderHistory = await this.db.order.findMany({
        where: { userId: user.id },
        include: { OrderItem: true },
      });
      return { user, orderHistory };
    } catch (error) {
      throw new Error(error);
    }
  };
}
