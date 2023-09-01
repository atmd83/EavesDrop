import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { PassportModule } from '@nestjs/passport';

import { BlacklistService } from './blacklist.service';
import { BlacklistController } from './blacklist.controller';

import {Entry} from "../common/entities/entry.entity";
import {Auth} from "../common/auth";

@Module({
  imports: [
    PassportModule, TypeOrmModule.forFeature([Entry])
  ],
  providers: [Auth, BlacklistService],
  controllers: [BlacklistController]
})
export class BlacklistModule {}
