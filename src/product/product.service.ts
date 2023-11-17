/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';



@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ){}

    // return all products
    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository.find({ relations: ["stores"] });
    }

    // return one product by id
    async findOne(id: string): Promise<ProductEntity> {
        const product: ProductEntity = await this.productRepository.findOne({where: {id}, relations: ["stores"] } );
        if (!product)
          throw new BusinessLogicException("The product with the given id was not found", BusinessError.NOT_FOUND);
   
        return product;
    }

    // create a new product
    async create(product: ProductEntity): Promise<ProductEntity> {
        return await this.productRepository.save(product);
    }

    async update(id: string, product: ProductEntity): Promise<ProductEntity> {
        const persistedProduct: ProductEntity = await this.productRepository.findOne({where:{id}});
        if (!persistedProduct)
          throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.productRepository.save({...persistedProduct, ...product});
    }

    async delete(id: string) {
        const product: ProductEntity = await this.productRepository.findOne({where:{id}});
        if (!product)
          throw new BusinessLogicException("No se encontró el producto con el id indicado.", BusinessError.NOT_FOUND);
      
        await this.productRepository.remove(product);
    }


}