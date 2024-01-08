import { Injectable } from '@nestjs/common';
import { Item } from '../items/interfaces/item.interface';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = []; // Все элементы, с которыми работает сервис

  getItems(): Item[] {
    return this.items; // Возвращает все элементы
  }

  getItem(id: string): Item {
    return this.items.find(item => item.id === id); // Возвращает элемент по заданному id
  }

  createItem(item: Item): Item {
    this.items.push(item); // Добавляет новый элемент
    return item;
  }

  updateItem(id: string, item: Item): Item {
    const index = this.items.findIndex(item => item.id === id); // Находит индекс элемента с заданным id
    this.items[index] = item; // Обновляет элемент в массиве
    return item;
  }

  deleteItem(id: string): void {
    const index = this.items.findIndex(item => item.id === id); // Находит индекс элемента с заданным идентификатором
    this.items.splice(index, 1); // Удаляет элемент из массива
  }
}
