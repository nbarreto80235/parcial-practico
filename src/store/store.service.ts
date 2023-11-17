/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { StoreEntity } from './store.entity';

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(StoreEntity)
        private readonly storeRepository: Repository<StoreEntity>
    ){}

    private validateCityCode(cod: string): void {
        BusinessLogicException.validateCityCode(cod);
    }

    // return all stores
    async findAll(): Promise<StoreEntity[]> {
        return await this.storeRepository.find({ relations: ["products"] });
    }

    // return one store by id
    async findOne(id: string): Promise<StoreEntity> {
        const store: StoreEntity = await this.storeRepository.findOne({where: {id}, relations: ["products"] } );
        if (!store)
          throw new BusinessLogicException("The store with the given id was not found", BusinessError.NOT_FOUND);
   
        return store;
    }

    // create a new store
    async create(store: StoreEntity): Promise<StoreEntity> {
        this.validateCityCode(store.city);
        return await this.storeRepository.save(store);
    }

    // update a store
    async update(id: string, store: StoreEntity): Promise<StoreEntity> {
        this.validateCityCode(store.city);
        const persistedStore: StoreEntity = await this.storeRepository.findOne({where:{id}});

        if (!persistedStore)
          throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.storeRepository.save({...persistedStore, ...store});
    }

    // delete a store
    async delete(id: string) {
        const store: StoreEntity = await this.storeRepository.findOne({where:{id}});
        if (!store)
          throw new BusinessLogicException("No se encontró el producto con el id indicado.", BusinessError.NOT_FOUND);
      
        await this.storeRepository.remove(store);
    }




}
