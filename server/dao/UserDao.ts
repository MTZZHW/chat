import type { User } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import prisma from '../../lib/prisma';

export class UserDao {
  public static async findAll(): Promise<User[]> {
    try {
      const data = await prisma.user.findMany();

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async findOne(options: Prisma.UserFindUniqueArgs): Promise<User> {
    try {
      const data = await prisma.user.findUnique(options);

      if (!data) {
        throw Error('Not Found');
      }

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async create(values: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>): Promise<void> {
    try {
      await prisma.user.create({ data: values });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
