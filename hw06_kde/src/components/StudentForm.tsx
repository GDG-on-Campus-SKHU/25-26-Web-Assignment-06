import { useEffect, useState } from "react";
import styled from "styled-components";
import type { Department, Sex, Student } from "../types";
import Button from "./Button";

const Form = styled.form`
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
`;

const Field = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  width: 100%;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Actions = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
`;

interface FormValues {
  name: string;
  studentNo: string;
  email: string;
  phone: string;
  sex: Sex;
  departmentId: number;
}

interface Props {
  departments: Department[];
  initialValues?: Student;
  onSubmit: (values: FormValues) => Promise<void> | void;
  submitLabel: string;
  onCancel?: () => void;
}

export default function StudentForm({
  departments,
  initialValues,
  onSubmit,
  submitLabel,
  onCancel,
}: Props) {
  const [values, setValues] = useState<FormValues>({
    name: "",
    studentNo: "",
    email: "",
    phone: "",
    sex: "남",
    departmentId: departments[0]?.id ?? 1,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setValues({
        name: initialValues.name,
        studentNo: initialValues.studentNo,
        email: initialValues.email,
        phone: initialValues.phone,
        sex: initialValues.sex,
        departmentId: initialValues.departmentId,
      });
    }
  }, [initialValues]);

  const handleChange =
    (field: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        field === "departmentId" ? Number(e.target.value) : e.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
    };

  const handleSexChange = (sex: Sex) => {
    setValues((prev) => ({ ...prev, sex }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label>이름</Label>
        <Input value={values.name} onChange={handleChange("name")} required />
      </Field>

      <Field>
        <Label>학번</Label>
        <Input
          value={values.studentNo}
          onChange={handleChange("studentNo")}
          required
        />
      </Field>

      <Field>
        <Label>성별</Label>
        <RadioGroup>
          <label>
            <input
              type="radio"
              value="남"
              checked={values.sex === "남"}
              onChange={() => handleSexChange("남")}
            />
            남
          </label>
          <label>
            <input
              type="radio"
              value="여"
              checked={values.sex === "여"}
              onChange={() => handleSexChange("여")}
            />
            여
          </label>
        </RadioGroup>
      </Field>

      <Field>
        <Label>학과</Label>
        <Select
          value={values.departmentId}
          onChange={handleChange("departmentId")}
        >
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        <Label>이메일</Label>
        <Input
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          required
        />
      </Field>

      <Field>
        <Label>전화번호</Label>
        <Input value={values.phone} onChange={handleChange("phone")} required />
      </Field>

      <Actions>
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" onClick={onCancel}>
            취소
          </Button>
        )}
      </Actions>
    </Form>
  );
}
