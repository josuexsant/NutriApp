import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Importa el JS de Bootstrap
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import "./css/style_dashboard.css";

export const Dashboard = () => {
  const navigate = useNavigate();

  // TODO: Hacer api de estos datos
  // Datos de ejemplo para los pacientes
  const [patients, setPatients] = useState([
    { id: 1, name: "Paciente 1" },
    { id: 2, name: "Paciente 2" },
    { id: 3, name: "Paciente 3" },
    { id: 4, name: "Paciente 4" },
    { id: 5, name: "Paciente 5" },
    { id: 6, name: "Paciente 6" },
  ]);

  // Opciones del menú desplegable
  const menuOptions = [
    { label: "Estadísticas", route: "/home" },
    { label: "Ver régimen", route: "/Regimes-panel" },
    { label: "Ver paciente", route: "/patient" },
  ];

  // Navegación sin ID
  const handleNavigate = (route) => {
    navigate(route); // Solo navega a la ruta sin pasar el ID
  };

  return (
    <MainLayout>
      {/* Contenedor Principal */}
      <div className="container-fluid d-flex flex-column justify-content-between vh-100">
        <div className="container my-5">
          <h1 className="mb-4">Panel de Pacientes</h1>

          {/* Boton para agregar pacientes */}
          <div className="mb-4 d-flex w-100 justify-content-end">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/Register-patient")}
            >
              Agregar Paciente
            </button>
          </div>

          {/* Contenedor de Tarjetas */}
          <div className="row">
            {patients.map((patient) => (
              <div key={patient.id} className="col-md-3 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{patient.name}</h5>
                    {/* Menú desplegable */}
                    <div className="dropdown mt-auto text-end">
                      <button
                        className="btn btn-light dropdown-toggle"
                        type="button"
                        id={`dropdownMenuButton${patient.id}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Opciones
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby={`dropdownMenuButton${patient.id}`}
                      >
                        {menuOptions.map((option, index) => (
                          <li key={index}>
                            <button
                              className="dropdown-item"
                              onClick={() => handleNavigate(option.route)} // Redirige sin el ID
                            >
                              {option.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
