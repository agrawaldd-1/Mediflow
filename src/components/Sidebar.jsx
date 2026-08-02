import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";

import { sidebarMenus } from "../components/config/SidebarMenu.js";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [openMenus, setOpenMenus] = useState({});

  const menu = sidebarMenus[user?.role] || [];

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="flex h-full w-72 flex-col border-r border-gray-200 bg-white">
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            if (item.children) {
              return (
                <li key={item.title}>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <Icon />
                      <span>{item.title}</span>
                    </div>

                    {openMenus[item.title] ? (
                      <FaChevronDown size={12} />
                    ) : (
                      <FaChevronRight size={12} />
                    )}
                  </button>

                  {openMenus[item.title] && (
                    <ul className="mt-2 ml-10 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.title}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              `block rounded-lg px-3 py-2 text-sm transition ${
                                isActive
                                  ? "bg-blue-100 font-semibold text-blue-600"
                                  : "text-slate-600 hover:bg-slate-100"
                              }`
                            }
                          >
                            {child.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={item.title}>
                <NavLink
                  to={item.path}
                  end={item.path === "/admin"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                      isActive
                        ? "bg-blue-100 font-semibold text-blue-600"
                        : "text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  <Icon />
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-gray-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;