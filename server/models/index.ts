import { Sequelize } from 'sequelize-typescript';
import config from '../config';
import { User } from './definitions/User';
import { Chat } from './definitions/Chat';

export { User, Chat };

export let sequelize: Sequelize | null = null;

const loadSequelize: () => Promise<Sequelize> = async () => {
  const sequelize = new Sequelize({
    host: config.DATABASE_HOST,
    database: config.DATABASE_NAME,
    username: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    logging: false,
    pool: {
      max: 2,
      min: 0,
      idle: 0,
      acquire: 3000,
      evict: 10000,
    },
  });

  sequelize.addModels([User, Chat]);

  await sequelize.sync();

  await sequelize.authenticate();

  return sequelize;
};

export async function accessPreOperation<T>(ignore: boolean, fn: () => Promise<T>): Promise<T> {
  if (ignore) {
    if (!sequelize) {
      sequelize = await loadSequelize();
    }

    return fn();
  }
  if (!sequelize) {
    sequelize = await loadSequelize();
  } else {
    sequelize.connectionManager.initPools();

    if (sequelize.connectionManager.hasOwnProperty('getConnection')) {
      // @ts-ignore
      delete sequelize.connectionManager.getConnection;
    }
  }

  try {
    return await fn();
  } finally {
    await sequelize.connectionManager.close();
  }
}
