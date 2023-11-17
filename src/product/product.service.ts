/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ){}

    private validateTypeProduct(tipo: string): void {
        BusinessLogicException.validateTypeProduct(tipo);
    }

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
        this.validateTypeProduct(product.type);
        return await this.productRepository.save(product);
    }

    // update a product
    async update(id: string, product: ProductEntity): Promise<ProductEntity> {
        this.validateTypeProduct(product.type);
        const persistedProduct: ProductEntity = await this.productRepository.findOne({where:{id}});

        if (!persistedProduct)
          throw new BusinessLogicException("The product with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.productRepository.save({...persistedProduct, ...product});
    }

    // delete a product
    async delete(id: string) {
        const product: ProductEntity = await this.productRepository.findOne({where:{id}});
        if (!product)
          throw new BusinessLogicException("No se encontró el producto con el id indicado.", BusinessError.NOT_FOUND);
      
        await this.productRepository.remove(product);
    }


}
