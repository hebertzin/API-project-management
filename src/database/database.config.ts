import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { config } from 'dotenv';

config();

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.HOST,
  username: 'postgres',
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  autoLoadModels: true,
  synchronize: true,
};
