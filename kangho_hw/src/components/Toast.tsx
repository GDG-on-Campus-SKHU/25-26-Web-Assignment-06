import React from "react";
import styled from "styled-components";

interface Props {
  message: string;
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  background: #111827;
  color: #fff;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  z-index: 9999;
`;

const Toast: React.FC<Props> = ({ message }) => {
  if (!message) return null;
  return <Wrapper>{message}</Wrapper>;
};

export default Toast;
