import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { fetchDepartments } from "../api/department";
import { deleteStudent, fetchStudents } from "../api/student";
import type { Department, Sex, StudentWithDepartment } from "../types";
import StudentRow from "../components/StudentRow";
import Pagination from "../components/Pagination";
import StudentFilters from "../components/StudentFilters";

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
  margin-top: 50px;
`;

const TopGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  font-size: 14px;
  background-color: #fafafa;
`;

const Info = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-top: 8px;
`;

const PAGE_LIMIT = 10;

export default function StudentListPage() {
  const [students, setStudents] = useState<StudentWithDepartment[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [departmentId, setDepartmentId] = useState<number | "all">("all");
  const [sex, setSex] = useState<Sex | "all">("all");
  const [sortBy, setSortBy] = useState<"id" | "studentNo" | "name">("id");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 학과 한번 로딩
  useEffect(() => {
    fetchDepartments()
      .then(setDepartments)
      .catch(() => {
        console.error("학과 정보를 불러오지 못했습니다.");
      });
  }, []);

  const totalPages = useMemo(
    () => Math.ceil(totalCount / PAGE_LIMIT),
    [totalCount]
  );

  // 학생 목록 로딩
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const { students, totalCount } = await fetchStudents({
          page,
          limit: PAGE_LIMIT,
          sortBy,
          order,
          departmentId: departmentId === "all" ? undefined : departmentId,
          sex: sex === "all" ? undefined : sex,
          q: query || undefined,
        });

        const deptMap = new Map<number, Department>();
        departments.forEach((d) => deptMap.set(d.id, d));

        const merged: StudentWithDepartment[] = students.map((s) => ({
          ...s,
          department: deptMap.get(s.departmentId),
        }));

        setStudents(merged);
        setTotalCount(totalCount);
      } catch (e) {
        console.error(e);
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [page, sortBy, order, departmentId, sex, departments, query]);

  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      const { students, totalCount } = await fetchStudents({
        page,
        limit: PAGE_LIMIT,
        sortBy,
        order,
        departmentId: departmentId === "all" ? undefined : departmentId,
        sex: sex === "all" ? undefined : sex,
        q: query || undefined,
      });

      const deptMap = new Map<number, Department>();
      departments.forEach((d) => deptMap.set(d.id, d));

      const merged: StudentWithDepartment[] = students.map((s) => ({
        ...s,
        department: deptMap.get(s.departmentId),
      }));

      setStudents(merged);
      setTotalCount(totalCount);
    } catch (e) {
      console.error(e);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setQuery(searchInput.trim());
      setPage(1);
    }
  };

  const handleResetSearch = () => {
    setSearchInput("");
    setQuery("");
    setDepartmentId("all");
    setSex("all");
    setSortBy("id");
    setOrder("asc");
    setPage(1);
  };

  if (loading) return <div>불러오는 중...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <SearchRow>
        <input
          type="text"
          placeholder="이름 / 학번 검색"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          style={{
            padding: "8px",
            borderRadius: 4,
            border: "1px solid #ccc",
            width: 200,
          }}
        />

        <button
          type="button"
          onClick={handleResetSearch}
          style={{
            padding: "6px 10px",
            borderRadius: 4,
            border: "1px solid #ccc",
            backgroundColor: "#f5f5f5",
            cursor: "pointer",
          }}
        >
          초기화
        </button>
      </SearchRow>

      <TopGroup>
        <StudentFilters
          departments={departments}
          departmentId={departmentId}
          sex={sex}
          sortBy={sortBy}
          order={order}
          onChangeDepartment={(v) => {
            setDepartmentId(v);
            setPage(1);
          }}
          onChangeSex={(v) => {
            setSex(v);
            setPage(1);
          }}
          onChangeSort={(field, ord) => {
            setSortBy(field);
            setOrder(ord);
            setPage(1);
          }}
        />

        <Info>총 {totalCount}명</Info>
      </TopGroup>

      <Table>
        <thead>
          <tr>
            <Th>학번</Th>
            <Th>이름</Th>
            <Th>학과</Th>
            <Th>성별</Th>
            <Th>상세보기 & 삭제</Th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <StudentRow key={s.id} student={s} onDelete={handleDelete} />
          ))}
        </tbody>
      </Table>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
