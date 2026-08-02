import {
    FaHome,
    FaUsers,
    FaUserMd,
    FaCalendarAlt,
    FaFileInvoiceDollar,
    FaFileMedical,
    FaHistory,
    FaUser,
    FaUserTie,
    FaSignOutAlt,
} from "react-icons/fa";

export const sidebarMenus = {
    receptionist: [
        {
            title: "Dashboard",
            icon: FaHome,
            path: "/receptionist/dashboard",
        },
        {
            title: "Patients",
            icon: FaUsers,
            children: [
                {
                    title: "Register Patient",
                    path: "/receptionist/patients/register",
                },
                {
                    title: "View Patients",
                    path: "/receptionist/patients",
                },
            ],
        },
        {
            title: "Appointments",
            icon: FaCalendarAlt,
            children: [
                {
                    title: "Book Appointment",
                    path: "/receptionist/appointments/book",
                },
                {
                    title: "Cancel Appointment",
                    path: "/receptionist/appointments/cancel",
                },
            ],
        },
        {
            title: "Doctors",
            icon: FaUserMd,
            children: [
                {
                    title: "Doctor Availability",
                    path: "/receptionist/doctors",
                },
            ],
        },
        {
            title: "Invoices",
            icon: FaFileInvoiceDollar,
            children: [
                {
                    title: "Generate Invoice",
                    path: "/receptionist/invoices/generate",
                },
                {
                    title: "Search Invoice",
                    path: "/receptionist/invoices/search",
                },
            ],
        },
    ],

    doctor: [

        {
            title: "Today's Appointments",
            icon: FaCalendarAlt,
            path: "/doctor/dashboard",
        },
        {
            title: "Prescriptions",
            icon: FaFileMedical,
            path: "/doctor/prescriptions",
        },
    ],

    patient: [
        {
            title: "Dashboard",
            icon: FaHome,
            path: "/patient/dashboard",
        },


        {
            title: "Prescriptions",
            icon: FaFileMedical,
            path: "/patient/prescriptions",
        },
        {
            title: "Profile",
            icon: FaUser,
            path: "/patient/profile",
        },
    ],

    admin: [
        {
            title: "Dashboard",
            icon: FaHome,
            path: "/admin/",
        },
        {
            title: "Doctors",
            icon: FaUserMd,
            children: [
                {
                    title: "Register Doctor",
                    path: "/admin/register-doctor"
                },

                {
                    title: "All Doctors",
                    path: "/admin/all-doctors"
                }

            ]
        },
        {
            title: "Receptionists",
            icon: FaUserTie,
            children: [
                {
                    title: "Register Receptionist",
                    path: "/admin/register-receptionist"
                },

                {
                    title: "Search Receptionist",
                    path: "/admin/receptionist/search"
                }
            ]
        },
        {
            title: "Patients",
            icon: FaUsers,
            path: "/admin/patients",
        },
    ],
};

export const logoutItem = {
    title: "Logout",
    icon: FaSignOutAlt,
};