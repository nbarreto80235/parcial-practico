/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { StoreProductService } from './store-product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';

import { ProductEntity } from '../product/product.entity';
import { StoreEntity } from '../store/store.entity';

describe('StoreProductService', () => {
  let service: StoreProductService;
  let productRepository: Repository<ProductEntity>;
  let storeRepository: Repository<StoreEntity>;
  let product: ProductEntity;
  let storeList : StoreEntity[];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [StoreProductService],
    }).compile();

    service = module.get<StoreProductService>(StoreProductService);
    productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
    storeRepository = module.get<Repository<StoreEntity>>(getRepositoryToken(StoreEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    productRepository.clear();
    storeRepository.clear();

    storeList = [];
    for(let i = 0; i < 5; i++){
      const newStore: StoreEntity = await storeRepository.save({
      name: faker.person.firstName(), 
      city: faker.lorem.sentence(), 
      address: faker.lorem.sentence()});

      storeList.push(newStore);
    }

    product = await productRepository.save({
      name: faker.person.firstName(), 
      price: faker.lorem.sentence(), 
      type: faker.image.url(), 
      stores: storeList})

  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addStoreToProduct should add an store to a product', async () => {
    const newProducto: ProductEntity = await productRepository.save({
      name: faker.person.firstName(), 
      price: faker.lorem.sentence(), 
      type: faker.lorem.sentence()
    });

    const newStore: StoreEntity = await storeRepository.save({
      name: faker.person.firstName(), 
      city: faker.lorem.sentence(), 
      address: faker.image.url()
    });

    const result: ProductEntity = await service.addStoreToProduct(newProducto.id, newStore.id );
    
    expect(result.stores.length).toBe(1);
  });


  it('findStoresFromProduct should return stores by product', async () => {
    const storedStore: StoreEntity[] = await service.findStoresFromProduct(product.id )
    expect(storedStore.length).toBe(5);
  });


  it('findStoreFromProduct not should return store by product', async () => {
    const store: StoreEntity = storeList[0];
    const storedStore: StoreEntity = await service.findStoreFromProduct(product.id, store.id );
    expect(storedStore).not.toBeNull();
  });


  it('updateStoresFromProduct should return product', async () => {
    const storedProduct: ProductEntity = await service.updateStoresFromProduct(product.id, storeList );
    expect(storedProduct).not.toBeNull();
  });


  it('deleteStoreFromProduct should delete store by product', async () => {
    const storedStore: StoreEntity = storeList[0];
    expect(()=> service.deleteStoreFromProduct(product.id, storedStore.id)).rejects.toHaveProperty("message", "The store with the given id is not associated to the product"); 
  });
  

  



  



});
