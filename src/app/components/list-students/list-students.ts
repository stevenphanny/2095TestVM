import { Component, inject, output } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student, getFullName } from '../../models/student';

@Component({
  selector: 'app-list-students',
  standalone: true,
  imports: [],
  templateUrl: './list-students.html',
  styleUrls: ['./list-students.css']
})
export class ListStudents {
  // Inject the student service
  private studentService = inject(StudentService);
  
  // Output event for when edit button is clicked
  public editStudent = output<number>(); 
  
  // Get students from service (reactive signal)
  public get students(): Student[] {
    return this.studentService.students();
  }
  
  // Utility function for full names
  public getFullName = getFullName;

  // Delete student method
  public deleteStudent(id: number): void {
    const student = this.studentService.getStudentById(id);
    if (student) {
      const confirmed = confirm(
        `Are you sure you want to delete "${getFullName(student)}" (${student.studentId})?`
      );
      
      if (confirmed) {
        this.studentService.deleteStudent(id);
        alert('Student deleted successfully!');
      }
    }
  }

  // Edit student method - emits event to parent
  public onEditStudent(id: number): void {
    this.editStudent.emit(id);
  }

  public countByYear(year: number): number {
    return this.students.filter((s) => s.year === year).length;
  }

  // Get badge class for year
  public getYearBadgeClass(year: number): string {
    const badgeClasses = {
      1: 'bg-success',
      2: 'bg-info', 
      3: 'bg-warning',
      4: 'bg-danger'
    };
    return badgeClasses[year as keyof typeof badgeClasses] || 'bg-secondary';
  }
}
