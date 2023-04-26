import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';
import type { Chat } from '../../../../server/models';
import type { ModelData } from '../../../../server/models/definitions/BaseModel';
import { ChatDao } from '../../../../server/dao';
import type { ResponseType } from '../../../../services/@types';

export type ChatsCreateRequestBody = Omit<ModelData<Chat>, 'id'>;

export type ChatsCreateResponseBody = Omit<ModelData<Chat>, 'userId' | 'messages'>;

export type ChatsUpdateRequestBody = Omit<ModelData<Chat>, 'userId'>;

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
    const chat = await ChatDao.create(false, { id: uuid(), userId, messages });

    res.status(200).json({ success: true, message: 'Success', data: { id: chat.id } });
  } catch (error) {
    res.status(200).json({ success: false, message: (error as Error).message });
  }
};

const putHandler = async (req: NextApiRequest, res: NextApiResponse<ResponseType<ChatsUpdateResponseBody>>): Promise<void> => {
  const { id, messages } = req.body as ChatsUpdateRequestBody;

  try {
    await ChatDao.update(false, { messages }, { where: { id } });

    res.status(200).json({ success: true, message: 'Success' });
  } catch (error) {
    res.status(200).json({ success: false, message: (error as Error).message });
  }
};

export default handler;
