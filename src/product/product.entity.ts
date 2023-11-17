/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { StoreEntity } from '../store/store.entity';

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price: string;

    @Column()
    type: string;

    @ManyToMany(() => StoreEntity, store => store.products)
    @JoinTable()
    stores: StoreEntity[];

}
