import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {
  const { isAuthenticated, signout } = useAuth();

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid space-between">
        <a className="navbar-brand" href="#">
          NutriApp
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            {/* Other nav items can go here */}
          </ul>
          <ul className="navbar-nav ml-auto">
            {isAuthenticated && (
              <li className="nav-item">
                <Link to="/">
                  <a className="nav-link" href="#" onClick={signout}>
                    Salir
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
