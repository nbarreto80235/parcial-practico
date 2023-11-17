/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';
import { StoreEntity } from './store/store.entity';
import { ProductEntity } from './product/product.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreProductModule } from './store-product/store-product.module';
import { ProductStoreController } from './product-store/product-store.controller';



@Module({
  imports: [ProductModule, StoreModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '5mG$1**8abcd',
    database: 'parcial-practico',
    entities: [ProductEntity, StoreEntity],
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
  }), StoreProductModule, ],
  controllers: [AppController, ProductStoreController],
  providers: [AppService],
})
export class AppModule {}
