import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Student } from "../types/student";
import Button from "./Button";

interface Props {
  student: Student;
  onDelete: (id: number) => void;
}

const Row = styled.tr`
  &:nth-child(even) {
    background: #f9fafb;
  }
`;

const Cell = styled.td`
  padding: 8px 12px;
  font-size: 14px;
`;

const ActionCell = styled.td`
  padding: 8px 12px;
  display: flex;
  gap: 8px;
`;

const StudentCard: React.FC<Props> = ({ student, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onDelete(student.id);
    }
  };

  return (
    <Row>
      <Cell>{student.id}</Cell>
      <Cell>{student.name}</Cell>
      <Cell>{student.department}</Cell>
      <Cell>{student.sex}</Cell>
      <ActionCell>
        <Button onClick={() => navigate(`/students/${student.id}`)}>
          상세보기
        </Button>
        <Button variant="outline" onClick={handleDelete}>
          삭제
        </Button>
      </ActionCell>
    </Row>
  );
};

export default StudentCard;
