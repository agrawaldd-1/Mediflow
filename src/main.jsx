import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterContextProvider, RouterProvider, useNavigate } from 'react-router-dom'
import Login from './Login.jsx'
import DoctorDashboard from './Dashboards/DoctorDashboard.jsx'
import PatientDashboard from './Dashboards/PatientDashboard.jsx'
import AdminDashboard from './Dashboards/AdminDashboard.jsx'
import ReceptionistDashboard from './Dashboards/ReceptionistDashboard.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './routes/ProtectedRoutes.jsx'
import RegisterDoctor from './components/registerDoctor.jsx'
import AdminLayout from './Layout/AdminLayout.jsx'
import SearchDoctor from './components/SearchDoctor.jsx'
import UpdateDoctorProfile from './components/UpdateDoctorProfile.jsx'
import AllDoctors from './components/AllDoctors.jsx'
import RegisterReceptionist from './components/RegisterReceptionist.jsx'
import SearchReceptionist from './components/SearchReceptionist.jsx'
import UpdateReceptionistProfile from './components/UpdateReceptionistProfile.jsx'
import RegisterPatient from './components/RegisterPatient.jsx'
import ReceptionistLayout from './Layout/ReceptionistLayout.jsx'
import ViewPatients from './components/ViewPatient.jsx'
import UpdatePatientProfile from './components/UpdatePatientProfile.jsx'
import BookAppointment from './components/BookAppointment.jsx'
import ViewAllAppointments from './components/ViewAllAppointments.jsx'
import DoctorAvailability from './components/DoctorAvailability.jsx'
import GenerateInvoice from './components/GenerateInvoice.jsx'
import SearchInvoice from './components/SearchInvoice.jsx'
import ViewInvoice from './components/ViewInvoice.jsx'
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
    ),
    
  },
  {
    path: "/admin/",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: "register-doctor",
        element: (
          <RegisterDoctor />
        )
      },
      {
        path: "doctors/search",
        element: <SearchDoctor />
      },
      {
        path: "doctors/update-profile/:doctorId",
        element: <UpdateDoctorProfile />
      },
      {
        path : "all-doctors",
        element : <AllDoctors/>
      },
      {
        path : "register-receptionist",
        element : <RegisterReceptionist/>
      },
      {
        path : "receptionist/search",
        element : <SearchReceptionist/>
      },
      {
        path : "receptionist/update-profile/:receptionistId",
        element : <UpdateReceptionistProfile/>
      }

    ]
  },
  {
    path: "/receptionist/",
    element: (
      <ProtectedRoute allowedRoles={["receptionist"]}>
        <ReceptionistLayout />
      </ProtectedRoute>
    ),
    children : [
      {
        index : true,
        element : <ReceptionistDashboard/>
      },
      {
        path : "register-patient",
        element : <RegisterPatient/>
      },
      {
        path : "patients",
        element : <ViewPatients/>
      },
      {
        path : "patients/update-profile/:patientId",
        element : <UpdatePatientProfile/>
      },
      {
        path : "book-appointment",
        element : <BookAppointment/>
      },
      {
        path : "appointments/view",
        element : <ViewAllAppointments/>
      },
      {
        path : "doctors",
        element : <DoctorAvailability/>
      },
      {
        path : "generate-invoice",
        element : <GenerateInvoice/>
      },
      {
        path : "invoices/search",
        element : <SearchInvoice/>
      },
      {
        path : "invoices/:invoiceNumber",
        element : <ViewInvoice/>
      }
    ]
  },

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider><RouterProvider router={router}></RouterProvider></AuthProvider>
  </StrictMode>,
)
