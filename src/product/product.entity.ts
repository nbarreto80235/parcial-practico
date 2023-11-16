import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

}
