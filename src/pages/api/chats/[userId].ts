import type { NextApiRequest, NextApiResponse } from 'next';
import type { ModelData } from '../../../../server/models/definitions/BaseModel';
import type { Chat } from '../../../../server/models';
import type { ResponseType } from '../../../../services/@types';
import { ChatDao } from '../../../../server/dao';

export type ChatsFetchRequestBody = Omit<ModelData<Chat>, 'id' | 'messages'>;

export type ChatsFetchResponseBody = (Omit<ModelData<Chat>, 'userId' | 'messages'> & { label: string })[];

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
  const { userId } = req.query as ChatsFetchRequestBody;

  try {
    const chats = await ChatDao.findAll(false, {
      where: { userId },
    });

    res.status(200).json({ success: true, message: 'Success', data: chats.map((chat) => ({ ...chat, label: chat.id })) });
  } catch (error) {
    res.status(200).json({ success: false, message: (error as Error).message });
  }
};

export default handler;
