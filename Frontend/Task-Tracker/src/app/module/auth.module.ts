export type ROLE = 'admin' | 'manager' | 'employee' | '';

export interface User {
  value: string;
  viewValue: string;
}

export const userRoles: User[] = [
  {
    value: 'admin',
    viewValue: 'Admin',
  },
  {
    value: 'reviewer',
    viewValue: 'Reviewer',
  },
  {
    value: 'employee',
    viewValue: 'Employee',
  },
];

export interface Auth {
  id: string;
  name: string;
  username: string;
  password: string;
  role?: string;
  imagePath?: File | null;
}
