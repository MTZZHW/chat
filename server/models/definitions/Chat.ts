import { Column, DataType, ForeignKey, Index, Table } from 'sequelize-typescript';
import type { ChatCompletionRequestMessage } from 'openai';
import BaseModel from './BaseModel';
import { User } from './User';

@Table({
  tableName: 'chats',
})
export class Chat extends BaseModel {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    comment: 'id',
  })
  public id!: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    comment: '聊天记录',
  })
  public messages!: ChatCompletionRequestMessage[];

  @Index
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false, comment: 'message关联的用户id' })
  public userId!: string;
}
