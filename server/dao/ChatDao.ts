import type { FindOptions, UpdateOptions } from 'sequelize';
import { ValidationError } from 'sequelize';
import { Chat, accessPreOperation } from '../models';
import type { ModelData } from '../models/definitions/BaseModel';

export class ChatDao {
  public static async findAll(ignoreAccessPreOperation: boolean, options: FindOptions): Promise<ModelData<Chat>[]> {
    return await accessPreOperation<ModelData<Chat>[]>(ignoreAccessPreOperation, async () => {
      try {
        const rawData = await Chat.findAll({
          attributes: {
            exclude: ['messages', 'userId'],
          },
          ...options,
        });
        const data = rawData.map((rawDataItem) => rawDataItem.toJSON());

        return data;
      } catch (error) {
        throw new Error(`${error}`);
      }
    });
  }

  public static async findOneRaw(ignoreAccessPreOperation: boolean, options: FindOptions): Promise<ModelData<Chat>> {
    return await accessPreOperation<ModelData<Chat>>(ignoreAccessPreOperation, async () => {
      try {
        const rawData = await Chat.findOne({
          attributes: {
            exclude: ['userId'],
          },
          ...options,
        });

        if (!rawData) {
          throw Error('Not Found');
        }

        return rawData.toJSON();
      } catch (error) {
        throw new Error(`${error}`);
      }
    });
  }

  public static async create(ignoreAccessPreOperation: boolean, values: ModelData<Chat>): Promise<Chat> {
    return await accessPreOperation<Chat>(ignoreAccessPreOperation, async () => {
      try {
        return await Chat.create(values);
      } catch (error) {
        if (error instanceof ValidationError) {
          const { message, errors } = error as ValidationError;
          throw new Error(`Error: ${message}, ${errors[0].message}`);
        }

        throw new Error(`${error}`);
      }
    });
  }

  public static async update(
    ignoreAccessPreOperation: boolean,
    values: Omit<ModelData<Chat>, 'id' | 'userId'>,
    options: UpdateOptions<ModelData<Chat>>
  ): Promise<void> {
    return await accessPreOperation<void>(ignoreAccessPreOperation, async () => {
      try {
        await Chat.update(values, options);
      } catch (error) {
        throw new Error(`${error}`);
      }
    });
  }
}
