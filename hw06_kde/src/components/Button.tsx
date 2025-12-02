import styled from "styled-components";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const StyledButton = styled.button<{
  variant?: "primary" | "secondary" | "danger";
}>`
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;

  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return `
          background-color: #1976d2;
          color: white;
        `;
      case "danger":
        return `
          background-color: #d32f2f;
          color: white;
        `;
      default:
        return `
          background-color: #e0e0e0;
          color: #333;
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({ children, variant, ...rest }: Props) {
  return (
    <StyledButton variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
}
