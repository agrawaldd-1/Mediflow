import { FiChevronDown } from "react-icons/fi";
import { FaHospital } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user } = useAuth();

    return (
        <header className="flex h-18 items-center justify-between border-b border-gray-200 bg-white px-8">

            {/* Left Section */}
            <div className="flex items-center gap-4">

                

                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        MediFlow
                    </h1>

                    <p className="text-sm text-slate-500">
                        Welcome back, {user?.name}
                    </p>
                </div>

            </div>

            {/* Right Section */}
            <button className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-2 transition hover:bg-slate-50">

                <div className="text-right">
                    <h2 className="text-sm font-semibold text-slate-800">
                        {user?.name}
                    </h2>

                    <p className="text-xs capitalize text-slate-500">
                        {user?.role}
                    </p>
                </div>

                <FiChevronDown className="text-lg text-slate-500" />
            </button>

        </header>
    );
};

export default Navbar;