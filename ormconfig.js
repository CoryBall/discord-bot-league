module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: ['{src,dist}/models/entities/**.entity.{ts,js}'],
  logging: process.env.NODE_ENV !== 'production',
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['{src,dist}/migrations/*.{ts,js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
