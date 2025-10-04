import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-student.html',
  styleUrls: ['./add-student.css']
})
export class AddStudent {
  // Inject the student service using modern inject() function
  private studentService = inject(StudentService);
  
  // Form data for new student
  public newStudent = {
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    year: 1
  };

  // Add student method
  public addStudent(): void {
    if (this.isValidStudent()) {
      // Check if student ID is already taken
      if (this.studentService.isStudentIdTaken(this.newStudent.studentId)) {
        alert(`Student ID "${this.newStudent.studentId}" is already taken!`);
        return;
      }

      // Add student through service
      this.studentService.addStudent(
        this.newStudent.studentId,
        this.newStudent.firstName,
        this.newStudent.lastName,
        this.newStudent.email,
        this.newStudent.year
      );

      // Reset form after successful addition
      this.resetForm();
      alert('Student added successfully!');
    }
  }

  // Form validation
  private isValidStudent(): boolean {
    return this.newStudent.studentId.trim() !== '' &&
           this.newStudent.firstName.trim() !== '' &&
           this.newStudent.lastName.trim() !== '' &&
           this.newStudent.email.trim() !== '' &&
           this.newStudent.year >= 1 && this.newStudent.year <= 4;
  }

  // Reset form to initial state
  public resetForm(): void {
    this.newStudent = {
      studentId: '',
      firstName: '',
      lastName: '',
      email: '',
      year: 1
    };
  }
}