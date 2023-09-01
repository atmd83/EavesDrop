import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

import {Entry} from "../common/entities/entry.entity";
import {EntryDto} from "./dto/entry";

@Injectable()
export class BlacklistService {
    constructor(
        @InjectRepository(Entry)
        private repository: Repository<Entry>,
    ) {}

    async getBlacklist() {
        return await this.repository.find();
    }

    async createEntry(body: EntryDto) {
        const { address } = body;

        const entry = new Entry();
        entry.address = address;
        return this.repository.save(entry)
    }

    async removeEntry(id: number) {
        return this.repository.delete({ id });
    }
}
