import styled from "styled-components";
import Button from "./Button";

const PaginationWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageButton = styled(Button)<{ $active?: boolean }>`
  ${({ $active }) =>
    $active
      ? `
    background-color: #1976d2;
    color: white;
  `
      : ""}
`;

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages === 0) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationWrapper>
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        이전
      </Button>
      {pages.map((p) => (
        <PageButton
          key={p}
          $active={p === currentPage}
          onClick={() => onPageChange(p)}
        >
          {p}
        </PageButton>
      ))}
      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        다음
      </Button>
    </PaginationWrapper>
  );
}
