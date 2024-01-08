import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ItemsController } from '../items/items.controller';
import { ItemsService } from '../items/items.service';
import { StudentsController } from 'src/controllers/students.controller';
import { StudentsService } from 'src/services/students.service';

@Module({
  // Контроллеры, которые будут обрабатывать HTTP-запросы
  controllers: [AppController, ItemsController, StudentsController],
  // Сервисы, которые должны быть доступны в данном модуле
  providers: [AppService, ItemsService, StudentsService],
})


export class AppModule {}
