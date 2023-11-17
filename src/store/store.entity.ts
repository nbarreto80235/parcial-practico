/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { ProductEntity } from '../product/product.entity';

@Entity()
export class StoreEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    address: string;

    @ManyToMany(() => ProductEntity, product => product.stores)
    @JoinTable()
    products: ProductEntity[];

}
