import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import MainLayout from "../layouts/MainLayout";


export const UpdatePatient = () => {
  // Estados para los campos del formulario
  const [numeroPaciente, setNumeroPaciente] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [sexo, setSexo] = useState('');
  const [edad, setEdad] = useState('');
  const [campoExtra1, setCampoExtra1] = useState('');
  const [campoExtra2, setCampoExtra2] = useState('');

  // Función para manejar el envío del formulario
  const handleGuardar = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para guardar los datos
    console.log({
      numeroPaciente,
      nombre,
      apellidos,
      domicilio,
      sexo,
      edad,
      campoExtra1,
      campoExtra2,
    });
  };

  // Función para manejar el evento de cancelar
  const handleCancelar = () => {
    // Limpiar todos los campos del formulario
    setNumeroPaciente('');
    setNombre('');
    setApellidos('');
    setDomicilio('');
    setSexo('');
    setEdad('');
    setCampoExtra1('');
    setCampoExtra2('');
  };

  return (
    <MainLayout>
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="text-center mb-4">Editar ficha médica</h1>
      <form onSubmit={handleGuardar} className="w-100 w-md-50 p-4 bg-white shadow-sm rounded">
        <div className="mb-3">
          <label className="form-label">Número de paciente o ID</label>
          <input
            type="text"
            className="form-control"
            value={numeroPaciente}
            onChange={(e) => setNumeroPaciente(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Apellidos</label>
          <input
            type="text"
            className="form-control"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Domicilio</label>
          <input
            type="text"
            className="form-control"
            value={domicilio}
            onChange={(e) => setDomicilio(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Sexo</label>
          <select
            className="form-select"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            required
          >
            <option value="">Seleccione...</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Edad</label>
          <input
            type="number"
            className="form-control"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Campo extra 1</label>
          <input
            type="text"
            className="form-control"
            value={campoExtra1}
            onChange={(e) => setCampoExtra1(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Campo extra 2</label>
          <input
            type="text"
            className="form-control"
            value={campoExtra2}
            onChange={(e) => setCampoExtra2(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">Guardar</button>
          <button type="button" onClick={handleCancelar} className="btn btn-danger">Cancelar</button>
        </div>
      </form>
    </div>
    </MainLayout>
  );
};

export default UpdatePatient;
