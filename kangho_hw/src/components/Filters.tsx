import React from "react";
import styled from "styled-components";
import Button from "./Button";

interface Props {
  department: string;
  sex: string;
  search: string;

  onDepartmentChange: (v: string) => void;
  onSexChange: (v: string) => void;
  onSearchChange: (v: string) => void;
  onSearchSubmit: () => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
`;

const Select = styled.select`
  padding: 6px 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
`;

const Input = styled.input`
  padding: 6px 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  min-width: 160px;
`;

const Filters: React.FC<Props> = ({
  department,
  sex,
  search,
  onDepartmentChange,
  onSexChange,
  onSearchChange,
  onSearchSubmit,
}) => {
  return (
    <Wrapper>
      <Select
        value={department}
        onChange={(e) => onDepartmentChange(e.target.value)}
      >
        <option value="">전체 학과</option>
        <option value="1">컴퓨터공학과</option>
        <option value="2">경영학과</option>
        <option value="3">디자인학과</option>
      </Select>

      <Button
        variant={sex === "" ? "solid" : "outline"}
        onClick={() => onSexChange("")}
      >
        전체
      </Button>
      <Button
        variant={sex === "남" ? "solid" : "outline"}
        onClick={() => onSexChange("남")}
      >
        남
      </Button>
      <Button
        variant={sex === "여" ? "solid" : "outline"}
        onClick={() => onSexChange("여")}
      >
        여
      </Button>

      <Input
        placeholder="이름 검색"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearchSubmit()}
      />

      <Button onClick={onSearchSubmit}>검색</Button>
    </Wrapper>
  );
};

export default Filters;
