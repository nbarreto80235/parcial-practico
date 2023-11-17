import { Module } from '@nestjs/common';
import { StoreProductService } from './store-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { StoreEntity } from '../store/store.entity';
import { StoreProductController } from './store-product.controller';

@Module({
  providers: [StoreProductService],
  imports: [TypeOrmModule.forFeature([StoreEntity, ProductEntity])],
  controllers: [StoreProductController],
})

export class StoreProductModule {}
