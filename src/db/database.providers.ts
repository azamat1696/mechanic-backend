/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mariadb',
        port: 3306,
        // url: process.env.URL,
        host: process.env.HOST,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        // ssl: true,
        // extra: {
        //   ssl: true,
        //   rejectUnauthorized: false,
        // },
      });

      return dataSource.initialize();
    },
  },
];
