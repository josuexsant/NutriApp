import { Login, Home, Dashboard, Register, PacienteWeb } from "./pages/";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./helpers/ProtectedRoute";

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
    path: "/pacienteweb",
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
