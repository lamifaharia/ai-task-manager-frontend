import { Link } from "react-router-dom";
import { CheckSquare, ExternalLink, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary-500 mb-3">
              <CheckSquare className="w-6 h-6" />
              <span>TaskAI</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xs">
              AI-powered task management that helps you stay productive, organized, and focused on what matters most.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-4">
              {[
                { label: "GitHub", href: "https://github.com" },
                { label: "Twitter", href: "https://twitter.com" },
                { label: "LinkedIn", href: "https://linkedin.com" },
                { label: "Email", href: "mailto:hello@taskai.com" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 text-xs text-gray-500 dark:text-slate-400 hover:text-primary-500 hover:border-primary-500 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Product</h4>
            <ul className="space-y-2">
              {[
                ["/", "Home"],
                ["/tasks", "Tasks"],
                ["/dashboard", "Dashboard"],
                ["/about", "About"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-500 dark:text-slate-400 hover:text-primary-500 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Resources</h4>
            <ul className="space-y-2">
              {[
                ["/blog", "Blog"],
                ["/contact", "Contact"],
                ["/login", "Login"],
                ["/register", "Sign Up"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-500 dark:text-slate-400 hover:text-primary-500 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 dark:border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400 dark:text-slate-500">
            © 2025 TaskAI. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-slate-500">
            <Mail className="w-3 h-3" />
            hello@taskai.com
          </div>
        </div>
      </div>
    </footer>
  );
}