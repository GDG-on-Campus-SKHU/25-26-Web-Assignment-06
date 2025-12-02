import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { fetchStudentById } from "../api/student";
import { fetchDepartments } from "../api/department";
import type { Department, Student } from "../types";
import Button from "../components/Button";

const Card = styled.div`
  background-color: #f5f5f5;
  background-color: ;
  padding: 16px;
  border-radius: 8px;
`;

const Row = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
`;

const Label = styled.span`
  display: inline-block;
  width: 80px;
  font-weight: 600;
`;

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const studentId = Number(id);
  const [student, setStudent] = useState<Student | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [st, dept] = await Promise.all([
          fetchStudentById(studentId),
          fetchDepartments(),
        ]);
        setStudent(st);
        setDepartments(dept);
      } catch (e) {
        console.error(e);
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }
    if (!Number.isNaN(studentId)) load();
  }, [studentId]);

  if (loading) return <div>불러오는 중...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!student) return <div>학생 정보를 찾을 수 없습니다.</div>;

  const dept = departments.find((d) => d.id === student.departmentId);

  return (
    <div>
      <h2>학생 상세 정보</h2>
      <Card>
        <Row>
          <Label>이름</Label> {student.name}
        </Row>
        <Row>
          <Label>학번</Label> {student.studentNo}
        </Row>
        <Row>
          <Label>성별</Label> {student.sex}
        </Row>
        <Row>
          <Label>학과</Label> {dept?.name ?? student.departmentId}
        </Row>
        <Row>
          <Label>이메일</Label> {student.email}
        </Row>
        <Row>
          <Label>전화번호</Label> {student.phone}
        </Row>
      </Card>

      <div style={{ marginTop: 16 }}>
        <Link to={`/students/${studentId}/edit`}>
          <Button variant="primary">수정하기</Button>
        </Link>
        <Button onClick={() => navigate(`/`)}>뒤로가기</Button>
      </div>
    </div>
  );
}
