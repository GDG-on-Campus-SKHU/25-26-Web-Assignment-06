import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { fetchStudents, deleteStudent } from "../api";
import { Student } from "../types/student";
import StudentCard from "../components/StudentCard";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import Button from "../components/Button";

const Wrapper = styled.div`
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th<{ sortable?: boolean }>`
  text-align: left;
  padding: 8px 12px;
  border-bottom: 1px solid #e5e7eb;
  cursor: ${({ sortable }) => (sortable ? "pointer" : "default")};
`;

const InfoText = styled.p`
  margin-top: 16px;
`;

interface Props {
  onShowToast: (msg: string) => void;
}

const LIMIT = 10;

const StudentListPage: React.FC<Props> = ({ onShowToast }) => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState(1);

  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [department, setDepartment] = useState("");
  const [sex, setSex] = useState("");
  const [search, setSearch] = useState("");
  const [searchParam, setSearchParam] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadList = async () => {
    try {
      setLoading(true);
      setError("");

      const params: any = {
        _page: page,
        _limit: LIMIT,
        _sort: sortField,
        _order: sortOrder,
      };

      if (department) params.departmentId = department;
      if (sex) params.sex = sex;
      if (searchParam) params.q = searchParam;

      const res = await fetchStudents(params);
      setStudents(res.data);
      const totalCount = Number(res.headers["x-total-count"]) || res.data.length;
      setTotal(totalCount);
    } catch (err) {
      console.error(err);
      setError("데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortField, sortOrder, department, sex, searchParam]);

  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      onShowToast("삭제되었습니다.");
      loadList();
    } catch {
      onShowToast("삭제 실패");
    }
  };

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <Wrapper>
      <Header>
        <Title>학생 목록</Title>
        <Button onClick={() => navigate("/create")}>학생 등록</Button>
      </Header>

      <Filters
        department={department}
        sex={sex}
        search={search}
        onDepartmentChange={setDepartment}
        onSexChange={setSex}
        onSearchChange={setSearch}
        onSearchSubmit={() => {
          setPage(1);
          setSearchParam(search);
        }}
      />

      {loading && <InfoText>불러오는 중…</InfoText>}
      {error && <InfoText>{error}</InfoText>}
      {!loading && !error && students.length === 0 && (
        <InfoText>데이터가 없습니다.</InfoText>
      )}

      {!loading && !error && students.length > 0 && (
        <>
          <Table>
            <thead>
              <tr>
                <Th
                  sortable
                  onClick={() => toggleSort("id")}
                >
                  학번 {sortField === "id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </Th>
                <Th
                  sortable
                  onClick={() => toggleSort("name")}
                >
                  이름 {sortField === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </Th>
                <Th>학과</Th>
                <Th>성별</Th>
                <Th>액션</Th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </Table>

          <Pagination
            currentPage={page}
            totalItems={total}
            limit={LIMIT}
            onChange={setPage}
          />
        </>
      )}
    </Wrapper>
  );
};

export default StudentListPage;
