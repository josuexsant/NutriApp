import "bootstrap/dist/css/bootstrap.min.css";
import { MainLayout } from "../layouts/MainLayout";
import './css/style_dashboard.css';
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();

  const handlePacientePanelClick = () => {
    navigate("/pacienteweb");
  }

  return (
    <MainLayout>
      <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-start">
        <h1 className='title'>Bienvenido a Dashboard</h1>
      
        <div className="row w-100">
          <div className="col-12 mb-4">
            <div className="d-grid">
					    <button type="button"
               className="btn btn-primary btn-lg text-start btn-text"
               onClick={handlePacientePanelClick}
               >Panel Pacientes</button> 
				    </div>
          </div>

          <div className="col-12 mb-4">
            <div className="d-grid">
					    <button type="button" className="btn btn-primary btn-lg text-start btn-text">Panel Régimenes</button> 
				    </div>
          </div>

          <div className="col-12 mb-4">
            <div className="d-grid">
					    <button type="button" className="btn btn-primary btn-lg text-start btn-text">Panel Estadísticas</button> 
				    </div>
          </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default Dashboard;
