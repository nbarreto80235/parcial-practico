import { Module } from '@nestjs/common';
import { StoreProductService } from './store-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { StoreEntity } from '../store/store.entity';

@Module({
  providers: [StoreProductService],
  imports: [TypeOrmModule.forFeature([StoreEntity, ProductEntity])],
})

export class StoreProductModule {}
