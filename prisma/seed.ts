import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'test@gmail.com',
      name: 'test',
      password: hashSync('1234', 10),
    },
  });
  await prisma.product.createMany({
    data: [
      {
        name: 'Product 1',
        price: 100,
      },
      {
        name: 'Product 2',
        price: 50,
      },
    ],
  });
}

main();
