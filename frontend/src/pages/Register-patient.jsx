import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import './css/style_PatientRegister.css';
import { toast } from "react-hot-toast";

export const Registerpatient = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombres: "",
    apellido_pat: "",
    apellido_mat: "",
    fecha_nacimiento: "",
    altura: "",
    peso: "",
    correo_electronico: "",
    contrasena: "",
    genero: "",
    telefono: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    // Aquí puedes manejar el envío del formulario, como enviarlo a un servidor
    
    try {
      const response = await fetch('http://127.0.0.1:3000/register-paciente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Paciente registrado exitosamente');
        // Aquí puedes redirigir o limpiar el formulario
      } else {
        toast.error(data.message || 'Error al registrar');
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      toast.error("Error al registrar el usuario");
    }
    toast.success("¡Paciente agregado exitosamente!", {
      position: "top-center",
      style: {
        background: "black",
        color: "white",
      },
    });
    navigate("/Regimes-panel");
  };

  return (
    <MainLayout>
      <div className="container p-5 fondo">
        <h2 className="text-center mb-4">Formulario de Registro</h2>
        <form onSubmit={handleSubmit}>
          {/* Fila de Nombre y Apellido Paterno */}
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="nombres">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="apellido_pat">Apellido Paterno</label>
              <input
                type="text"
                className="form-control"
                id="apellido_pat"
                name="apellido_pat"
                value={formData.apellido_pat}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="apellido_mat">Apellido Materno</label>
              <input
                type="text"
                className="form-control"
                id="apellido_mat"
                name="apellido_mat"
                value={formData.apellido_mat}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Fila de Fecha de Nacimiento y Peso */}
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
              <input
                type="date"
                className="form-control"
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="peso">Peso (kg)</label>
              <input
                type="number"
                className="form-control"
                id="peso"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="altura">Altura (m)</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="altura"
                name="altura"
                value={formData.altura}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Fila de Género y Correo */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Género</label>
              <div className="d-flex">
                <div className="form-check me-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="genero"
                    id="generoMasculino"
                    value="M"
                    onChange={handleChange}
                    checked={formData.genero === "M"}
                    required
                  />
                  <label className="form-check-label" htmlFor="generoMasculino">
                    Masculino
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="genero"
                    id="generoFemenino"
                    value="F"
                    onChange={handleChange}
                    checked={formData.genero === "F"}
                    required
                  />
                  <label className="form-check-label" htmlFor="generoFemenino">
                    Femenino
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="correo_electronico">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="correo_electronico"
                name="correo_electronico"
                value={formData.correo_electronico}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Fila de Teléfono y Contraseña */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="contrasena">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="contrasena"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Botón de Registrar centrado */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg mt-3">
              Agregar paciente
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default Registerpatient;
