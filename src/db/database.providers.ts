/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'eu-cdbr-west-03.cleardb.net',
        port: 3306,
        username: 'b2e12e90f2e7f2',
        password: '730e5b61',
        database: 'heroku_cc0f249cbafec76',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: true,
        extra: {
          ssl: true,
          rejectUnauthorized: false,
        },
      });

      return dataSource.initialize();
    },
  },
];
