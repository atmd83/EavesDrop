import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Transaction} from "../common/entities/transaction.entity";
import {Entry} from "../common/entities/entry.entity";
import {Repository} from "typeorm";
import {ethers} from "ethers";

@Injectable()
export class ApiService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        @InjectRepository(Entry)
        private entryRepository: Repository<Entry>,
    ) {}

    async getTopTen() {
        const transactionOver24Hours = await this.transactionRepository.createQueryBuilder('transaction')
            .where('transaction.createdAt > :start_at', {
                start_at: new Date(new Date(). getTime() - (24 * 60 * 60 * 1000))
            }).getMany();

        const blacklist = await this.entryRepository.find();
        const badAddresses =  blacklist.map(b => b.address);

        const filteredTransactions = transactionOver24Hours.filter(t => {
            if(badAddresses.includes(t.toAddress) || badAddresses.includes(t.fromAddress)){
                return false;
            }
            return true;
        });

        const sum = {};

        filteredTransactions.map(f => {
            if(sum[f.fromAddress]) {
                const updatedValue = parseFloat(sum[f.fromAddress]) + parseFloat(parseFloat(ethers.formatEther(f.amount)).toFixed(2));
                sum[f.fromAddress] = updatedValue;
            } else {
                sum[f.fromAddress] = parseFloat(parseFloat(ethers.formatEther(f.amount)).toFixed(2))
            }
        })

        const sortedSum = Object.entries(sum)
            .sort(([,value], [,nextValue]) => {
                if (value < nextValue) {
                    return 1;
                } else if (value > nextValue) {
                    return -1;
                }
                return 0;
            })

        return sortedSum.slice(0, 10);
    }

    async getAllTransactions() {
        return await this.transactionRepository.find();
    }
}
