import type { Prisma } from '@prisma/client';
import type { Chat } from '@prisma/client';
import prisma from '../../lib/prisma';

export class ChatDao {
  public static async findAll(options: Prisma.ChatFindManyArgs): Promise<Omit<Chat, 'id' | 'userId' | 'messages' | 'createdAt' | 'updatedAt'>[]> {
    try {
      const data = await prisma.chat.findMany({
        select: {
          id: false,
          uid: true,
          messages: false,
          label: true,
          userId: false,
          createdAt: false,
          updatedAt: false,
        },
        orderBy: {
          id: 'desc',
        },
        ...options,
      });

      return data as Omit<Chat, 'userId' | 'messages'>[];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async findOneRaw(options: Prisma.ChatFindUniqueArgs): Promise<Omit<Chat, 'id' | 'userId' | 'createdAt' | 'updatedAt'>> {
    try {
      const data = await prisma.chat.findUnique({
        select: {
          id: false,
          uid: true,
          messages: true,
          label: true,
          userId: false,
          createdAt: false,
          updatedAt: false,
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
  ): Promise<Chat> {
    try {
      const data = await prisma.chat.update({ data: values, ...options });

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public static async delete(options: Prisma.ChatDeleteArgs): Promise<void> {
    try {
      await prisma.chat.delete({ ...options });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
