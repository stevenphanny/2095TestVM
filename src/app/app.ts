import { Component, signal } from '@angular/core';
import { AddStudent } from './components/add-student/add-student';
import { ListStudents } from './components/list-students/list-students';
import { UpdateStudent } from './components/update-student/update-student';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddStudent, ListStudents, UpdateStudent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Student Management Multi-Component';
  
  // Signal to track which student is being edited (null means no editing)
  public editingStudentId = signal<number | null>(null); 

  // Handle edit student event from list component
  public onEditStudent(studentId: number): void {
    this.editingStudentId.set(studentId);
  }

  // Handle student updated event from update component
  public onStudentUpdated(): void {
    this.editingStudentId.set(null);
  }

  // Handle cancel edit event from update component
  public onCancelEdit(): void {
    this.editingStudentId.set(null);
  }
}