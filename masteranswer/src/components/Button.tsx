import React from "react";
import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
}

const StyledButton = styled.button<ButtonProps>`
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  border: ${({ variant }) =>
    variant === "outline" ? "1px solid #4f46e5" : "none"};
  background: ${({ variant }) =>
    variant === "outline" ? "#fff" : "#4f46e5"};
  color: ${({ variant }) =>
    variant === "outline" ? "#4f46e5" : "#fff"};

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const Button: React.FC<ButtonProps> = ({ children, variant = "solid", ...rest }) => {
  return (
    <StyledButton variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
