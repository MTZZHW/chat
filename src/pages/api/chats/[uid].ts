import type { NextApiRequest, NextApiResponse } from 'next';
import type { Chat } from '@prisma/client';
import type { ResponseType } from '../../../../services/@types';
import { ChatDao } from '../../../../server/dao';

export type ChatsDetailFetchRequestBody = Omit<Chat, 'id' | 'userId' | 'messages' | 'createdAt' | 'updatedAt' | 'label'>;

export type ChatsDetailFetchResponseBody = Omit<Chat, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;

export type ChatsDeleteRequestBody = Omit<Chat, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'messages' | 'label'>;

export type ChatsDeleteResponseBody = undefined;

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  switch (req.method) {
    case 'GET':
      fetchHandler(req, res);
      return;
    case 'DELETE':
      deleteHandler(req, res);
      return;
    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      return;
  }
};

const fetchHandler = async (req: NextApiRequest, res: NextApiResponse<ResponseType<ChatsDetailFetchResponseBody>>): Promise<void> => {
  const { uid } = req.query as ChatsDetailFetchRequestBody;

  try {
    const chat = await ChatDao.findOneRaw({
      where: { uid },
    });

    res.status(200).json({ success: true, message: 'Success', data: chat });
  } catch (error) {
    res.status(200).json({ success: false, message: (error as Error).message });
  }
};

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse<ResponseType<ChatsDeleteResponseBody>>): Promise<void> => {
  const { uid } = req.query as ChatsDeleteRequestBody;

  try {
    await ChatDao.delete({
      where: { uid },
    });

    res.status(200).json({ success: true, message: 'Success' });
  } catch (error) {
    res.status(200).json({ success: false, message: (error as Error).message });
  }
};

export default handler;
