import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import styled from "styled-components";

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const ToastContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  opacity: 0.9;
  z-index: 999;
`;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  const showToast = (msg: string) => {
    setMessage(msg);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && <ToastContainer>{message}</ToastContainer>}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx)
    throw new Error("useToast는 ToastProvider 안에서만 사용 가능합니다.");
  return ctx;
}
