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

  const [caloriasPorDia, setCaloriasPorDia] = useState({
    Lunes: "",
    Martes: "",
    Miércoles: "",
    Jueves: "",
    Viernes: "",
    Sábado: "",
    Domingo: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let errorMsg = "";
    diasSemana.forEach(dia => {
      const caloriasTotalesDia = parseFloat(caloriasPorDia[dia]) || 0;
      if (caloriasTotalesDia <= 0) {
        errorMsg = "Por favor, ingrese el total de calorías para cada día.";
        return;
      }

      // Verificar si todos los campos de calorías de la segunda tabla están llenos
      const caloriasInputs = document.querySelectorAll(`input[name="kcal-${dia}"]`);
      let totalCalorias = 0;
      let camposIncompletos = false;

      caloriasInputs.forEach((input) => {
        const inputValue = parseFloat(input.value) || 0;
        if (inputValue === 0) camposIncompletos = true; // Si algún input está vacío o con 0
        totalCalorias += inputValue;
      });

      if (camposIncompletos) {
        errorMsg = `Por favor, complete todos los campos de calorías para ${dia}.`;
        return;
      }

      if (totalCalorias > caloriasTotalesDia) {
        errorMsg = `La suma de las calorías para ${dia} excede el total ingresado.`;
        return;
      }
    });

    if (errorMsg) {
      setError(errorMsg);
    } else {
      setError("");
      alert("Régimen guardado correctamente!");
    }
  };

  return (
    <MainLayout>
      <div className="container-fluid d-flex flex-column justify-content-between" style={{ minHeight: "100vh" }}>
        <div className="content">
          <div className="letra">Paciente: </div>
          <div className="letra">Tipo de régimen: Por tiempo</div>
          <hr style={{ border: '1px solid black', width: '100%' }} />

          <form className="w-100" onSubmit={handleSubmit}>
            {diasSemana.map((dia, index) => (
              <div key={index}>
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

                <div className="table-responsive mb-4">
                  <table className="table table-bordered text-center">
                    <thead className="bg-light">
                      <tr>
                        {grupos.map((item, index) => (
                          <th key={index}>{item.grupo}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {grupos.map((item, index) => (
                          <td key={index}>
                            <input
                              name={`kcal-${dia}`}
                              type="number"
                              min="0"
                              className="form-control"
                              defaultValue={item.kcal}
                              style={{ width: "70px", margin: "auto" }}
                            />
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="table-responsive mb-4">
                  <table className="table table-bordered text-center">
                    <thead className="bg-light">
                      <tr>
                        <th>Desayuno</th>
                        <th>Colación</th>
                        <th>Comida</th>
                        <th>Colación</th>
                        <th>Cena</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {["Desayuno", "Colación", "Comida", "Colación", "Cena"].map((meal, idx) => (
                          <td key={idx}>
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
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <hr/>
              </div>
            ))}

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="d-flex justify-content-end mt-4">
              <button type="submit" className="btn btn-primary">Guardar régimen</button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegimenTiempos;
