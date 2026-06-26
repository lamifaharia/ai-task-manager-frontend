import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, ListTodo, BarChart3, User, Settings, Users, Shield, X
} from "lucide-react";

const userMenu = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { to: "/tasks", icon: ListTodo, label: "My Tasks" },
  { to: "/dashboard?tab=analytics", icon: BarChart3, label: "Analytics" },
  { to: "/dashboard?tab=profile", icon: User, label: "Profile" },
];

const adminMenu = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { to: "/tasks", icon: ListTodo, label: "All Tasks" },
  { to: "/dashboard?tab=analytics", icon: BarChart3, label: "Analytics" },
  { to: "/dashboard?tab=users", icon: Users, label: "Users" },
  { to: "/dashboard?tab=profile", icon: User, label: "Profile" },
  { to: "/dashboard?tab=settings", icon: Settings, label: "Settings" },
];

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();
  const location = useLocation();
  const menu = user?.role === "admin" ? adminMenu : userMenu;

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 z-40 transform transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="p-5 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">{user?.name}</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 capitalize">{user?.role}</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"><X className="w-4 h-4" /></button>
        </div>

        <nav className="p-4 space-y-1">
          {menu.map(({ to, icon: Icon, label }) => {
            const active = location.pathname + location.search === to;
            return (
              <Link key={to} to={to} onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                    : "text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                }`}>
                <Icon className="w-4 h-4" /> {label}
              </Link>
            );
          })}
        </nav>

        {user?.role === "admin" && (
          <div className="mx-4 mt-4 p-3 bg-accent-500/10 rounded-xl">
            <div className="flex items-center gap-2 text-accent-500 text-xs font-semibold mb-1">
              <Shield className="w-3.5 h-3.5" /> Admin Access
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-400">You can view and manage all users and tasks.</p>
          </div>
        )}
      </aside>
    </>
  );
}