import { Model, Table } from 'sequelize-typescript';

export type ModelData<T extends Model<T>> = Omit<
  T,
  | '$add'
  | '$count'
  | '$create'
  | '$get'
  | '$has'
  | '$remove'
  | '$set'
  | '_attributes'
  | '_creationAttributes'
  | '_model'
  | 'addHook'
  | 'changed'
  | 'dataValues'
  | 'decrement'
  | 'deletedAt'
  | 'destroy'
  | 'equals'
  | 'equalsOneOf'
  | 'get'
  | 'getDataValue'
  | 'hasHook'
  | 'hasHooks'
  | 'increment'
  | 'isNewRecord'
  | 'isSoftDeleted'
  | 'previous'
  | 'reload'
  | 'removeHook'
  | 'restore'
  | 'save'
  | 'sequelize'
  | 'set'
  | 'setAttributes'
  | 'setDataValue'
  | 'toJSON'
  | 'update'
  | 'validate'
  | 'version'
  | 'where'
>;

@Table({
  timestamps: true,
})
export default class BaseModel extends Model {
  toJSON(): ModelData<this> {
    return super.toJSON<ModelData<this>>();
  }
}
