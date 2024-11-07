import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';


 export const RegisterRegime = () =>{
  const [nombreRegimen, setNombreRégimen] = useState('');
  const [alimentos, setAlimentos] = useState(Array(6).fill(''));
  const [caracteristicas, setCaracterísticas] = useState('');

  const handleAlimentoChange = (index, value) => {
    const newAlimentos = [...alimentos];
    newAlimentos[index] = value;
    setAlimentos(newAlimentos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nombreRegimen, alimentos, caracteristicas });
  };

  const handleCancel = () => {
    setNombreRégimen('');
    setAlimentos(Array(6).fill(''));
    setCaracterísticas('');
  };

  return (
    <MainLayout>
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="text-center mb-4">Registro nuevo régimen</h1>
      <form onSubmit={handleSubmit} className="w-100 w-md-50 p-4 bg-white shadow-sm rounded">
        <div className="mb-3">
          <label className="form-label">Nombre del régimen</label>
          <input
            type="text"
            className="form-control"
            value={nombreRegimen}
            onChange={(e) => setNombreRégimen(e.target.value)}
            required />
        </div>

        {alimentos.map((alimento, index) => (
          <div key={index} className="mb-3">
            <label className="form-label">Alimento {index + 1}</label>
            <input
              type="text"
              className="form-control"
              placeholder={`Alimento ${index + 1}`}
              value={alimento}
              onChange={(e) => handleAlimentoChange(index, e.target.value)} />
          </div>
        ))}

        <div className="mb-3">
          <label className="form-label">Características</label>
          <textarea
            className="form-control"
            value={caracteristicas}
            onChange={(e) => setCaracterísticas(e.target.value)}
            rows={4} />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">Crear</button>
          <button type="button" onClick={handleCancel} className="btn btn-danger">Cancelar</button>
        </div>
      </form>
    </div>
    </MainLayout>
  );
}

export default RegisterRegime;
