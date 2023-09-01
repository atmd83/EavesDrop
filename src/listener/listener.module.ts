import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import { ListenerService } from './listener.service';
import {Transaction} from "../common/entities/transaction.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction])
  ],
  providers: [ListenerService],
  exports: [ListenerService]
})
export class ListenerModule {}
