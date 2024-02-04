import {
  AutoIncrement,
  PrimaryKey,
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'user',
})
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;
}
