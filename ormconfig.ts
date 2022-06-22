import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export const typeormConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  synchronize: false,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/src/bd/migrations/*.js'],
  migrationsRun: true,
};
