import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import './css/style_PatientRegister.css';
import { toast } from "react-hot-toast";


export const Registerpatient = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    altura: "",
    peso: "",
    correo: "",
    contraseña: "",
    genero: "",
    actividadFisica: "",
    telefono: ""
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [errors, setErrors] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, como enviarlo a un servidor
    console.log("Datos del formulario:", formData);
    //Lógica para añadir el nuevo paciente a la base de datos
    /*
    try {
      const response = await fetch('/api/nutriologo/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Paciente registrado exitosamente');
        // Aquí puedes redirigir o limpiar el formulario
      } else {
        setMessage(data.message || 'Error al registrar');
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      toast.error("Error al registrar el usuario");
      setMessage('Error al registrar. Inténtalo de nuevo.');
    }
    */
    toast.success("¡Paciente agregado exitosamente!", {
      position: "top-center",
      style: {
        background: "black",
        color: "white",
      },
    });
    navigate("/Patients-panel");
  };
 
  return(
    <MainLayout>
      <div className="container p-5 fondo">
        <h2 className="text-center mb-4">Formulario de Registro</h2>
        <form onSubmit={handleSubmit}>
          {/* Fila de Nombre y Apellido Paterno */}
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="apellidoPaterno">Apellido Paterno</label>
              <input
                type="text"
                className="form-control"
                id="apellidoPaterno"
                name="apellidoPaterno"
                value={formData.apellidoPaterno}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="apellidoMaterno">Apellido Materno</label>
              <input
                type="text"
                className="form-control"
                id="apellidoMaterno"
                name="apellidoMaterno"
                value={formData.apellidoMaterno}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Fila de Apellido Materno y Fecha de Nacimiento */}
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
              <input
                type="date"
                className="form-control"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
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
              <label htmlFor="altura">Altura (cm)</label>
              <input
                type="number"
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
                    value="masculino"
                    onChange={handleChange}
                    checked={formData.genero === "masculino"}
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
                    value="femenino"
                    onChange={handleChange}
                    checked={formData.genero === "femenino"}
                    required
                  />
                  <label className="form-check-label" htmlFor="generoFemenino">
                    Femenino
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="correo">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>
          </div>
 
          {/* Fila de Contraseña y Altura */}
          <div className="row">
          <div className="col-md-4 mb-3">
              <label htmlFor="telefomo">Telefono</label>
              <input
                type="number"
                className="form-control"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
          <div className="col-md-8 mb-3">
              <label htmlFor="actividadFisica">Actividad Física</label>
              <select
                className="form-control"
                id="actividadFisica"
                name="actividadFisica"
                value={formData.actividadFisica}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona tu nivel de actividad</option>
                <option value="alta">Alta</option>
                <option value="moderada">Moderada</option>
                <option value="baja">Baja</option>
              </select>
            </div>
          </div>

          {/* Fila de Peso y Actividad Física */}
          <div className="row">
          <div className="col-md-4 mb-3">
              <label htmlFor="contraseña">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="contraseña"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="contraseña">Confirmar Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="contraseña"
                name="contraseña"
                value={formData.contraseña}
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