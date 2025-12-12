export interface Student {
  id: number;
  name: string;
  studentId?: string | number; // API 데이터에 따라 존재
  department: string;
  sex: string;
  email: string;
}
