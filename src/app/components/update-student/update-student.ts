import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-student.html',
  styleUrls: ['./update-student.css']
})
export class UpdateStudent {
  // Inject the student service
  public studentService = inject(StudentService);
  
  // Input for student ID to edit
   public studentId = input<number | null>(null); 
  
  // Output events
  public studentUpdated = output<void>();
  public cancelEdit = output<void>();
  
  // Form data for editing student
  public editStudent: {
    id: number;
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    year: number;
  } = {
    id: 0,
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    year: 1
  };

  // Track original student for comparison
  private originalStudent: Student | null = null;

  // Load student data when studentId changes
  ngOnInit() {
    const id = this.studentId();
    if (id !== null) {
      this.loadStudent(id);
    }
  }

  // Load student data from service
  private loadStudent(id: number): void {
    const student = this.studentService.getStudentById(id);
    if (student) {
      this.originalStudent = student;
      this.editStudent = {
        id: student.id,
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        year: student.year
      };
    }
  }

  // Update student method
  public updateStudent(): void {
    if (this.isValidStudent()) {
      // Check if student ID is already taken by another student
      if (this.studentService.isStudentIdTaken(this.editStudent.studentId, this.editStudent.id)) {
        alert(`Student ID "${this.editStudent.studentId}" is already taken by another student!`);
        return;
      }

      // Update student through service
      this.studentService.updateStudent(this.editStudent.id, {
        studentId: this.editStudent.studentId,
        firstName: this.editStudent.firstName,
        lastName: this.editStudent.lastName,
        email: this.editStudent.email,
        year: this.editStudent.year
      });

      alert('Student updated successfully!');
      this.studentUpdated.emit();
    }
  }

  // Cancel editing
  public onCancel(): void {
    this.cancelEdit.emit();
  }

  // Form validation
  private isValidStudent(): boolean {
    return this.editStudent.studentId.trim() !== '' &&
           this.editStudent.firstName.trim() !== '' &&
           this.editStudent.lastName.trim() !== '' &&
           this.editStudent.email.trim() !== '' &&
           this.editStudent.year >= 1 && this.editStudent.year <= 4;
  }

  // Check if form has changes
  public hasChanges(): boolean {
    if (!this.originalStudent) return false;
    
    return this.editStudent.studentId !== this.originalStudent.studentId ||
           this.editStudent.firstName !== this.originalStudent.firstName ||
           this.editStudent.lastName !== this.originalStudent.lastName ||
           this.editStudent.email !== this.originalStudent.email ||
           this.editStudent.year !== this.originalStudent.year;
  }

  // Reset form to original values
  public resetForm(): void {
    if (this.originalStudent) {
      this.loadStudent(this.originalStudent.id);
    }
  }
}