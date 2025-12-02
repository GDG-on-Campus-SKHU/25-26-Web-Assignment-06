import { Routes, Route, Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import StudentListPage from "./pages/StudentList";
import StudentDetailPage from "./pages/StudentDetail";
import StudentEditPage from "./pages/StudentEdit";
import StudentCreatePage from "./pages/StudentCreate";

const Layout = styled.div`
  max-width: 920px;
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.header`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleLink = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
  color: #222;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavItem = styled(NavLink)`
  margin-left: 12px;
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
  color: #7a7a7aff;

  &.active {
    color: #000;
    border-bottom-color: #000;
  }
`;

export default function App() {
  return (
    <Layout>
      <Header>
        <TitleLink to="/">학생 정보 관리</TitleLink>
        <Nav>
          <NavItem to="/" end>
            목록
          </NavItem>
          <NavItem to="/create">학생 등록</NavItem>
        </Nav>
      </Header>

      <Routes>
        <Route path="/" element={<StudentListPage />} />
        <Route path="/students/:id" element={<StudentDetailPage />} />
        <Route path="/students/:id/edit" element={<StudentEditPage />} />
        <Route path="/create" element={<StudentCreatePage />} />
      </Routes>
    </Layout>
  );
}
