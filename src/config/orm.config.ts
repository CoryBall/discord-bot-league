import { Service } from 'typedi';
import { MikroORM } from '@mikro-orm/core';

@Service()
class OrmConfig {
  connection: Parameters<typeof MikroORM.init>[0];

  constructor() {
    this.connection = {
      migrations: {
        path: './src/migrations',
        tableName: 'migrations',
        transactional: true,
      },
      tsNode: process.env.NODE_ENV === 'true',
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    };
  }
}
