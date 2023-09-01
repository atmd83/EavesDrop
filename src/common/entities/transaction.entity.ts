import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    toAddress: string

    @Column()
    amount: string

    @Column()
    fromAddress: string

    @CreateDateColumn()
    createdAt: Date;
}