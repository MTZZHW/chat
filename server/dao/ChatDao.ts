import type { Prisma } from '@prisma/client';
import type { Chat } from '@prisma/client';
import prisma from '../../lib/prisma';

export class ChatDao {
  public static async findAll(options: Prisma.ChatFindManyArgs): Promise<Omit<Chat, 'userId' | 'messages'>[]> {
    try {
      const data = await prisma.chat.findMany({
        select: {
          id: true,
          messages: false,
          userId: false,
          createdAt: true,
          updatedAt: true,
        },
        ...options,
      });

      return data as Omit<Chat, 'userId' | 'messages'>[];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async findOneRaw(options: Prisma.ChatFindUniqueArgs): Promise<Omit<Chat, 'userId'>> {
    try {
      const data = await prisma.chat.findUnique({
        select: {
          id: true,
          messages: true,
          userId: false,
          createdAt: true,
          updatedAt: true,
        },
        ...options,
      });

      if (!data) {
        throw Error('Not Found');
      }

      return data as Omit<Chat, 'userId'>;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async create(values: Prisma.XOR<Prisma.ChatCreateInput, Prisma.ChatUncheckedCreateInput>): Promise<Chat> {
    try {
      const data = await prisma.chat.create({ data: values });

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async update(
    values: Prisma.XOR<Prisma.ChatUpdateInput, Prisma.ChatUncheckedUpdateInput>,
    options: Omit<Prisma.ChatUpdateArgs, 'data'>
  ): Promise<void> {
    try {
      await prisma.chat.update({ data: values, ...options });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
