import { axiosClient } from "./axiosClient";
import type { Department } from "../types";

export async function fetchDepartments(): Promise<Department[]> {
  const res = await axiosClient.get<Department[]>("/departments");
  return res.data;
}
