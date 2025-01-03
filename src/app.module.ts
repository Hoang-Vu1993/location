import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './location/location.module';
import { Location } from './location/location.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'location_tree',
      entities: [Location],
      migrationsRun: true,
      synchronize: true,
    }),
    LocationModule,
  ],
})
export class AppModule {}
