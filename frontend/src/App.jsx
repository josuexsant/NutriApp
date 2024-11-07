import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './helpers/ProtectedRoute';
import {
  Archived_patient,
  Dashboard,
  Home,
  Login,
  Patient_details,
  PatientsPanel,
  RegimesPanel,
  Register,
  Registerpatient,
<<<<<<< HEAD
=======
  RegisterRegime,
  UpdatePatient, 

>>>>>>> mi-repositorio/master
} from './pages/';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/Regimes-panel',
    element: (
      <ProtectedRoute>
        <RegimesPanel />
      </ProtectedRoute>
    ),
  },
  {
    path: '/Patients-panel',
    element: (
      <ProtectedRoute>
        <PatientsPanel />
      </ProtectedRoute>
    ),
  },
  {
    path: '/Register-patient',
    element: (
      <ProtectedRoute>
        <Registerpatient />
      </ProtectedRoute>
    ),
  },
  {
    path: '/archived_patient',
    element: (
      <ProtectedRoute>
        <Archived_patient />
      </ProtectedRoute>
    ),
  },
  {
    path: '/patient_details',
    element: (
      <ProtectedRoute>
        <Patient_details />
      </ProtectedRoute>
    ),
  },
<<<<<<< HEAD
=======
  {
    path: '/Register-regime',
    element: (
      <ProtectedRoute>
        <RegisterRegime />
      </ProtectedRoute>
    ),
  },
  {
    path: 'Update-patient',
    element: (
      <ProtectedRoute>
      </UpdatePatient />
    </ProtectedRoute>
    ),
  },

>>>>>>> mi-repositorio/master
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
