import type { NextApiRequest, NextApiResponse } from 'next';
import type { Chat } from '@prisma/client';
import type { ResponseType } from '../../../../../services/@types';
import { ChatDao } from '../../../../../server/dao';

export type ChatsFetchRequestBody = Omit<Chat, 'id' | 'messages' | 'createdAt' | 'updatedAt' | 'label' | 'userId'> & Record<'userId', string>;

export type ChatsFetchResponseBody = Omit<Chat, 'userId' | 'messages'>[];

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  switch (req.method) {
    case 'GET':
      fetchHandler(req, res);
      return;
    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      return;
  }
};

const fetchHandler = async (req: NextApiRequest, res: NextApiResponse<ResponseType<ChatsFetchResponseBody>>): Promise<void> => {
  const { userId } = req.query as unknown as ChatsFetchRequestBody;

  try {
    const chats = await ChatDao.findAll({
      where: { userId: parseInt(userId) },
    });

    res.status(200).json({ success: true, message: 'Success', data: chats });
  } catch (error) {
    res.status(200).json({ success: false, message: (error as Error).message });
  }
};

export default handler;
