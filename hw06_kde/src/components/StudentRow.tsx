import styled from "styled-components";
import { Link } from "react-router-dom";
import type { StudentWithDepartment } from "../types";
import Button from "./Button";

const Tr = styled.tr`
  text-align: center;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
`;

interface Props {
  student: StudentWithDepartment;
  onDelete: (id: number) => void;
}

export default function StudentRow({ student, onDelete }: Props) {
  return (
    <Tr>
      <Td>{student.studentNo}</Td>
      <Td>{student.name}</Td>
      <Td>{student.department?.shortName ?? student.departmentId}</Td>
      <Td>{student.sex}</Td>
      <Td>
        <ButtonGroup>
          <Link to={`/students/${student.id}`}>
            <Button variant="secondary">상세보기</Button>
          </Link>
          <Button
            variant="danger"
            onClick={() => {
              if (window.confirm("정말 삭제하시겠습니까?")) {
                onDelete(student.id);
              }
            }}
          >
            삭제
          </Button>
        </ButtonGroup>
      </Td>
    </Tr>
  );
}
