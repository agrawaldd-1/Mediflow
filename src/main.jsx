import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterContextProvider, RouterProvider, useNavigate } from 'react-router-dom'
import Login from './Login.jsx'
import DoctorDashboard from './Dashboards/DoctorDashboard.jsx'
import PatientDashboard from './Dashboards/PatientDashboard.jsx'
import AdminDashboard  from './Dashboards/AdminDashboard.jsx'
import ReceptionistDashboard  from './Dashboards/ReceptionistDashboard.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './routes/ProtectedRoutes.jsx'
const router = createBrowserRouter([
  {
    path: "/", element: <App />,
  },
  {

    path: "/login", element: <><Login /></>
  },

  {
    path: "/doctor/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["doctor"]}>
        <DoctorDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/patient/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["patient"]}>
        <PatientDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/receptionist/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["receptionist"]}>
        <ReceptionistDashboard />
      </ProtectedRoute>
    )
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider><RouterProvider router={router}></RouterProvider></AuthProvider>
  </StrictMode>,
)
