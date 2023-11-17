/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

import { ProductEntity } from '../product/product.entity';
import { StoreEntity } from '../store/store.entity';

@Injectable()
export class StoreProductService {

    constructor(
        
        @InjectRepository(StoreEntity)
        private readonly storeRepository: Repository<StoreEntity>,
    
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
        
    ) {}

    
    async addStoreToProduct(productId: string, storeId: string): Promise<ProductEntity> {
        const product: ProductEntity = await this.productRepository.findOne({where: {id: productId}, relations: ["stores"]});
       
        if (!product)
          throw new BusinessLogicException("The product with the given id was not found", BusinessError.NOT_FOUND);
       
        const store: StoreEntity = await this.storeRepository.findOne({where: {id: storeId}}) 
       
        if (!store)
          throw new BusinessLogicException("The store with the given id was not found", BusinessError.NOT_FOUND);
        
        product.stores = [...product.stores, store]

        return await this.productRepository.save(product);

      }
  
    async findStoresFromProduct(productId: string): Promise<StoreEntity[]> {
        const product: ProductEntity = await this.productRepository.findOne({where: {id: productId}, relations: ["stores"]});
        if (!product)
          throw new BusinessLogicException("The product with the given id was not found", BusinessError.NOT_FOUND)
        
        return product.stores;
      }  

      
    async findStoreFromProduct(productId: string, storeId: string): Promise<StoreEntity> {
        const store: StoreEntity = await this.storeRepository.findOne({where: {id: storeId}});
        if (!store)
          throw new BusinessLogicException("The store with the given id was not found", BusinessError.NOT_FOUND)
        
        const product: ProductEntity = await this.productRepository.findOne({where: {id: productId}, relations: ["stores"]}); 
        if (!product)
          throw new BusinessLogicException("The product with the given id was not found", BusinessError.NOT_FOUND)
    
        const productStore: StoreEntity = product.stores.find(e => e.id === store.id);
    
        if (!productStore)
          throw new BusinessLogicException("The store with the given id is not associated to the product", BusinessError.PRECONDITION_FAILED)
    
        return productStore;
    }    


    
    async updateStoresFromProduct(productId: string, updatedStores: StoreEntity[]): Promise<ProductEntity> {
        // Buscar el producto por su ID
        const product: ProductEntity = await this.productRepository.findOne({ where: { id: productId }, relations: ['stores'] });
  
        if (!product) {
            throw new BusinessLogicException("The product with the given id was not found", BusinessError.PRECONDITION_FAILED)
        }
  
        product.stores = updatedStores;
  
        await this.productRepository.save(product);

        return  await this.productRepository.findOne({ where: { id: productId }, relations: ['stores'] });
    }

    async deleteStoreFromProduct(productId: string, storeId: string){
        const store: StoreEntity = await this.storeRepository.findOne({where: {id: storeId}});
        if (!store)
          throw new BusinessLogicException("The store with the given id was not found", BusinessError.NOT_FOUND)
     
        const product: ProductEntity = await this.productRepository.findOne({where: {id: productId}, relations: ["stores"]});
        if (!product)
          throw new BusinessLogicException("The product with the given id was not found", BusinessError.NOT_FOUND)
     
        const productStore: StoreEntity = product.stores.find(e => e.id === store.id);
     
        if (!productStore)
            throw new BusinessLogicException("The store with the given id is not associated to the product", BusinessError.PRECONDITION_FAILED)

        product.stores = product.stores.filter(e => e.id !== storeId);
        await this.productRepository.save(product);
    }   
      


}
