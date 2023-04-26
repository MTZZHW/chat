import type { FindOptions } from 'sequelize';
import { ValidationError } from 'sequelize';
import { User, accessPreOperation } from '../models';
import type { ModelData } from '../models/definitions/BaseModel';

export class UserDao {
  public static async findAll(ignoreAccessPreOperation: boolean): Promise<ModelData<User>[]> {
    return await accessPreOperation<ModelData<User>[]>(ignoreAccessPreOperation, async () => {
      try {
        const rawData = await User.findAll();
        const data = rawData.map((rawDataItem) => rawDataItem.toJSON());

        return data;
      } catch (error) {
        throw new Error(`${error}`);
      }
    });
  }

  public static async findOne(ignoreAccessPreOperation: boolean, options: FindOptions): Promise<ModelData<User>> {
    return await accessPreOperation<ModelData<User>>(ignoreAccessPreOperation, async () => {
      try {
        const rawData = await User.findOne({ ...options });

        if (!rawData) {
          throw Error('Not Found');
        }

        const data = rawData.toJSON();

        return data;
      } catch (error) {
        throw new Error(`${error}`);
      }
    });
  }

  public static async create(ignoreAccessPreOperation: boolean, values: ModelData<User>): Promise<void> {
    await accessPreOperation<User>(ignoreAccessPreOperation, async () => {
      try {
        return await User.create(values);
      } catch (error) {
        if (error instanceof ValidationError) {
          const { message, errors } = error as ValidationError;
          throw new Error(`Error: ${message}, ${errors[0].message}`);
        }

        throw new Error(`${error}`);
      }
    });
  }
}
