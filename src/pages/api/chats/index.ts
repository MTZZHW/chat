import type { NextApiRequest, NextApiResponse } from 'next';
import type { Chat } from '@prisma/client';
import { ChatDao } from '../../../../server/dao';
import type { ResponseType } from '../../../../services/@types';

export type ChatsCreateRequestBody = Omit<Chat, 'id' | 'createdAt' | 'updatedAt' | 'label' | 'userId'> & Record<'userId', string>;

export type ChatsCreateResponseBody = Omit<Chat, 'userId' | 'messages'>;

export type ChatsUpdateRequestBody = Omit<Chat, 'userId' | 'createdAt' | 'updatedAt' | 'label'>;

export type ChatsUpdateResponseBody = undefined;

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  switch (req.method) {
    case 'POST':
      postHandler(req, res);
      return;
    case 'PUT':
      putHandler(req, res);
      return;
    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      return;
  }
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse<ResponseType<ChatsCreateResponseBody>>): Promise<void> => {
  const { userId, messages } = req.body as ChatsCreateRequestBody;

  try {
    const chat = await ChatDao.create({ userId: parseInt(userId), messages, label: messages[0].content.substring(0, 20) });

    res.status(200).json({ success: true, message: 'Success', data: chat });
  } catch (error) {
    res.status(200).json({ success: false, message: (error as Error).message });
  }
};

const putHandler = async (req: NextApiRequest, res: NextApiResponse<ResponseType<ChatsUpdateResponseBody>>): Promise<void> => {
  const { id, messages } = req.body as ChatsUpdateRequestBody;

  try {
    await ChatDao.update({ messages }, { where: { id } });

    res.status(200).json({ success: true, message: 'Success' });
  } catch (error) {
    res.status(200).json({ success: false, message: (error as Error).message });
  }
};

export default handler;
