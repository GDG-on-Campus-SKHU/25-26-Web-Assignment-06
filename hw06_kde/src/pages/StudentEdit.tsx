import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments } from "../api/department";
import { fetchStudentById, updateStudent } from "../api/student";
import type { Department, Student } from "../types";
import StudentForm from "../components/StudentForm";
import { useToast } from "../components/ToastProvider";

export default function StudentEditPage() {
  const { id } = useParams<{ id: string }>();
  const studentId = Number(id);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [dept, st] = await Promise.all([
          fetchDepartments(),
          fetchStudentById(studentId),
        ]);
        setDepartments(dept);
        setStudent(st);
      } catch (e) {
        console.error(e);
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }
    if (!Number.isNaN(studentId)) load();
  }, [studentId]);

  const handleSubmit = async (values: any) => {
    if (!student) return;
    await updateStudent(studentId, {
      ...values,
      id: studentId,
    });
    showToast("학생 정보가 수정되었습니다.");
    navigate(`/students/${studentId}`);
  };

  if (loading) return <div>불러오는 중...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!student) return <div>학생 정보를 찾을 수 없습니다.</div>;

  return (
    <div>
      <h2>학생 정보 수정</h2>
      <StudentForm
        departments={departments}
        initialValues={student}
        submitLabel="수정하기"
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
}
