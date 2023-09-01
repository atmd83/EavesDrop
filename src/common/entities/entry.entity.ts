import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Entry {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    address: string

}