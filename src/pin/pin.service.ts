import { Injectable } from '@nestjs/common';

@Injectable()
export class PinService {
  checkPin = async (pin: string): Promise<any> => {
    try {
      if (pin.length < 6 || pin.length > 6) {
        return 'Pin must be 6 digits';
      }

      // Check same number more than 2 times // as 111111 like birthday 111143 mean 11/11/43
      for (let i = 0; i < pin.length - 2; i++) {
        if (pin[i] === pin[i + 1] && pin[i + 1] === pin[i + 2]) {
          return 'Same number more than 2 times';
        }
      }

      //Check sequential numbers more than 2 times // as 123456
      for (let i = 0; i < pin.length - 2; i++) {
        if (
          parseInt(pin[i]) + 1 === parseInt(pin[i + 1]) &&
          parseInt(pin[i + 1]) + 1 === parseInt(pin[i + 2])
        ) {
          return 'Sequential numbers more than 2 times';
        }
      }

      // Check Twin Number or Pair of Number more than 2 times
      const counts = {};

      for (let i = 0; i < pin.length; i++) {
        const digit = pin[i];
        // console.log('digit :>> ', digit);
        // console.log('counts[digit] :>> ', counts[digit], 'Round :>> ', i);

        // counts[digit] ? counts[digit]++ : (counts[digit] = 1);

        if (counts[digit]) {
          counts[digit]++;
        } else {
          counts[digit] = 1;
        }
        // console.log('counts :>> ', counts);
      }

      let stack = 0;
      for (const digit in counts) {
        // console.log('count :>> ', counts[digit]);
        if (counts[digit] === 2) {
          stack += 1;
        }
        if (stack > 2) {
          return 'Twin Number or Pair of Number more than 2 times';
        }
      }

      return 'Pin Can Be Use';
    } catch (error) {
      throw new Error(error);
    }
  };
}
