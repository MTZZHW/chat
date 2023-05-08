import type { NextApiRequest, NextApiResponse } from 'next';
import type { Chat } from '@prisma/client';
import type { ResponseType } from '../../../../../services/@types';
import { ChatDao } from '../../../../../server/dao';

export type ChatsDetailFetchRequestBody = Omit<Chat, 'userId' | 'messages' | 'createdAt' | 'updatedAt'>;

export type ChatsDetailFetchResponseBody = Omit<Chat, 'userId'>;

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

const fetchHandler = async (req: NextApiRequest, res: NextApiResponse<ResponseType<ChatsDetailFetchResponseBody>>): Promise<void> => {
  const { id } = req.query as ChatsDetailFetchRequestBody;

  try {
    const chat = await ChatDao.findOneRaw({
      where: { id },
    });

    res.status(200).json({ success: true, message: 'Success', data: chat });
  } catch (error) {
    res.status(200).json({ success: false, message: (error as Error).message });
  }
};

export default handler;
