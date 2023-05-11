import type { NextApiRequest, NextApiResponse } from 'next';
import type { Chat } from '@prisma/client';
import { ChatDao } from '../../../../server/dao';
import type { ResponseType } from '../../../../services/@types';
import type { MessageType } from '../../../../types/chat';
import services from '../../../../services';

export type ChatsCreateRequestBody = Omit<Chat, 'id' | 'createdAt' | 'updatedAt' | 'label' | 'userId'> & Record<'userId', string>;

export type ChatsCreateResponseBody = Omit<Chat, 'userId'>;

export type ChatsUpdateRequestBody = Omit<Chat, 'messages' | 'userId' | 'createdAt' | 'updatedAt' | 'label'> & {
  messages?: MessageType[];
  label?: string;
};

export type ChatsUpdateResponseBody = Omit<Chat, 'userId'>;

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

  let newMessages: MessageType[];

  try {
    newMessages = await services.invokeOpenai(messages);
  } catch (error) {
    res.status(200).json({ success: false, message: (error as Error).message });
    return;
  }

  try {
    const chat = await ChatDao.create({
      userId: parseInt(userId),
      messages: newMessages,
      label: messages[0].content.substring(0, 20),
    });

    res.status(200).json({ success: true, message: 'Success', data: chat });
  } catch (error) {
    res.status(200).json({ success: false, message: (error as Error).message });
  }
};

const putHandler = async (req: NextApiRequest, res: NextApiResponse<ResponseType<ChatsUpdateResponseBody>>): Promise<void> => {
  const { id, messages, label } = req.body as ChatsUpdateRequestBody;

  if (label) {
    try {
      const chat = await ChatDao.update({ label }, { where: { id } });

      res.status(200).json({ success: true, message: 'Success', data: chat });
    } catch (error) {
      res.status(200).json({ success: false, message: (error as Error).message });
    }
  }

  if (messages) {
    let newMessages: MessageType[];

    try {
      newMessages = await services.invokeOpenai(messages);
    } catch (error) {
      res.status(200).json({ success: false, message: (error as Error).message });
      return;
    }

    try {
      const chat = await ChatDao.update({ messages: newMessages }, { where: { id } });

      res.status(200).json({ success: true, message: 'Success', data: chat });
    } catch (error) {
      res.status(200).json({ success: false, message: (error as Error).message });
    }
  }
};

export default handler;
