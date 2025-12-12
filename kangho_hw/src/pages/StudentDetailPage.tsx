import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStudent } from "../api";
import Button from "../components/Button";
import { Student } from "../types/student";

const Wrapper = styled.div`
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 22px;
  margin-bottom: 16px;
`;

const Info = styled.p`
  margin: 6px 0;
`;

const StudentDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetchStudent(id!);
      setStudent(res.data);
    } catch {
      setError("데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Wrapper>불러오는 중…</Wrapper>;
  if (error) return <Wrapper>{error}</Wrapper>;
  if (!student) return <Wrapper>데이터가 없습니다.</Wrapper>;

  return (
    <Wrapper>
      <Title>{student.name} 상세 정보</Title>
      <Info>학번: {student.id}</Info>
      <Info>학과: {student.department}</Info>
      <Info>성별: {student.sex}</Info>
      <Info>이메일: {student.email}</Info>

      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <Button onClick={() => navigate(`/students/${id}/edit`)}>수정하기</Button>
        <Button variant="outline" onClick={() => navigate(-1)}>뒤로가기</Button>
      </div>
    </Wrapper>
  );
};

export default StudentDetailPage;
