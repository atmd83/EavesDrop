import { Logger, Injectable } from '@nestjs/common';
import { ethers, WebSocketProvider } from "ethers";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

import {Transaction} from "../common/entities/transaction.entity";


@Injectable()
export class ListenerService {
    private readonly logger = new Logger('ListenerService');

    constructor(
        @InjectRepository(Transaction)
        private repository: Repository<Transaction>,
    ) {}

    start() {
        const {
            EVM_SOCKET_PROVIDER,
            EVM_CONTRACT_ABI,
            EVM_CONTRACT_ADDRESS,
            EMV_CONTRACT_EVENT
        } = process.env;

        if(this.checkConfig(process.env)) {
            this.logger.log('listener service starting');
            const provider = new WebSocketProvider(EVM_SOCKET_PROVIDER);
            const contract = new ethers.Contract(EVM_CONTRACT_ADDRESS, JSON.parse(EVM_CONTRACT_ABI), provider);
            contract.on(EMV_CONTRACT_EVENT, (toAddress, fromAddress, amount, _raw) => {
                this.write(toAddress, fromAddress, amount)
            });
            this.logger.log('listener service started');
        }else {
            this.logger.error('Missing environmental values');
        }
    }

    checkConfig({EVM_SOCKET_PROVIDER, EVM_CONTRACT_ABI, EVM_CONTRACT_ADDRESS, EMV_CONTRACT_EVENT}: any) {
        return !(!EVM_SOCKET_PROVIDER || !EVM_CONTRACT_ABI || !EVM_CONTRACT_ADDRESS || !EMV_CONTRACT_EVENT)
    }

    write(toAddress, fromAddress, amount) {
        const tx = new Transaction();

        tx.toAddress = toAddress;
        tx.fromAddress = fromAddress;
        tx.amount = amount;

        return this.repository.save(tx);
    }
}
