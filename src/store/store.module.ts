import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreService } from './store.service';
import { StoreEntity } from './store.entity';

@Module({
  providers: [StoreService],
  imports: [TypeOrmModule.forFeature([StoreEntity])],
})
export class StoreModule {}
