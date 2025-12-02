import axios from "axios";
import { Student } from "./types/student";

const api = axios.create({
  baseURL: "/students",
});

export const fetchStudents = (params?: any) =>
  api.get<Student[]>("/", { params });

export const fetchStudent = (id: string | number) =>
  api.get<Student>(`/${id}`);

export const createStudent = (data: Partial<Student>) =>
  api.post<Student>("/", data);

export const updateStudent = (id: string | number, data: Partial<Student>) =>
  api.put<Student>(`/${id}`, data);

export const deleteStudent = (id: string | number) =>
  api.delete(`/${id}`);

export default api;
