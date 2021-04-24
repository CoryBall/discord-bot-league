import { MikroORM } from '@mikro-orm/core';

const OrmConfig: Parameters<typeof MikroORM.init>[0] = {
  migrations: {
    tableName: 'migrations',
    path: './src/migrations',
  },
  tsNode: process.env.NODE_ENV === 'true',
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  type: 'postgresql',
};

export default OrmConfig;
