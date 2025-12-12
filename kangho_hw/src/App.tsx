import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import StudentListPage from "./pages/StudentListPage";
import StudentDetailPage from "./pages/StudentDetailPage";
import StudentFormPage from "./pages/StudentFormPage";
import Toast from "./components/Toast";

const App: React.FC = () => {
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<StudentListPage onShowToast={showToast} />} />
        <Route
          path="/create"
          element={<StudentFormPage mode="create" onShowToast={showToast} />}
        />
        <Route path="/students/:id" element={<StudentDetailPage />} />
        <Route
          path="/students/:id/edit"
          element={<StudentFormPage mode="edit" onShowToast={showToast} />}
        />
      </Routes>

      <Toast message={toast} />
    </>
  );
};

export default App;
