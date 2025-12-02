export interface Department {
  id: number;
  name: string;
  shortName: string;
  phone: string;
}

export type Sex = "남" | "여";

export interface Student {
  id: number;
  studentNo: string;
  name: string;
  phone: string;
  sex: Sex;
  email: string;
  departmentId: number;
}

export interface StudentWithDepartment extends Student {
  department?: Department;
}
