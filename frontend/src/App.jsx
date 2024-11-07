import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./helpers/ProtectedRoute";
import { Dashboard, Home, Login, PatientRegister, Register, PacienteWeb } from "./pages/";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/PatientRegister",
    element: (
      <ProtectedRoute>
        <PatientRegister />
      </ProtectedRoute>
    ),
  },
  {
    path: "/PacienteWeb",
    element: (
      <ProtectedRoute>
        <PacienteWeb />
      </ProtectedRoute>
    ),
  },
]);



const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
