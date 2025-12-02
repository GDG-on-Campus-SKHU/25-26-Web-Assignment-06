import styled from "styled-components";
import type { Department, Sex } from "../types";
import Button from "./Button";

const Wrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
`;

const Select = styled.select`
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Label = styled.label`
  font-size: 14px;
`;

interface Props {
  departments: Department[];
  departmentId: number | "all";
  sex: Sex | "all";
  sortBy: "id" | "studentNo" | "name";
  order: "asc" | "desc";
  onChangeDepartment: (value: number | "all") => void;
  onChangeSex: (value: Sex | "all") => void;
  onChangeSort: (
    sortBy: "id" | "studentNo" | "name",
    order: "asc" | "desc"
  ) => void;
}

export default function StudentFilters({
  departments,
  departmentId,
  sex,
  sortBy,
  order,
  onChangeDepartment,
  onChangeSex,
  onChangeSort,
}: Props) {
  const handleDeptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "all") onChangeDepartment("all");
    else onChangeDepartment(Number(val));
  };

  const sortLabel = (field: "studentNo" | "name") => {
    if (sortBy !== field) return "";
    return order === "asc" ? "▲" : "▼";
  };

  return (
    <Wrapper>
      <Label>
        학과:&nbsp;
        <Select
          value={departmentId === "all" ? "all" : String(departmentId)}
          onChange={handleDeptChange}
        >
          <option value="all">전체</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.shortName}
            </option>
          ))}
        </Select>
      </Label>

      <Label>
        성별:&nbsp;
        <Button
          variant={sex === "all" ? "primary" : "secondary"}
          onClick={() => onChangeSex("all")}
        >
          전체
        </Button>
        <Button
          variant={sex === "남" ? "primary" : "secondary"}
          onClick={() => onChangeSex("남")}
        >
          남
        </Button>
        <Button
          variant={sex === "여" ? "primary" : "secondary"}
          onClick={() => onChangeSex("여")}
        >
          여
        </Button>
      </Label>

      <Label>
        정렬:&nbsp;
        <Button
          variant={sortBy === "studentNo" ? "primary" : "secondary"}
          onClick={() =>
            onChangeSort(
              "studentNo",
              sortBy === "studentNo" && order === "asc" ? "desc" : "asc"
            )
          }
        >
          학번 {sortLabel("studentNo")}
        </Button>
        <Button
          variant={sortBy === "name" ? "primary" : "secondary"}
          onClick={() =>
            onChangeSort(
              "name",
              sortBy === "name" && order === "asc" ? "desc" : "asc"
            )
          }
        >
          이름 {sortLabel("name")}
        </Button>
      </Label>
    </Wrapper>
  );
}
