import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CheckSquare, Eye, EyeOff, Loader2 } from "lucide-react";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      return setError("Passwords do not match.");
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    setLoading(true);
    setError("");
    try {
      await register(form.name, form.email, form.password);
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 font-bold text-xl text-primary-500 mb-2">
              <CheckSquare className="w-6 h-6" /> TaskAI
            </div>
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Start managing tasks with AI today</p>
          </div>

          {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: "name", label: "Full Name", type: "text", placeholder: "Your name" },
              { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-sm font-medium block mb-1.5">{field.label}</label>
                <input {...field} required value={form[field.name]} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition" />
              </div>
            ))}

            {["password", "confirm"].map((name) => (
              <div key={name}>
                <label className="text-sm font-medium block mb-1.5">{name === "password" ? "Password" : "Confirm Password"}</label>
                <div className="relative">
                  <input name={name} type={showPw ? "text" : "password"} required value={form[name]} onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition" />
                  {name === "password" && (
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button type="submit" disabled={loading}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-slate-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-500 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}