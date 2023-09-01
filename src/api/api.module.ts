import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Transaction} from "../common/entities/transaction.entity";
import {Entry} from "../common/entities/entry.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Entry])
  ],
  providers: [ApiService],
  controllers: [ApiController]
})
export class ApiModule {}
