import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../components/css/styles.css";
import { useAuth } from "../hooks/useAuth";

export const NavbarComponent = () => {
  const { isAuthenticated, signout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Determina si es una página de autenticación (login o register)
  const isAuthPage = location.pathname === "/" || location.pathname === "/register";
  const title = isAuthPage ? "Sistema de Seguimiento Alimenticio (SSA)" : "NutriApp";

  // Función para manejar la navegación
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <Navbar className="custom-navbar" bg="primary" variant="dark" expand="md" fixed="top">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Título o Marca */}
        <Navbar.Brand href="#" className="text-white">
          {title}
        </Navbar.Brand>

        {/* Opciones de navegación */}
        {!isAuthPage && (
          <Nav className="d-flex align-items-center">
            <Nav.Link className="text-white" onClick={() => navigateTo("/dashboard")}>
              Inicio
            </Nav.Link>
            <Nav.Link className="text-white">
              Estadísticas
            </Nav.Link>
            <Nav.Link className="text-white " onClick={signout}>
              Cerrar sesion
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;