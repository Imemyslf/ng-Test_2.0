export interface Userdata {
  _id: string;
  username: string;
}

export type PRIORITY = 'high' | 'medium' | 'low';
export type STATUS = 'in-progress' | 'pending';

export interface OptionTypes {
  value: string;
  viewValue: string;
}

export const Priority: OptionTypes[] = [
  {
    value: 'high',
    viewValue: 'High',
  },
  {
    value: 'medium',
    viewValue: 'Medium',
  },
  {
    value: 'low',
    viewValue: 'Low',
  },
];

export const Status: OptionTypes[] = [
  {
    value: 'in-progress',
    viewValue: 'In-Progress',
  },
  {
    value: 'pending',
    viewValue: 'Pending',
  },
  {
    value: 'completed',
    viewValue: 'Completed',
  },
];

export interface Task {
  _id?: string;
  title: string;
  description: string;
  deadline: string;
  priority: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskResponse {
  title: string;
  description: string;
  deadline: string;
  priority: string;
  status: string;
  assignedTo: string;
  assginedBy: string;
}
