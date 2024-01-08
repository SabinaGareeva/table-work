import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import {ItemsService } from '../items/items.service';

@Module({
  // отвечают за обработку HTTP-запросов и взаимодействие с клиентами
  controllers: [ItemsController],
  //  бизнес-логика приложения и предоставление функциональности, которую контроллеры могут использовать
  providers: [ItemsService],
})


export class AppModule {}