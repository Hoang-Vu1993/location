import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'location_tree',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  }
);
