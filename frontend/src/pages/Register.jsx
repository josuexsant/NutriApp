import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { MainLayout } from '../layouts/MainLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { MainLayout } from '../layouts/MainLayout';

export const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState('');
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors: formErrors },
  } = useForm();

  // Función para manejar el envío del formulario
  const onSubmit = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setErrors('Las contraseñas no coinciden');
      return;
    }

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
        setErrors('Nutriólogo registrado exitosamente');
        navigate('/login'); // Redirige al login tras el registro
      } else {
        setErrors(data.message || 'Error al registrar');
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      setErrors('Error al registrar. Inténtalo de nuevo.');
    }
  };

  return (
    <MainLayout>
      <div
        className="d-flex justify-content-center align-items-center min-h-screen"
        style={{ backgroundColor: '#f8f9fa' }}
        style={{ backgroundColor: '#f8f9fa' }}
      >
        <div className="card p-4" style={{ width: '400px' }}>
          <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
        <div className="card p-4" style={{ width: '400px' }}>
          <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
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

            {/* Campo nombre */}
            <label htmlFor="name" className="sr-only">
            {/* Campo nombre */}
            <label htmlFor="name" className="sr-only">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="form-control mb-3"
              {...register('name', { required: 'Este campo es obligatorio' })}
              {...register('name', { required: 'Este campo es obligatorio' })}
            />
            {formErrors.name && (
              <p className="text-danger">{formErrors.name.message}</p>
            )}
            {formErrors.name && (
              <p className="text-danger">{formErrors.name.message}</p>
            )}

            {/* Campo apellido paterno */}
            <label htmlFor="lastname1" className="sr-only">
            {/* Campo apellido paterno */}
            <label htmlFor="lastname1" className="sr-only">
              Apellido Paterno
            </label>
            <input
              type="text"
              id="lastname1"
              className="form-control mb-3"
              {...register('lastname1', {
                required: 'Este campo es obligatorio',
              })}
              {...register('lastname1', {
                required: 'Este campo es obligatorio',
              })}
            />
            {formErrors.lastname1 && (
              <p className="text-danger">{formErrors.lastname1.message}</p>
            )}
            {formErrors.lastname1 && (
              <p className="text-danger">{formErrors.lastname1.message}</p>
            )}

            {/* Campo apellido materno */}
            <label htmlFor="lastname2" className="sr-only">
            {/* Campo apellido materno */}
            <label htmlFor="lastname2" className="sr-only">
              Apellido Materno
            </label>
            <input
              type="text"
              id="lastname2"
              className="form-control mb-3"
              {...register('lastname2', {
                required: 'Este campo es obligatorio',
              })}
            />
            {formErrors.lastname2 && (
              <p className="text-danger">{formErrors.lastname2.message}</p>
            )}

            {/* Campo teléfono */}
            <label htmlFor="phoneNumber" className="sr-only">
              Número de Teléfono
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="form-control mb-3"
              {...register('phoneNumber', {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message:
                    'El número de teléfono debe tener exactamente 10 dígitos',
                },
              })}
            />
            {formErrors.phoneNumber && (
              <p className="text-danger">{formErrors.phoneNumber.message}</p>
            )}

            {/* Campo estado */}
            <label htmlFor="inputState" className="sr-only">
              Estado
            </label>
            <select
              id="inputState"
              className="form-control mb-3"
              {...register('state', { required: 'Selecciona un estado' })}
            >
            <select
              id="inputState"
              className="form-control mb-3"
              {...register('state', { required: 'Selecciona un estado' })}
            >
              <option value="">Selecciona tu estado</option>
              <option value="Aguascalientes">Aguascalientes</option>
              <option value="Baja California">Baja California</option>
              {/* Más opciones */}
              {/* Más opciones */}
            </select>
            {formErrors.state && (
              <p className="text-danger">{formErrors.state.message}</p>
            )}
            {formErrors.state && (
              <p className="text-danger">{formErrors.state.message}</p>
            )}

            {/* Campo ciudad */}
            <label htmlFor="city" className="sr-only">
              Ciudad
            {/* Campo ciudad */}
            <label htmlFor="city" className="sr-only">
              Ciudad
            </label>
            <input
              type="text"
              type="text"
              id="city"
              className="form-control mb-3"
              {...register('city', { required: 'Este campo es obligatorio' })}
              {...register('city', { required: 'Este campo es obligatorio' })}
            />
            {formErrors.city && (
              <p className="text-danger">{formErrors.city.message}</p>
            )}
            {formErrors.city && (
              <p className="text-danger">{formErrors.city.message}</p>
            )}

            {/* Campo cédula profesional */}
            <label htmlFor="license" className="sr-only">
              Cédula Profesional
            </label>
            <input
              type="text"
              id="license"
              className="form-control mb-3"
              {...register('license', {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message:
                    'La cédula profesional debe tener exactamente 10 dígitos',
                },
              })}
            />
            {formErrors.license && (
              <p className="text-danger">{formErrors.license.message}</p>
            )}

            {/* Campo correo electrónico */}
            <label htmlFor="email" className="sr-only">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              className="form-control mb-3"
              {...register('email', { required: 'Este campo es obligatorio' })}
              {...register('email', { required: 'Este campo es obligatorio' })}
            />
            {formErrors.email && (
              <p className="text-danger">{formErrors.email.message}</p>
            )}
            {formErrors.email && (
              <p className="text-danger">{formErrors.email.message}</p>
            )}

            {/* Campo contraseña */}
            <label htmlFor="password" className="sr-only">
            {/* Campo contraseña */}
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="form-control mb-3"
              {...register('password', {
                required: 'Este campo es obligatorio',
              })}
              {...register('password', {
                required: 'Este campo es obligatorio',
              })}
            />
            {formErrors.password && (
              <p className="text-danger">{formErrors.password.message}</p>
            )}
            {formErrors.password && (
              <p className="text-danger">{formErrors.password.message}</p>
            )}
            <p className="text-gray-200">
              La contraseña debe tener mínimo 8 caracteres
              La contraseña debe tener mínimo 8 caracteres
            </p>

            {/* Campo confirmar contraseña */}
            <label htmlFor="confirmPassword" className="sr-only">
            {/* Campo confirmar contraseña */}
            <label htmlFor="confirmPassword" className="sr-only">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control mb-3"
              {...register('confirmPassword', {
                required: 'Este campo es obligatorio',
                validate: (value) =>
                  value === getValues('password') ||
                  'Las contraseñas no coinciden',
              })}
            />
            {formErrors.confirmPassword && (
              <p className="text-danger">
                {formErrors.confirmPassword.message}
              </p>
            )}

            {/* Mostrar errores */}
              {...register('confirmPassword', {
                required: 'Este campo es obligatorio',
                validate: (value) =>
                  value === getValues('password') ||
                  'Las contraseñas no coinciden',
              })}
            />
            {formErrors.confirmPassword && (
              <p className="text-danger">
                {formErrors.confirmPassword.message}
              </p>
            )}

            {/* Mostrar errores */}
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
