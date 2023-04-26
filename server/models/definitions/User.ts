import { Column, DataType, Table } from 'sequelize-typescript';
import BaseModel from './BaseModel';

@Table({
  tableName: 'users',
})
export class User extends BaseModel {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    comment: 'id',
  })
  public id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名',
  })
  public username!: string;
}
