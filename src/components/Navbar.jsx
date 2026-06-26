import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, CheckSquare, ChevronDown, LayoutDashboard, LogOut, User } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setProfileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-gray-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary-500">
            <CheckSquare className="w-6 h-6" />
            <span>TaskAI</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Home</Link>
            <Link to="/tasks" className="text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Tasks</Link>
            <Link to="/about" className="text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">About</Link>
            <Link to="/blog" className="text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Blog</Link>
            <Link to="/contact" className="text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Contact</Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 rounded-full pl-2 pr-3 py-1.5 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full bg-primary-100" />
                  <span className="text-sm font-medium hidden sm:block">{user.name}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-700">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">{user.role}</p>
                    </div>
                    <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-primary-500 transition-colors px-3 py-1.5">Login</Link>
                <Link to="/register" className="text-sm font-medium bg-primary-500 text-white rounded-lg px-4 py-1.5 hover:bg-primary-600 transition-colors">Sign Up</Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 dark:border-slate-800 space-y-1">
            {["/ Home", "/tasks Tasks", "/about About", "/blog Blog", "/contact Contact"].map((item) => {
              const [path, label] = item.split(" ");
              return (
                <Link key={path} to={path} onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  {label}
                </Link>
              );
            })}
            {!user && (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-medium text-primary-500">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-medium bg-primary-500 text-white rounded-lg text-center">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}