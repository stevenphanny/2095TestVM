export interface Student {
  readonly id: number;
  readonly studentId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly year: number;
}

export function createStudent(
  id: number,
  studentId: string,
  firstName: string,
  lastName: string,
  email: string,
  year: number
): Student {
  return {
    id,
    studentId,
    firstName,
    lastName,
    email,
    year
  };
}

export function getFullName(student: Student): string {
  return `${student.firstName} ${student.lastName}`;
}