import React from "react";
import styled from "styled-components";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  limit: number;
  onChange: (page: number) => void;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  gap: 8px;
`;

const PageBtn = styled(Button)<{ active?: boolean }>`
  background: ${({ active }) => (active ? "#4f46e5" : "#e5e7eb")};
  color: ${({ active }) => (active ? "#fff" : "#111827")};
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  limit,
  onChange,
}) => {
  const totalPages = Math.ceil(totalItems / limit);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Wrapper>
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        이전
      </Button>

      {pages.map((p) => (
        <PageBtn
          key={p}
          active={p === currentPage}
          onClick={() => onChange(p)}
        >
          {p}
        </PageBtn>
      ))}

      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        다음
      </Button>
    </Wrapper>
  );
};

export default Pagination;
