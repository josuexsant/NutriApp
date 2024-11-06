import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../pages/css/style_pacienteWeb.css";
import logo from "../assets/logo.png";
import Footer from '../components/Footer';

export const PacienteWeb = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();
  const [alimentos, setAlimentos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    calorias: 0,
    proteinas: 0,
    carbohidratos: 0,
  });

  const totalCalorias = alimentos.reduce((acc, item) => acc + item.calorias, 0);
  const totalProteinas = alimentos.reduce((acc, item) => acc + item.proteinas, 0);
  const totalCarbohidratos = alimentos.reduce((acc, item) => acc + item.carbohidratos, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "nombre" ? value : parseFloat(value) || 0,
    });
  };

  const handleAddAlimento = () => {
    setAlimentos([...alimentos, formData]);
    setFormData({ nombre: "", calorias: 0, proteinas: 0, carbohidratos: 0 });
  };

  const handleLogout = () => {
    signout();
    navigate("/");
  };

  return (
    <div className="paciente-web">
      <header className="header bg-dark text-white p-3">
        <div className="d-flex justify-content-between align-items-center">
          <img src={logo} alt="Logo" className="logo" />
          <div className="header-buttons">
            <button className="btn btn-light mx-2">Notificaciones</button>
            <button className="btn btn-light mx-2">Bandeja</button>
            <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </div>
      </header>
      
      <main className="main-content p-4">
        <section className="stats-section mb-4">
          <h2>Estadísticas del Día</h2>
          <div className="card p-3">
            <p><strong>Calorías:</strong> {totalCalorias} kcal</p>
            <p><strong>Proteínas:</strong> {totalProteinas} g</p>
            <p><strong>Carbohidratos:</strong> {totalCarbohidratos} g</p>
          </div>
        </section>

        <section className="consumed-list-section mb-4">
          <h3>Registro de Consumo</h3>
          {alimentos.length > 0 ? (
            <ul className="list-group">
              {alimentos.map((alimento, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>{alimento.nombre}</strong>
                  <span>{alimento.calorias} kcal, {alimento.proteinas} g de proteínas, {alimento.carbohidratos} g de carbohidratos</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No se ha agregado ningún alimento.</p>
          )}
        </section>

        <section className="form-section">
          <h3>Agregar Alimento</h3>
          <form onSubmit={(e) => e.preventDefault()} className="card p-3">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre del alimento</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Nombre del alimento"
                value={formData.nombre}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="calorias" className="form-label">Calorías</label>
              <input
                type="number"
                id="calorias"
                name="calorias"
                placeholder="Calorías"
                value={formData.calorias || ""}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="proteinas" className="form-label">Proteínas</label>
              <input
                type="number"
                id="proteinas"
                name="proteinas"
                placeholder="Proteínas"
                value={formData.proteinas || ""}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="carbohidratos" className="form-label">Carbohidratos</label>
              <input
                type="number"
                id="carbohidratos"
                name="carbohidratos"
                placeholder="Carbohidratos"
                value={formData.carbohidratos || ""}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <button type="button" className="btn btn-primary w-100" onClick={handleAddAlimento}>Agregar</button>
          </form>
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default PacienteWeb;
