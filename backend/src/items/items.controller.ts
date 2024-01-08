import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from '../dtos/create-item.dto';
import { UpdateItemDtoWithId } from '../dtos/update-item-with-id.dto';
import { Item } from './interfaces/item.interface';

// Контроллер, обрабатывающий пути, начинающиеся с '/items'
@Controller('items')
export class ItemsController {
  // ИнЪекция зависимости ItemsService
  constructor(private readonly itemsService: ItemsService) {}

  // Обработка GET-запроса на путь '/items'
  @Get()
  getItems(): Item[] {
    return this.itemsService.getItems(); // Получение списка элементов через ItemsService
  }

  // Обработка GET-запроса на путь '/items/:id'
  @Get(':id')
  getItem(@Param('id') id: string): Item {
    return this.itemsService.getItem(id); // Получение элемента по указанному идентификатору через ItemsService
  }

  // Обработка POST-запроса на путь '/items'
  @Post()
  createItem(@Body() createItemDto: CreateItemDto): Item {
    const newItem: Item = {
      id: '',
      ...createItemDto,
    };
    return this.itemsService.createItem(newItem);
  }

  // Обработка PUT-запроса на путь '/items/:id
  @Put(':id')
  updateItem(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDtoWithId,
  ): Item {
    return this.itemsService.updateItem(id, updateItemDto); // Обновление элемента по идентификатору через ItemsService
  }

  // Обработка DELETE-запроса на путь '/items/:id'
  @Delete(':id')
  deleteItem(@Param('id') id: string): void {
    this.itemsService.deleteItem(id); // Удаление элемента по идентификатору через ItemsService
  }
}

