/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProductEntity } from './product.entity';
import { ProductDto } from './dto/product.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

import { ProductService } from './product.service';

@Controller('products')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async findAll() {
        return await this.productService.findAll();
    }

    @Get(':productId')
    async findOne(@Param('productId') productId: string) {
        return await this.productService.findOne(productId);
    }

    @Post()
    async create(@Body() productDto: ProductDto) {
        const product: ProductEntity = plainToInstance(ProductEntity, productDto);
        return await this.productService.create(product);
    }

    @Put(':productId')
    async update(@Param('productId') productId: string, @Body() productDto: ProductDto) {
        const producto: ProductEntity = plainToInstance(ProductEntity, productDto);
        return await this.productService.update(productId, producto);
    }

    @Delete(':productId')
    @HttpCode(204)
    async delete(@Param('productId') productId: string) {
        return await this.productService.delete(productId);
    }


}
