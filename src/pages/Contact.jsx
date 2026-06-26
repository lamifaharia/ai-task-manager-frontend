import { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Contact Us</h1>
        <p className="text-gray-500 dark:text-slate-400">Have a question or feedback? We'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          {[
            { icon: Mail, title: "Email", value: "hello@taskai.com" },
            { icon: MessageSquare, title: "Support", value: "support@taskai.com" },
          ].map((item) => (
            <div key={item.title} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
              <div className="w-9 h-9 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center mb-3">
                <item.icon className="w-4 h-4 text-primary-500" />
              </div>
              <p className="font-semibold text-sm mb-1">{item.title}</p>
              <p className="text-sm text-gray-500 dark:text-slate-400">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
          {sent ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h2 className="font-bold text-lg mb-1">Message Sent!</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400">We'll get back to you within 24 hours.</p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="mt-4 text-sm text-primary-500 font-medium hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[{ name: "name", label: "Name", type: "text", placeholder: "Your name" }, { name: "email", label: "Email", type: "email", placeholder: "you@example.com" }].map((f) => (
                  <div key={f.name}>
                    <label className="text-sm font-medium block mb-1.5">{f.label}</label>
                    <input {...f} required value={form[f.name]} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Subject</label>
                <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="What's this about?"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Message</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write your message..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary-500 text-white font-semibold py-2.5 rounded-xl hover:bg-primary-600 transition-colors">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}