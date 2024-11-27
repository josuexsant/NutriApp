import * as React from "react";
import MainLayout from "../layouts/MainLayout";

// Crear componentes básicos reutilizables para estructura y estilos
const Table = ({ children }) => <table className="w-full table-auto">{children}</table>;
const TableHeader = ({ children }) => <thead className="bg-gray-100">{children}</thead>;
const TableBody = ({ children }) => <tbody>{children}</tbody>;
const TableRow = ({ children }) => <tr className="border-b">{children}</tr>;
const TableHead = ({ children, className }) => (
  <th className={`py-2 px-4 text-left ${className || ""}`}>{children}</th>
);
const TableCell = ({ children, className }) => (
  <td className={`py-2 px-4 ${className || ""}`}>{children}</td>
);

// Input básico con soporte para validaciones
const Input = ({ value, onChange, className, ...props }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    className={`border rounded-lg ${className || ""}`}
    {...props} // Permite añadir atributos adicionales como validaciones o IDs
  />
);

// Card estructurado para secciones del formulario
const Card = ({ children, className }) => <div className={`shadow-md rounded-lg ${className}`}>{children}</div>;
const CardHeader = ({ children }) => <div className="p-4 bg-gray-200 rounded-t-lg">{children}</div>;
const CardContent = ({ children }) => <div className="p-4">{children}</div>;
const CardTitle = ({ children }) => <h3 className="text-lg font-semibold">{children}</h3>;

