import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';

describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<ProductEntity>;
  let productList: ProductEntity[]; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    productList = [];

    for(let i = 0; i < 5; i++){
        const product: ProductEntity = await repository.save({
        name: faker.person.firstName(), 
        price: faker.lorem.sentence(), 
        type: faker.lorem.sentence()})
        productList.push(product);
    }

  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll products', async () => {
    const product: ProductEntity[] = await service.findAll();
    expect(product).not.toBeNull();
    expect(product).toHaveLength(productList.length);
  });

  it('findOne for id', async () => {
    const storedProduct: ProductEntity = productList[0];
    const product: ProductEntity = await service.findOne(storedProduct.id);
    expect(product).not.toBeNull();
    expect(product.name).toEqual(storedProduct.name)
    expect(product.price).toEqual(storedProduct.price)
    expect(product.type).toEqual(storedProduct.type)
  });

  it('update a product', async () => {
    const product: ProductEntity = productList[0];
    product.name = "Nuevo nombre";
    product.price = "10000";
    product.type = "No perecedero";
  
    const updatedProduct: ProductEntity = await service.update(product.id, product);
    expect(updatedProduct).not.toBeNull();
  
    const storedProducto: ProductEntity = await repository.findOne({ where: { id: product.id } })
    expect(storedProducto).not.toBeNull();
    expect(storedProducto.name).toEqual(product.name)
    expect(storedProducto.price).toEqual(product.price)
  });

  it('Create a product', async () => {
    const newProduct: ProductEntity = await repository.save({
      name: faker.person.firstName(), 
      price: faker.lorem.sentence(), 
      type: "Perecedero"})
      
      const storedProducto: ProductEntity = await service.create(newProduct);
      expect(storedProducto).not.toBeNull();
      
      
    });



});
