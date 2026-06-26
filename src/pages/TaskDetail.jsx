import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeft, Calendar, Tag, Flag, User } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

export default function TaskDetail() {
  const { id } = useParams();

  const { data: task, isLoading, isError } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const { data } = await axios.get(`${API}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return data;
    },
  });

  if (isLoading) return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
      <div className="skeleton h-8 w-2/3" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-5/6" />
      <div className="skeleton h-40 w-full rounded-xl mt-4" />
    </div>
  );

  if (isError || !task) return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center">
      <p className="text-lg font-medium text-gray-500">Task not found.</p>
      <Link to="/tasks" className="text-primary-500 mt-3 inline-block hover:underline">← Back to tasks</Link>
    </div>
  );

  const priorityColors = { High: "text-red-500 bg-red-50 dark:bg-red-900/20", Medium: "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20", Low: "text-green-500 bg-green-50 dark:bg-green-900/20" };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link to="/tasks" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-500 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Tasks
      </Link>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-primary-500 to-accent-500" />

        <div className="p-6 sm:p-8">
          {/* Title + badges */}
          <div className="flex flex-wrap items-start gap-3 mb-4">
            <h1 className="text-2xl font-bold flex-1">{task.title}</h1>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${priorityColors[task.priority]}`}>
              {task.priority} Priority
            </span>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-slate-400 mb-6">
            <span className="flex items-center gap-1.5"><Flag className="w-4 h-4" /> {task.status}</span>
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {task.category}</span>
            {task.dueDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(task.dueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-2">Description</h2>
            <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">{task.description}</p>
          </div>

          {/* Tags */}
          {task.tags?.length > 0 && (
            <div>
              <h2 className="text-base font-semibold mb-2 flex items-center gap-1.5"><Tag className="w-4 h-4" /> Tags</h2>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Related tasks suggestion */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
            <h2 className="text-sm font-semibold mb-1">Related Actions</h2>
            <p className="text-xs text-gray-500 dark:text-slate-400">Use the AI Chat on your dashboard to get suggestions for this task.</p>
            <Link to="/dashboard" className="inline-block mt-2 text-xs text-primary-500 font-medium hover:underline">Open Dashboard →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}