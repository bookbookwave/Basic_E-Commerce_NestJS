import { Controller, Get, Param } from '@nestjs/common';
import { PinService } from './pin.service';

@Controller('pin')
export class PinController {
  constructor(private pinService: PinService) {}

  @Get(':pin')
  checkPin(@Param('pin') pin: any) {
    return this.pinService.checkPin(pin);
  }
}
