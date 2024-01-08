import { Injectable, Logger  } from '@nestjs/common';
import { StudentDto } from '../dtos/student.dto';
import { Student } from '../items/interfaces/student.interface';

@Injectable()
export class StudentsService {
  private students: Student[] = [];
  private logger = new Logger(StudentsService.name); // логгер для вывода записей


  // Получить всех студентов
  getAllStudents(): Student[] {
    return this.students;
  }


  // Создать студента
  createStudent(studentDto: StudentDto): Student {
    const newStudent: Student = {
      id: this.generateUniqueId(),
      ...studentDto,
    };

    this.students.push(newStudent);
    this.logStudents();
    return newStudent;
  }


  // Обновить информацию о студенте
  updateStudent(id: string, studentDto: StudentDto): Student {
    const studentIndex = this.students.findIndex((student) => student.id === id);

    if (studentIndex >= 0) {
      const updatedStudent: Student = {
        id,
        ...studentDto,
      };

      this.students[studentIndex] = updatedStudent;
      return updatedStudent;
    }

    return null;
  }


  // Удалить студента
  deleteStudent(id: string): void {
    const studentIndex = this.students.findIndex((student) => student.id === id);

    if (studentIndex >= 0) {
      this.logStudents();
      this.students.splice(studentIndex, 1);
    }
  }
  

  // Генерация id
  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2);
  }

  // вывод в логи
  private logStudents(): void {
    this.logger.log('Студенты: ' + JSON.stringify(this.students));
  }
}
