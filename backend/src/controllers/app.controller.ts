import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
// Контроллер который обрабатывает HTTP-запросы
export class AppController {
  // Объект appService будет автоматически создан и передан в контроллер
  constructor(private readonly appService: AppService) {}

  // Декоратор указывающий, что метод обрабатывает HTTP-запрос типа GET
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
