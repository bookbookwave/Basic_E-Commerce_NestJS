import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { ProductModule } from './product/product.module';
import { TokenMiddleware } from './token.middleware';
import { OrderModule } from './order/order.module';
import { PinModule } from './pin/pin.module';

@Module({
  imports: [AuthModule, UserModule, ProductModule, OrderModule, PinModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('*');
  }
}
