import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

export const RegimesPanel = () => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path); // Redirige a la ruta especificada
  };

  return (
    <MainLayout>
      <div className="container-fluid d-flex flex-column justify-content-between vh-100">
        <div className="container my-5">
          <h2 className="text-center mt-5">Regímenes Panel</h2>
          <div className="container mt-5">
            <div className="text-center">
              <h5>Paciente: Nombre</h5>
              <p>Tu paciente aún no tiene régimen, ponle uno:</p>
              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn btn-outline-dark mx-2"
                  onClick={() => handleButtonClick('/Regimen-por-tiempos')}
                >
                  Por tiempos
                </button>
                <button
                  className="btn btn-outline-dark mx-2"
                  onClick={() => handleButtonClick('/home')}
                >
                  Consumo diario
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegimesPanel;