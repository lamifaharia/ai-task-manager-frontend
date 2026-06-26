import { Link } from "react-router-dom";
import { ArrowRight, Brain, Zap, Shield, BarChart3, Users, Star, CheckCircle, Sparkles } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Task Generator", desc: "Describe your goal and let AI break it into actionable tasks automatically.", color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20" },
  { icon: Zap, title: "Smart Prioritization", desc: "AI analyzes your workload and suggests the optimal order to tackle tasks.", color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20" },
  { icon: Shield, title: "Role-Based Access", desc: "Separate dashboards for users and admins with fine-grained permissions.", color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Real-time charts and insights on your productivity and task completion.", color: "text-green-500 bg-green-50 dark:bg-green-900/20" },
  { icon: Users, title: "Team Collaboration", desc: "Admin can view and manage all team tasks from a central dashboard.", color: "text-pink-500 bg-pink-50 dark:bg-pink-900/20" },
  { icon: Sparkles, title: "AI Chat Assistant", desc: "Ask the AI anything about your tasks — get tips, summaries, and suggestions.", color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" },
];

const stats = [
  { label: "Tasks Completed", value: "10K+" },
  { label: "Active Users", value: "2K+" },
  { label: "AI Suggestions", value: "50K+" },
  { label: "Uptime", value: "99.9%" },
];

const testimonials = [
  { name: "Sara Rahman", role: "Product Manager", text: "TaskAI transformed how our team works. The AI suggestions are incredibly accurate and save us hours every week.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sara" },
  { name: "Karim Hossain", role: "Software Engineer", text: "The AI task generator is magic. I describe a project and get a complete breakdown in seconds. Absolutely love it.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karim" },
  { name: "Nadia Islam", role: "Freelancer", text: "Finally a task manager that understands context. The dark mode is beautiful and the app is super fast.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nadia" },
];

const faqs = [
  { q: "Is TaskAI free to use?", a: "Yes! The core features are completely free. Premium AI features use the Anthropic Claude API." },
  { q: "How does the AI task generator work?", a: "You describe your project or goal in plain English, and our AI breaks it down into clear, actionable tasks with priorities and deadlines." },
  { q: "Can I use TaskAI as a team?", a: "Absolutely. Admin accounts can see and manage all tasks across the team from the admin dashboard." },
  { q: "Is my data secure?", a: "Yes. All passwords are hashed with bcrypt and data is stored securely. JWT tokens are used for authentication." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[65vh] flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4" /> Powered by Claude AI
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Manage Tasks with the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
              Power of AI
            </span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            TaskAI combines smart task management with Claude AI to help you plan smarter, work faster, and achieve more — every single day.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/register" className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-xl transition-colors w-full sm:w-auto justify-center">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/tasks" className="flex items-center gap-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 font-medium px-6 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto justify-center">
              Browse Tasks
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-primary-500">{s.value}</p>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Everything You Need to Stay Productive</h2>
            <p className="text-gray-500 dark:text-slate-400 max-w-xl mx-auto">Powerful features designed to help individuals and teams get more done.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 card-hover">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How TaskAI Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Create an Account", desc: "Sign up in seconds. No credit card needed to get started." },
              { step: "02", title: "Add Your Tasks", desc: "Manually add tasks or let the AI generate them from your description." },
              { step: "03", title: "Let AI Help You", desc: "Get smart suggestions, priorities, and insights from your AI assistant." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary-500 text-white rounded-xl flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What Our Users Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 card-hover">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full bg-primary-100" />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-gray-400 dark:text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-gray-50 dark:bg-slate-800 rounded-xl p-5 border border-gray-100 dark:border-slate-700">
                <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-lg">↓</span>
                </summary>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-500 to-accent-500">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
          <p className="text-primary-100 mb-8">Join thousands of users already managing tasks smarter with AI.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-3 rounded-xl hover:bg-primary-50 transition-colors">
            Start for Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Stay in the Loop</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">Get productivity tips and AI updates delivered to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => { e.preventDefault(); alert("Subscribed! Thank you."); }}>
            <input type="email" required placeholder="Enter your email" className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            <button type="submit" className="bg-primary-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}