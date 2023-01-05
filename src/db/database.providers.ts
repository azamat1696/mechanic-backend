/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.HOST,
        port: 3306,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      // type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'halil',
      // password: 'H@lilh2o',
      // database: 'mechanic',

      return dataSource.initialize();
    },
  },
];
