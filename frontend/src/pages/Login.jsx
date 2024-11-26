import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";
import { MainLayout } from "../layouts/MainLayout";

export const Login = () => {
  const navigate = useNavigate();
  const { signin, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      email: e.target.inputEmail.value,
      password: e.target.inputPassword.value,
    };
    await signin(credentials);
  };

  return (
    <MainLayout>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh", // Todo el contenedor ocupa el 100% de la pantalla
          margin: 0,
          backgroundColor: "#f8f9fa", // Color de fondo claro
        }}
      >
        <div
          className="card shadow-lg p-4"
          style={{
            width: "90%",          // El ancho se adapta a pantallas pequeñas
            maxWidth: "400px",     // Ancho máximo para pantallas grandes
            borderRadius: "10px",  // Bordes suaves
            height:"450px",
            marginTop: "-50px",
          }}
        >
          <form onSubmit={handleSubmit}>
           <h1 className="mb-3 text-center" style={{ fontSize: "1.5rem" }}>NutriApp</h1>
            <img
              className="mb-4 mx-auto d-block"
              src={logo}
              alt="Logo"
              style={{
                width: "50px",
                height: "50px",
              }}
            />
            <h2 className="h5 mb-3 text-center">Inicia sesión</h2>
            <div className="form-group">
              <label htmlFor="inputEmail">Correo electrónico</label>
              <input
                type="email"
                id="inputEmail"
                className="form-control mb-3"
                placeholder="Correo electrónico"
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">Contraseña</label>
              <input
                type="password"
                id="inputPassword"
                className="form-control mb-3"
                placeholder="Contraseña"
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary btn-block mb-3"
                type="submit"
                style={{ fontSize: "1rem", padding: "5px 10px" }}
              >
                Acceder
              </button>
            </div>

            <div className="text-center">
              <Link to="/register" className="btn btn-link">
                ¿Aún no tienes una cuenta? Registrate ahora
              </Link>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
