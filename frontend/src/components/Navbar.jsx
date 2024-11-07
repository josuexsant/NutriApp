import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useLocation } from "react-router-dom";

export const NavbarComponent = () => {
  const { isAuthenticated, signout } = useAuth();
  const location = useLocation();

  // Determina si es una página de autenticación (login o register)
  const isAuthPage = location.pathname === "/" || location.pathname === "/register";
  const title = isAuthPage ? "Sistema de Seguimiento Alimenticio (SSA)" : "NutriApp";

  return (
<<<<<<< HEAD
    <Navbar style={{ backgroundColor: '#1abc9c'}} variant="dark" expand="md" fixed="top">
      <Container className={`d-flex ${isAuthPage ? 'justify-content-center' : 'justify-content-between align-items-center'}`}>
=======
    <Navbar bg="primary" variant="dark" expand="md" fixed="top">
      <Container className={`d-flex ${isAuthPage ? 'justify-content-center' : 'justify-content-between align-items-center'}`}>
        {/* Botón de regreso (no mostrar en login/register) */}
        {!isAuthPage && (
          <Button variant="light">
            <i className="bi bi-arrow-left"></i> 
          </Button>
        )}
>>>>>>> mi-repositorio/master

        {/* Título o Marca */}
        <Navbar.Brand className={isAuthPage ? "mx-auto" : ""} href="#">
          {title}
        </Navbar.Brand>

        {/* Íconos y botón de cerrar sesión (solo si no estamos en login/register) */}
        {!isAuthPage && (
          <Nav className="ml-auto d-flex align-items-center">
            <Nav.Link className="text-white">
              <i className="bi bi-bell"></i> 
            </Nav.Link>
            <Nav.Link className="text-white">
              <i className="bi bi-envelope"></i> 
            </Nav.Link>
            {isAuthenticated && (
              <Button variant="outline-danger" onClick={signout} className="ms-2">
                Cerrar sesión
              </Button>
            )}
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
