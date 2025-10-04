import { Injectable, signal } from '@angular/core';
import { Student, createStudent } from '../models/student';

@Injectable({
    // makes it accessible application-wide
  providedIn: 'root'
})
export class StudentService {
  // Using Angular signals for reactive state management
  studentsSignal = signal<Student[]>([]);
  
  // Expose read-only signal for components
  public readonly students = this.studentsSignal.asReadonly();
  
  // Private counter for generating unique IDs
  private nextId = 1;

  constructor() {
    // Initialize with sample data for testing
    this.addStudent('STU001', 'John', 'Smith', 'john.smith@email.com', 2);
    this.addStudent('STU002', 'Jane', 'Doe', 'jane.doe@email.com', 1);
  }

  // Add a new student
  addStudent(studentId: string, firstName: string, lastName: string, email: string, year: number): void {
    const newStudent = createStudent(
      this.nextId++,
      studentId,
      firstName,
      lastName,
      email,
      Number(year)
    );
    
    // Update signal with new student added
    this.studentsSignal.update((students: Student[]) => [...students, newStudent]);
  }

  // Update an existing student
  updateStudent(id: number, updatedData: Partial<Student>): void  {
    this.studentsSignal.update(students => 
      students.map(student => 
        student.id === id 
          ? { ...student, ...updatedData,  year: updatedData.year !== undefined ? Number(updatedData.year) : student.year } 
          : student
      )
    );
  }

  // Delete a student
  deleteStudent(id: number): void {
    this.studentsSignal.update(students => 
      students.filter(student => student.id !== id)
    );
  }

  // Get a specific student by ID
  getStudentById(id: number): Student | undefined {
    return this.students().find(student => student.id === id);
  }

  // Check if student ID already exists
  isStudentIdTaken(studentId: string, excludeId?: number): boolean {
    return this.students().some(student => 
      student.studentId === studentId && student.id !== excludeId
    );
  }
}