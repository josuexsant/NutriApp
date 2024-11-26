import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import './css/style_regimenTiempos.css';

export const RegimenTiempos = () => {
  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const grupos = [
    { grupo: "Cereales sin grasa", kcal: 0 },
    { grupo: "Frutas", kcal: 0 },
    { grupo: "Verduras", kcal: 0 },
    { grupo: "Alimentos de origen animal (Muy bajo en grasa)", kcal: 0 },
    { grupo: "Alimentos de origen animal (Bajo en grasa)", kcal: 0 },
    { grupo: "Leche y sustitutos", kcal: 0 },
    { grupo: "Leguminosas", kcal: 0 },
    { grupo: "Grasas", kcal: 0 },
  ];

  // Estado para almacenar las calorías totales de cada día
  const [caloriasPorDia, setCaloriasPorDia] = useState({
    Lunes: "",
    Martes: "",
    Miércoles: "",
    Jueves: "",
    Viernes: "",
    Sábado: "",
    Domingo: ""
  });

  // Estado para el mensaje de error
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let errorMsg = "";
    // Recorremos cada día de la semana para validar las calorías
    diasSemana.forEach(dia => {
      const caloriasTotalesDia = parseFloat(caloriasPorDia[dia]) || 0;
      let totalCalorias = 0;
      const caloriasInputs = document.querySelectorAll(`input[name="kcal-${dia}"]`);

      caloriasInputs.forEach((input) => {
        totalCalorias += parseFloat(input.value) || 0;
      });

      // Verificamos si la suma de las calorías excede el total ingresado para ese día
      if (totalCalorias > caloriasTotalesDia) {
        errorMsg = `La suma de las calorías para ${dia} excede el total ingresado.`;
      }
    });

    if (errorMsg) {
      setError(errorMsg);
    } else {
      setError("");
      // Lógica para guardar el régimen
      alert("Régimen guardado correctamente!");
    }
  };

  return (
    <MainLayout>
      <div className="container-fluid vh-100 d-flex flex-column justify-content-start align-items-start">
        <div className="letra">Paciente: </div>
        <div className="letra">Tipo de régimen: Por tiempo</div>
        <hr style={{ border: '1px solid black', width: '100%' }} />

        <form className="w-100" onSubmit={handleSubmit}>
          {diasSemana.map((dia, index) => (
            <div key={index}>
              {/* Título de cada día */}
              <div className="d-flex justify-content-start align-items-center mb-3">
                <p className="mb-0 me-3 titulo">Regímen para {dia}</p>
                <div className="d-flex align-items-center titulo">
                  <label htmlFor={`caloriasTotales${dia}`} className="form-label mb-0 me-2">
                    (Total calorías por día:
                  </label>
                  <input
                    id={`caloriasTotales${dia}`}
                    type="number"
                    className="form-control"
                    style={{ width: "80px", height: "35px" }}
                    min="800"
                    step="1"
                    value={caloriasPorDia[dia] || ""}
                    onChange={(e) => setCaloriasPorDia({
                      ...caloriasPorDia,
                      [dia]: e.target.value
                    })}
                  />
                  <span>&nbsp;</span> )
                </div>
              </div>

              {/* Tabla para cada día */}
              <div className="table-responsive mb-4">
                <table className="table table-bordered text-center">
                  {/* Encabezado */}
                  <thead className="bg-light">
                    <tr>
                      <th>Grupo</th>
                      <th>Porción (kcal)</th>
                      <th>Desayuno</th>
                      <th>Colación</th>
                      <th>Comida</th>
                      <th>Colación</th>
                      <th>Cena</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grupos.map((item, index) => (
                      <tr key={index}>
                        <td>{item.grupo}</td>
                        <td>
                          <input
                            name={`kcal-${dia}`}
                            type="number"
                             min="0"
                            className="form-control"
                            defaultValue={item.kcal}
                            style={{ width: "70px", margin: "auto" }}
                          />
                        </td>
                        {["Desayuno", "Colación", "Comida", "Colación", "Cena"].map(
                          (meal, idx) => (
                            <td key={idx}>
                              {/* Tres inputs para cada tiempo */}
                              <div className="d-flex flex-column gap-1">
                                {[1, 2, 3].map((subIdx) => (
                                  <input
                                    key={subIdx}
                                    type="text"
                                    className="form-control"
                                    placeholder={`Opción ${subIdx}`}
                                  />
                                ))}
                              </div>
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Mensaje de error si las calorías exceden el total */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Botón de guardar */}
          <div className="d-flex justify-content-end mt-4">
            <button type="submit" className="btn btn-primary">Guardar régimen</button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default RegimenTiempos;
