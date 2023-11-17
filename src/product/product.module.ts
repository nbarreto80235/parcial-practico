import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';


@Module({
  providers: [ProductService],
  imports: [TypeOrmModule.forFeature([ProductEntity])],
})
export class ProductModule {}
