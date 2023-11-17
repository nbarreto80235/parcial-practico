import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { StoreProductService } from './store-product.service';
import { StoreEntity } from 'src/store/store.entity';


@Controller('products')
@UseInterceptors(BusinessErrorsInterceptor)
export class StoreProductController {

    constructor(private readonly productStoreService: StoreProductService) {}

    @Post(':productId/stores/:storeId')
    async addStoreProduct(@Param('productId') productId: string, @Param('storeId') storeId: string){
        return await this.productStoreService.addStoreToProduct(productId, storeId);
    }

    @Get(':productId/stores')
    async findStoresFromProduct(@Param('productId') productId: string){
       return await this.productStoreService.findStoresFromProduct(productId);
    }

    @Get(':productId/stores/:storeId')
    async findStoreFromProduct(@Param('productId') productId: string, @Param('storeId') storeId: string){
       return await this.productStoreService.findStoreFromProduct(productId, storeId);
    }

    @Put(':productId/stores')
    async updateStoresFromProduct(@Param('productId') productId: string, @Body() storesList: StoreEntity[]){
       return await this.productStoreService.updateStoresFromProduct(productId, storesList);
    }

    @Delete(':productId/stores/:storeId')
    async deleteStoreFromProduct(@Param('productId') productId: string, @Param('storeId') storeId: string){
       return await this.productStoreService.deleteStoreFromProduct(productId, storeId);
    }


    


}
