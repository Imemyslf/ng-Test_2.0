export interface Employee {
  _id: string;
  user: {
    _id: string;
    name: string;
    username: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  tasks: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Admin {
  _id: string;
  adminDataId: {
    _id: string;
    name: string;
    username: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  previlegeSuperAdmin: boolean;
  __v: number;
}

export interface Reviewer {
  _id: string;
  reviewerDataId: {
    _id: string;
    name: string;
    username: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  assignedEmployee: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
