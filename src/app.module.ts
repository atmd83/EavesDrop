import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule} from "@nestjs/typeorm";

import { AppController } from './app.controller';
import { BlacklistModule } from './blacklist/blacklist.module';
import { ListenerModule } from './listener/listener.module';
import {ListenerService} from "./listener/listener.service";
import {Transaction} from "./common/entities/transaction.entity";
import {Entry} from "./common/entities/entry.entity";
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Transaction, Entry],
      synchronize: true
    }),
    BlacklistModule,
    ListenerModule,
    ApiModule
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(private readonly service: ListenerService){
    service.start();
  }
}
