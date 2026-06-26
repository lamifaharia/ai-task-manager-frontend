import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CheckSquare, Eye, EyeOff, Loader2 } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === "admin" ? "/dashboard" : "/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role) => {
    setForm({ email: `${role}@demo.com`, password: "demo123" });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 font-bold text-xl text-primary-500 mb-2">
              <CheckSquare className="w-6 h-6" /> TaskAI
            </div>
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Sign in to your account</p>
          </div>

          {/* Demo buttons */}
          <div className="flex gap-2 mb-6">
            <button onClick={() => fillDemo("user")} className="flex-1 text-xs py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 transition-colors font-medium">
              Demo User
            </button>
            <button onClick={() => fillDemo("admin")} className="flex-1 text-xs py-2 rounded-lg bg-accent-500/10 text-accent-500 hover:bg-accent-500/20 transition-colors font-medium">
              Demo Admin
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-slate-700" /></div>
            <div className="relative flex justify-center text-xs text-gray-400 dark:text-slate-500"><span className="bg-white dark:bg-slate-800 px-2">or sign in with email</span></div>
          </div>

          {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Email</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Password</label>
              <div className="relative">
                <input name="password" type={showPw ? "text" : "password"} required value={form.password} onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-slate-400 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary-500 font-medium hover:underline">Sign up</Link>
          </p>
        </div>

        <div className="mt-4 text-center text-xs text-gray-400 dark:text-slate-500">
          Demo credentials: user@demo.com / admin@demo.com — password: demo123
        </div>
      </div>
    </div>
  );
}