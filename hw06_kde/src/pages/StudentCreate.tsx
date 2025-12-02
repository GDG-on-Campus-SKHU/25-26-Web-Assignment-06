import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDepartments } from "../api/department";
import { createStudent } from "../api/student";
import type { Department } from "../types";
import StudentForm from "../components/StudentForm";
import { useToast } from "../components/ToastProvider";

export default function StudentCreatePage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    fetchDepartments()
      .then(setDepartments)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (values: any) => {
    await createStudent({
      ...values,
    });
    showToast("학생이 등록되었습니다");
    navigate("/");
  };

  if (loading) return <div>불러오는 중...</div>;

  return (
    <div>
      <h2>학생 등록</h2>
      <StudentForm
        departments={departments}
        submitLabel="등록하기"
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
}
