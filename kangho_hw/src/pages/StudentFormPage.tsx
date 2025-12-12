import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { createStudent, fetchStudent, updateStudent } from "../api";
import Button from "../components/Button";
import { Student } from "../types/student";

const Wrapper = styled.div`
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 22px;
  margin-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 4px;
`;

const Input = styled.input`
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`;

interface Props {
  mode: "create" | "edit";
  onShowToast: (msg: string) => void;
}

const StudentFormPage: React.FC<Props> = ({ mode, onShowToast }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    name: "",
    studentId: "",
    sex: "",
    department: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  // 수정 모드일 때 기존 데이터 불러오기
  useEffect(() => {
    if (!isEdit || !id) return;

    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchStudent(id);
        const s = res.data;

        setForm({
          name: s.name,
          studentId: s.studentId?.toString() ?? s.id.toString(),
          sex: s.sex,
          department: s.department,
          email: s.email,
        });
      } catch {
        onShowToast("데이터 불러오기 실패");
      } finally {
        setLoading(false);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEdit && id) {
        await updateStudent(id, form);
        onShowToast("수정 완료");
        navigate(`/students/${id}`);
      } else {
        await createStudent(form);
        onShowToast("등록 완료");
        navigate("/");
      }
    } catch {
      onShowToast("저장 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>{isEdit ? "학생 정보 수정" : "학생 등록"}</Title>

      <Form onSubmit={handleSubmit}>
        <Label>
          이름
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Label>

        <Label>
          학번
          <Input
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            required
          />
        </Label>

        <Label>
          성별
          <Select name="sex" value={form.sex} onChange={handleChange} required>
            <option value="">선택하세요</option>
            <option value="남">남</option>
            <option value="여">여</option>
          </Select>
        </Label>

        <Label>
          학과
          <Input
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          />
        </Label>

        <Label>
          이메일
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </Label>

        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          <Button type="submit" disabled={loading}>
            {isEdit ? "수정하기" : "등록하기"}
          </Button>

          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            취소
          </Button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default StudentFormPage;
