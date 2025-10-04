import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudents } from './list-students';

describe('ListStudents', () => {
  let component: ListStudents;
  let fixture: ComponentFixture<ListStudents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListStudents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStudents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
