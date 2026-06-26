import { Link } from "react-router-dom";
import { Calendar, Tag, ArrowRight } from "lucide-react";

const priorityColors = {
  High: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  Medium: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  Low: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
};

const statusColors = {
  "Todo": "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300",
  "In Progress": "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  "Done": "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
};

const categoryIcons = {
  Development: "💻", Design: "🎨", Backend: "⚙️", AI: "🤖",
  Testing: "🧪", DevOps: "🚀", General: "📋",
};

export default function TaskCard({ task }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden card-hover flex flex-col h-full">
      {/* Color header */}
      <div className="h-2 bg-gradient-to-r from-primary-500 to-accent-500" />

      <div className="p-5 flex flex-col flex-1">
        {/* Category + Priority */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-gray-500 dark:text-slate-400 flex items-center gap-1">
            <span>{categoryIcons[task.category] || "📋"}</span> {task.category}
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-base mb-2 line-clamp-2 leading-snug">{task.title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1">
          {task.description}
        </p>

        {/* Tags */}
        {task.tags?.length > 0 && (
          <div className="flex items-center gap-1.5 mt-3 flex-wrap">
            <Tag className="w-3 h-3 text-gray-400" />
            {task.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[task.status]}`}>
              {task.status}
            </span>
            {task.dueDate && (
              <span className="text-xs text-gray-400 dark:text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            )}
          </div>
          <Link to={`/tasks/${task.id}`} className="flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-600 transition-colors">
            View <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}