// Componente principal del formulario
export const Register_regimenesCD = () => {
  // Estado inicial con datos de ejemplo
  const [foodItems, setFoodItems] = React.useState({
    lunes: [
      { group: "Frutas", calories: "50", option1: "Manzana", alternative1: "Plátano", alternative2: "Naranja", totalCalories: "50"},
      { group: "A. origen animal", calories: "150", option1: "Huevo con jamón", alternative1: "Queso panela", alternative2: "Pollo deshebrado", totalCalories: "150" },
      { group: "Verduras", calories: "100", option1: "Zanahorias", alternative1: "Brócoli al vapor", alternative2: "Calabacitas", totalCalories: "100"},
      { group: "Leguminosas", calories: "80", option1: "Frijoles", alternative1: "Lentejas", alternative2: "Garbanzos", totalCalories: "80" },
      { group: "Leche y sustitutos", calories: "120", option1: "Leche descremada", alternative1: "Yogurt natural", alternative2: "Leche de almendras", totalCalories: "120"},
      { group: "Cereales", calories: "150", option1: "Avena", alternative1: "Granola", alternative2: "Arroz integral", totalCalories: "150"},
      { group: "Grasas", calories: "50", option1: "Aceite de oliva", alternative1: "Aguacate", alternative2: "Almendras", totalCalories: "50"},
      { group: "Azucares", calories: "30", option1: "Miel", alternative1: "Stevia", alternative2: "Azúcar moreno", totalCalories: "30" }
    ],
    martes: [
      { group: "Frutas", calories: "60", option1: "Fresas", alternative1: "Mango", alternative2: "Manzana", totalCalories: "60" },
      { group: "A. origen animal", calories: "180", option1: "Pollo a la plancha", alternative1: "Pescado al horno", alternative2: "Carne de res", totalCalories: "180" },
      { group: "Verduras", calories: "110", option1: "Espinacas", alternative1: "Lechuga romana", alternative2: "Pepino", totalCalories: "110" },
      { group: "Leguminosas", calories: "90", option1: "Frijoles negros", alternative1: "Habas", alternative2: "Lentejas", totalCalories: "90"},
      { group: "Leche y sustitutos", calories: "130", option1: "Leche de vaca", alternative1: "Leche de coco", alternative2: "Yogurt griego", totalCalories: "130" },
      { group: "Cereales", calories: "160", option1: "Pan integral", alternative1: "Tortilla de maíz", alternative2: "Galletas integrales", totalCalories: "160" },
      { group: "Grasas", calories: "60", option1: "Aceite de aguacate", alternative1: "Mantequilla de almendra", alternative2: "Nueces", totalCalories: "60" },
      { group: "Azucares", calories: "40", option1: "Jarabe de arce", alternative1: "Azúcar de caña", alternative2: "Fruta deshidratada", totalCalories: "40" }
    ],
    miércoles: [
      { group: "Frutas", calories: "70", option1: "Banana", alternative1: "Kiwi", alternative2: "Pera", totalCalories: "70" },
      { group: "A. origen animal", calories: "160", option1: "Pechuga de pavo", alternative1: "Tofu", alternative2: "Carne molida de res", totalCalories: "160" },
      { group: "Verduras", calories: "90", option1: "Pepinos", alternative1: "Tomates", alternative2: "Pimientos", totalCalories: "90" },
      { group: "Leguminosas", calories: "100", option1: "Garbanzos", alternative1: "Frijoles", alternative2: "Lentejas", totalCalories: "100" },
      { group: "Leche y sustitutos", calories: "140", option1: "Leche de soya", alternative1: "Leche de almendras", alternative2: "Yogurt bajo en grasa", totalCalories: "140" },
      { group: "Cereales", calories: "180", option1: "Arroz integral", alternative1: "Avena", alternative2: "Muesli", totalCalories: "180" },
      { group: "Grasas", calories: "70", option1: "Aceite de oliva extra virgen", alternative1: "Semillas de chía", alternative2: "Almendras", totalCalories: "70" },
      { group: "Azucares", calories: "50", option1: "Miel", alternative1: "Azúcar de coco", alternative2: "Fruta fresca", totalCalories: "50" }
    ],
    jueves: [
      { group: "Frutas", calories: "80", option1: "Melón", alternative1: "Piña", alternative2: "Cereza", totalCalories: "80" },
      { group: "A. origen animal", calories: "170", option1: "Pechuga de pollo", alternative1: "Carne de cerdo", alternative2: "Atún", totalCalories: "170" },
      { group: "Verduras", calories: "100", option1: "Brócoli", alternative1: "Col rizada", alternative2: "Espárragos", totalCalories: "100" },
      { group: "Leguminosas", calories: "85", option1: "Frijoles rojos", alternative1: "Garbanzos", alternative2: "Habas", totalCalories: "85" },
      { group: "Leche y sustitutos", calories: "150", option1: "Leche de almendras", alternative1: "Yogurt de coco", alternative2: "Leche de avena", totalCalories: "150" },
      { group: "Cereales", calories: "170", option1: "Cereal integral", alternative1: "Galletas de avena", alternative2: "Muffin integral", totalCalories: "170" },
      { group: "Grasas", calories: "60", option1: "Aceite de coco", alternative1: "Aguacate", alternative2: "Nueces", totalCalories: "60" },
      { group: "Azucares", calories: "45", option1: "Stevia", alternative1: "Fruta fresca", alternative2: "Fruta deshidratada", totalCalories: "45" }
    ],
    viernes: [
      { group: "Frutas", calories: "60", option1: "Manzana verde", alternative1: "Kiwi", alternative2: "Plátano", totalCalories: "60" },
      { group: "A. origen animal", calories: "190", option1: "Salmón", alternative1: "Pollo a la parrilla", alternative2: "Huevo duro", totalCalories: "190" },
      { group: "Verduras", calories: "80", option1: "Lechuga", alternative1: "Espinaca", alternative2: "Pepino", totalCalories: "80" },
      { group: "Leguminosas", calories: "110", option1: "Lentejas", alternative1: "Frijoles negros", alternative2: "Garbanzos", totalCalories: "110" },
      { group: "Leche y sustitutos", calories: "130", option1: "Yogurt griego", alternative1: "Leche de soya", alternative2: "Leche descremada", totalCalories: "130" },
      { group: "Cereales", calories: "160", option1: "Muesli", alternative1: "Avena", alternative2: "Pan integral", totalCalories: "160" },
      { group: "Grasas", calories: "65", option1: "Mantequilla de maní", alternative1: "Aceite de oliva", alternative2: "Almendras", totalCalories: "65" },
      { group: "Azucares", calories: "35", option1: "Fruta natural", alternative1: "Miel", alternative2: "Azúcar moreno", totalCalories: "35" }
    ],
    sábado: [
      { group: "Frutas", calories: "90", option1: "Mango", alternative1: "Papaya", alternative2: "Plátano", totalCalories: "90" },
      { group: "A. origen animal", calories: "160", option1: "Pechuga de pollo", alternative1: "Carne de res", alternative2: "Salmón", totalCalories: "160" },
      { group: "Verduras", calories: "120", option1: "Brócoli", alternative1: "Espárragos", alternative2: "Col rizada", totalCalories: "120" },
      { group: "Leguminosas", calories: "90", option1: "Frijoles rojos", alternative1: "Lentejas", alternative2: "Habas", totalCalories: "90" },
      { group: "Leche y sustitutos", calories: "140", option1: "Leche de avena", alternative1: "Yogurt griego", alternative2: "Leche de coco", totalCalories: "140" },
      { group: "Cereales", calories: "180", option1: "Arroz integral", alternative1: "Pan integral", alternative2: "Galletas integrales", totalCalories: "180" },
      { group: "Grasas", calories: "70", option1: "Aceite de aguacate", alternative1: "Almendras", alternative2: "Pistaches", totalCalories: "70" },
      { group: "Azucares", calories: "50", option1: "Azúcar moreno", alternative1: "Miel", alternative2: "Stevia", totalCalories: "50" }
    ]
    ,
    domingo: [
      { group: "Frutas", calories: "50", option1: "Manzana", alternative1: "Plátano", alternative2: "Pera", totalCalories: "50" },
      { group: "A. origen animal", calories: "180", option1: "Pechuga de pavo", alternative1: "Pollo al horno", alternative2: "Salmón", totalCalories: "180" },
      { group: "Verduras", calories: "100", option1: "Calabacitas", alternative1: "Brócoli al vapor", alternative2: "Espinacas", totalCalories: "100" },
      { group: "Leguminosas", calories: "80", option1: "Lentejas", alternative1: "Garbanzos", alternative2: "Frijoles", totalCalories: "80" },
      { group: "Leche y sustitutos", calories: "120", option1: "Leche descremada", alternative1: "Yogurt natural", alternative2: "Leche de almendras", totalCalories: "120" },
      { group: "Cereales", calories: "150", option1: "Avena", alternative1: "Granola", alternative2: "Arroz integral", totalCalories: "150" },
      { group: "Grasas", calories: "50", option1: "Aceite de oliva", alternative1: "Aguacate", alternative2: "Almendras", totalCalories: "50" },
      { group: "Azucares", calories: "30", option1: "Miel", alternative1: "Stevia", alternative2: "Azúcar moreno", totalCalories: "30" }
    ]
  });

  // Información fija del paciente y tipo de régimen
  const paciente = "Juan Pérez"; 
  const regimenTipo = "Consumo diario"; 

  // Calcular calorías totales para cada día
  const calcularCaloriasTotales = (dia) => {
    // Verifica que foodItems[day] esté definido y sea un array antes de usar reduce
    const items = foodItems[dia];
    if (!Array.isArray(items)) {
      return 0; // Si no es un array, devuelve 0
    }
    return items.reduce((total, item) => total + parseInt(item.totalCalories || 0), 0);
  };
  

  // Manejo de cambios en los campos del formulario
  const handleInputChange = (day, index, field, value) => {
    const updatedItems = { ...foodItems };
    updatedItems[day][index] = { ...updatedItems[day][index], [field]: value };
    setFoodItems(updatedItems);
  };

  // Validaciones (estructura preparada para el futuro)
  const validateForm = () => {
    // Ejemplo de validación: Verificar que todas las calorías sean números
    for (const day of Object.keys(foodItems)) {
      for (const item of foodItems[day]) {
        if (isNaN(item.totalCalories)) {
          alert(`El campo de calorías en el día ${day} contiene un valor no válido.`);
          return false;
        }
      }
    }
    return true;
  };

  // Preparación para integrar el backend
  const handleSubmit = () => {
    if (!validateForm()) return;

    // Convertir el estado a un formato JSON para enviar al backend
    const data = {
      paciente,
      regimenTipo,
      regimen: foodItems,
    };

    // Enviar datos a una API (simulado aquí con un console.log)
    console.log("Datos enviados al backend:", JSON.stringify(data));
  };

  // Días de la semana para iterar
  const daysOfWeek = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

  return (
    <MainLayout>
      <br /> <br /> <br />
      <CardHeader>
        <CardTitle>
          Paciente: {paciente} <br />
          Tipo de régimen: {regimenTipo}
        </CardTitle>
      </CardHeader>
      <div className="space-y-8">
        {daysOfWeek.map((day) => (
          <Card key={day} className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">
                {`Régimen para ${day.charAt(0).toUpperCase() + day.slice(1)}`}{" "}
                <span className="text-lg font-normal">
                  (Total calorías del día: {calcularCaloriasTotales(day)} kcal)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Grupo</TableHead>
                      <TableHead className="w-[100px]">Porción kcal</TableHead>
                      <TableHead>Opción 1</TableHead>
                      <TableHead>Alternativa 1</TableHead>
                      <TableHead>Alternativa 2</TableHead>
                      <TableHead className="w-[100px]">Calorías</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {foodItems[day]?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.group}</TableCell>
                        <TableCell>
                          <Input
                            value={item.calories}
                            onChange={(e) => handleInputChange(day, index, "calories", e.target.value)}
                            className="w-full h-8 px-2 py-1"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.option1}
                            onChange={(e) => handleInputChange(day, index, "option1", e.target.value)}
                            className="w-full h-8 px-2 py-1"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.alternative1}
                            onChange={(e) => handleInputChange(day, index, "alternative1", e.target.value)}
                            className="w-full h-8 px-2 py-1"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.alternative2}
                            onChange={(e) => handleInputChange(day, index, "alternative2", e.target.value)}
                            className="w-full h-8 px-2 py-1"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.totalCalories}
                            onChange={(e) => handleInputChange(day, index, "totalCalories", e.target.value)}
                            className="w-full h-8 px-2 py-1"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-black py-2 px-4 rounded-lg"
      >
        Guardar Régimen
      </button>
    </MainLayout>
  );
};

export default Register_regimenesCD;


