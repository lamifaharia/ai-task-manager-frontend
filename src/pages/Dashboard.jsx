import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTasks, useTaskStats, useCreateTask, useDeleteTask } from "../hooks/useTasks";
import Sidebar from "../components/Sidebar";
import { StatusBarChart, PriorityPieChart, CategoryLineChart } from "../components/Charts";
import AIChat from "../components/AIChat";
import {
  Menu, Plus, Trash2, CheckCircle, Clock, AlertCircle, Users,
  ListTodo, Bot, Loader2
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "General", priority: "Medium", dueDate: "" });
  const [formLoading, setFormLoading] = useState(false);

  const { data: taskData, isLoading } = useTasks({ limit: 100 });
  const { data: stats } = useTaskStats();
  const createTask = useCreateTask();
  const deleteTask = useDeleteTask();

  const tasks = taskData?.tasks || [];

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await createTask.mutateAsync(form);
      setForm({ title: "", description: "", category: "General", priority: "Medium", dueDate: "" });
      setShowAddTask(false);
    } catch { alert("Failed to create task."); }
    finally { setFormLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    await deleteTask.mutateAsync(id);
  };

  const overviewCards = [
    { label: "Total Tasks", value: stats?.total ?? 0, icon: ListTodo, color: "text-primary-500 bg-primary-50 dark:bg-primary-900/20" },
    { label: "In Progress", value: stats?.inProgress ?? 0, icon: Clock, color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
    { label: "Completed", value: stats?.done ?? 0, icon: CheckCircle, color: "text-green-500 bg-green-50 dark:bg-green-900/20" },
    { label: "High Priority", value: stats?.highPriority ?? 0, icon: AlertCircle, color: "text-red-500 bg-red-50 dark:bg-red-900/20" },
    ...(user?.role === "admin" ? [{ label: "Total Users", value: stats?.totalUsers ?? 0, icon: Users, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20" }] : []),
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold">Dashboard</h1>
              <p className="text-xs text-gray-500 dark:text-slate-400">Welcome back, {user?.name}</p>
            </div>
          </div>
          <button onClick={() => setShowAddTask(true)}
            className="flex items-center gap-2 bg-primary-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-primary-600 transition-colors">
            <Plus className="w-4 h-4" /> New Task
          </button>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {overviewCards.map((c) => (
            <div key={c.label} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${c.color}`}>
                <c.icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold">{c.value}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
            {[
              { title: "Task Status", chart: <StatusBarChart stats={stats} /> },
              { title: "By Priority", chart: <PriorityPieChart stats={stats} /> },
              { title: "By Category", chart: <CategoryLineChart stats={stats} /> },
            ].map(({ title, chart }) => (
              <div key={title} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
                <h3 className="text-sm font-semibold mb-4">{title}</h3>
                {chart}
              </div>
            ))}
          </div>
        )}

        {/* Task table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 mb-8">
          <div className="p-5 border-b border-gray-100 dark:border-slate-700">
            <h3 className="font-semibold">Recent Tasks</h3>
          </div>
          {isLoading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-slate-700">
                    {["Title", "Category", "Priority", "Status", "Due Date", "Action"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tasks.slice(0, 10).map((task) => (
                    <tr key={task.id} className="border-b border-gray-50 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-5 py-3 font-medium max-w-xs truncate">{task.title}</td>
                      <td className="px-5 py-3 text-gray-500 dark:text-slate-400">{task.category}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${task.priority === "High" ? "bg-red-100 text-red-600" : task.priority === "Medium" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${task.status === "Done" ? "bg-green-100 text-green-600" : task.status === "In Progress" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-400 dark:text-slate-500">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-5 py-3">
                        <button onClick={() => handleDelete(task.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* AI Chat */}
        <AIChat tasks={tasks} />

        {/* Add Task Modal */}
        {showAddTask && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-gray-100 dark:border-slate-700">
              <h2 className="text-lg font-bold mb-4">Add New Task</h2>
              <form onSubmit={handleCreate} className="space-y-3">
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Task title" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Description" rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: "category", options: ["General", "Development", "Design", "Backend", "AI", "Testing", "DevOps"] },
                    { key: "priority", options: ["Low", "Medium", "High"] },
                  ].map(({ key, options }) => (
                    <select key={key} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 capitalize">
                      {options.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ))}
                </div>
                <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                <div className="flex gap-2 pt-1">
                  <button type="button" onClick={() => setShowAddTask(false)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
                  <button type="submit" disabled={formLoading}
                    className="flex-1 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                    {formLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}