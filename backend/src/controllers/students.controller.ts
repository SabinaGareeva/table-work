import { Controller, Param, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { StudentDto } from '../dtos/student.dto';
import { StudentsService } from '../services/students.service';
import { Student } from 'src/items/interfaces/student.interface';

// Контроллер, отвечающий за маршруты связанные со студентами
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // Обработчик GET запроса для получения всех студентов
  @Get()
  getAllStudents(): Student[] {
    return this.studentsService.getAllStudents();
  }

  // Обработчик POST запроса для создания студента
  @Post()
  createStudent(@Body() studentDto: StudentDto) {
    return this.studentsService.createStudent(studentDto);
  }

  // Обработчик PUT запроса для обновления студента
  @Put(':id')
  updateStudent(@Param('id') id: string, @Body() studentDto: StudentDto) {
    return this.studentsService.updateStudent(id, studentDto);
  }

  // Обработчик DELETE запроса для удаления студента
  @Delete(':id')
  deleteStudent(@Param('id') id: string) {
    return this.studentsService.deleteStudent(id);
  }
}
