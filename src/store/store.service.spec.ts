import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { StoreService } from './store.service';
import { StoreEntity } from './store.entity';

describe('StoreService', () => {
  let service: StoreService;
  let repository: Repository<StoreEntity>;
  let storeList: StoreEntity[]; 


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [StoreService],
    }).compile();

    service = module.get<StoreService>(StoreService);
    repository = module.get<Repository<StoreEntity>>(getRepositoryToken(StoreEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    storeList = [];

    for(let i = 0; i < 5; i++){
        const store: StoreEntity = await repository.save({
        name: faker.person.firstName(), 
        city: faker.lorem.sentence(), 
        address: faker.lorem.sentence()})
        storeList.push(store);
    }

  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll stores', async () => {
    const store: StoreEntity[] = await service.findAll();
    expect(store).not.toBeNull();
    expect(store).toHaveLength(storeList.length);
  });

  it('findOne for id', async () => {
    const storedStore: StoreEntity = storeList[0];
    const store: StoreEntity = await service.findOne(storedStore.id);
    expect(store).not.toBeNull();
    expect(store.name).toEqual(storedStore.name)
    expect(store.city).toEqual(storedStore.city)
    expect(store.address).toEqual(storedStore.address)
  });

  it('update a product', async () => {
    const store: StoreEntity = storeList[0];
    store.name = "Nuevo nombre";
    store.city = "BOG";
    store.address = "Cll 100 7 59";
  
    const updatedProduct: StoreEntity = await service.update(store.id, store);
    expect(updatedProduct).not.toBeNull();
  
    const storedStore: StoreEntity = await repository.findOne({ where: { id: store.id } })
    expect(storedStore).not.toBeNull();
    expect(storedStore.name).toEqual(store.name)
    expect(storedStore.city).toEqual(store.city)
    expect(storedStore.address).toEqual(store.address)
  });

  it('Create a store', async () => {
    const newProduct: StoreEntity = await repository.save({
      name: faker.person.firstName(), 
      city: 'MED', 
      address: "Cll 100 7 59"})
      
      const storedStore: StoreEntity = await service.create(newProduct);
      expect(storedStore).not.toBeNull();
      
      
    });
  
});
