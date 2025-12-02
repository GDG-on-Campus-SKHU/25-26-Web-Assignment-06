import { axiosClient } from "./axiosClient";
import type { Sex, Student } from "../types";

export interface StudentQueryParams {
  page: number;
  limit: number;
  sortBy?: "id" | "studentNo" | "name";
  order?: "asc" | "desc";
  departmentId?: number;
  sex?: Sex;
  q?: string;
}

export interface StudentListResult {
  students: Student[];
  totalCount: number;
}

export async function fetchStudents(
  params: StudentQueryParams
): Promise<StudentListResult> {
  const { page, limit, sortBy, order, departmentId, sex, q } = params;

  const res = await axiosClient.get<Student[]>("/students", {
    params: {
      _page: page,
      _limit: limit,
      _sort: sortBy,
      _order: order,
      departmentId,
      sex,
      q,
    },
  });

  const totalCount = Number(res.headers["x-total-count"] ?? res.data.length);

  return { students: res.data, totalCount };
}

export async function fetchStudentById(id: number): Promise<Student> {
  const res = await axiosClient.get<Student>(`/students/${id}`);
  return res.data;
}

export async function createStudent(
  payload: Omit<Student, "id">
): Promise<Student> {
  const res = await axiosClient.post<Student>("/students", payload);
  return res.data;
}

export async function updateStudent(
  id: number,
  payload: Omit<Student, "id">
): Promise<Student> {
  const res = await axiosClient.put<Student>(`/students/${id}`, payload);
  return res.data;
}

export async function deleteStudent(id: number): Promise<void> {
  await axiosClient.delete(`/students/${id}`);
}
