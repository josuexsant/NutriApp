import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { MainLayout } from "../layouts/MainLayout";

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastname1: "",
    lastname2: "",
    phoneNumber: "",
    state: "",
    city: "",
    postalCode: "",
    license: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    if (formData.password !== formData.confirmPassword) {
      setErrors("Las contraseñas no coinciden");
      return;
    }

    const dataToSend = {
      nombre: formData.name,
      apellido_pat: formData.lastname1,
      apellido_mat: formData.lastname2,
      telefono: formData.phoneNumber,
      ciudad_residencia: formData.city,
      codigo_postal: formData.postalCode,
      cedula_profesional: formData.license,
      correo_electronico: formData.email,
      contrasena: formData.password,
      token: "abcdef123456",
    };

    try {
      const response = await fetch("http://127.0.0.1:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        setMessage("Nutriólogo registrado exitosamente");
        alert("Nutriólogo registrado exitosamente, ya puedes iniciar sesión");
        navigate("/");
      } else {
        setErrors(responseData.error.message);
        setMessage(responseData.message || "Error al registrar");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      setMessage("Error al registrar. Inténtalo de nuevo.");
    }
  };

  return (
    <MainLayout>
      <div
        className="d-flex justify-content-center align-items-center max-h-screen my-5"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="card p-4" style={{ width: "400px" }}>
          <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal text-center">NutriApp</h1>
            <img
              className="mb-4 mx-auto d-block"
              src={logo}
              alt=""
              width="72"
              height="72"
            />
            <h2 className="h5 mb-3 font-weight-normal text-center">
              Registrate
            </h2>

            <input
              type="text"
              name="name"
              className="form-control mb-3"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastname1"
              className="form-control mb-3"
              placeholder="Apellido Paterno"
              value={formData.lastname1}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastname2"
              className="form-control mb-3"
              placeholder="Apellido Materno"
              value={formData.lastname2}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="phoneNumber"
              className="form-control mb-3"
              placeholder="Número de Teléfono"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />

            <select
              name="state"
              className="form-control mb-3"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona tu estado</option>
              <option value="Aguascalientes">Aguascalientes</option>
              <option value="Baja California">Baja California</option>
              <option value="Baja California Sur">Baja California Sur</option>
              <option value="Campeche">Campeche</option>
              <option value="Chiapas">Chiapas</option>
              <option value="Chihuahua">Chihuahua</option>
              <option value="Ciudad de México">Ciudad de México</option>
              <option value="Coahuila">Coahuila</option>
              <option value="Colima">Colima</option>
              <option value="Durango">Durango</option>
              <option value="Estado de México">Estado de México</option>
              <option value="Guanajuato">Guanajuato</option>
              <option value="Guerrero">Guerrero</option>
              <option value="Hidalgo">Hidalgo</option>
              <option value="Jalisco">Jalisco</option>
              <option value="Michoacán">Michoacán</option>
              <option value="Morelos">Morelos</option>
              <option value="Nayarit">Nayarit</option>
              <option value="Nuevo León">Nuevo León</option>
              <option value="Oaxaca">Oaxaca</option>
              <option value="Puebla">Puebla</option>
              <option value="Querétaro">Querétaro</option>
              <option value="Quintana Roo">Quintana Roo</option>
              <option value="San Luis Potosí">San Luis Potosí</option>
              <option value="Sinaloa">Sinaloa</option>
              <option value="Sonora">Sonora</option>
              <option value="Tabasco">Tabasco</option>
              <option value="Tamaulipas">Tamaulipas</option>
              <option value="Tlaxcala">Tlaxcala</option>
              <option value="Veracruz">Veracruz</option>
              <option value="Yucatán">Yucatán</option>
              <option value="Zacatecas">Zacatecas</option>
            </select>

            <input
              type="text"
              name="city"
              className="form-control mb-3"
              placeholder="Ciudad"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="postalCode"
              className="form-control mb-3"
              placeholder="Código Postal"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="license"
              className="form-control mb-3"
              placeholder="Cédula Profesional"
              value={formData.license}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              className="form-control mb-3"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              className="form-control mb-3"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <p className="text-gray-200">
              La contraseña debe tener mínimo 8 caracteres
            </p>

            <input
              type="password"
              name="confirmPassword"
              className="form-control mb-3"
              placeholder="Confirmar Contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <div className="d-flex flex-column align-items-center">
              <p className="text-danger">{errors}</p>
              <button className="btn btn-lg btn-primary mb-2" type="submit">
                Registrarse
              </button>
            </div>
            <p className="mt-5 mb-3 text-muted text-center">© 2024</p>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
