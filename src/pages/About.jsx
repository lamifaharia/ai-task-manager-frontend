import { CheckSquare, Brain, Users, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">About TaskAI</h1>
        <p className="text-gray-500 dark:text-slate-400 max-w-xl mx-auto">
          TaskAI is an AI-powered task management platform built to help individuals and teams work smarter.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {[
          { icon: Brain, title: "AI at the Core", desc: "Built on Anthropic's Claude API to give you intelligent task suggestions, smart breakdowns, and productivity insights." },
          { icon: Zap, title: "Built for Speed", desc: "React + TanStack Query ensures a fast, responsive experience with real-time updates and optimistic UI." },
          { icon: Users, title: "Team Ready", desc: "Role-based access control means admins and users each get the right view and permissions." },
          { icon: CheckSquare, title: "Open & Transparent", desc: "This is a full-stack open source project built as a learning resource for developers everywhere." },
        ].map((item) => (
          <div key={item.title} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 card-hover">
            <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center mb-4">
              <item.icon className="w-5 h-5 text-primary-500" />
            </div>
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Built with Modern Tech</h2>
        <p className="text-primary-100 mb-4 text-sm">React · Express · TanStack Query · Recharts · Tailwind CSS · Claude AI</p>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer"
          className="inline-block bg-white text-primary-600 font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-primary-50 transition-colors">
          View on GitHub
        </a>
      </div>
    </div>
  );
}