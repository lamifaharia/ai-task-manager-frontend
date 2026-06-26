import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../hooks/useTasks";
import TaskCard from "../components/TaskCard";
import SkeletonCard from "../components/SkeletonCard";
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Development", "Design", "Backend", "AI", "Testing", "DevOps", "General"];
const priorities = ["All", "High", "Medium", "Low"];
const statuses = ["All", "Todo", "In Progress", "Done"];

export default function Tasks() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [page, setPage] = useState(1);

  // Debounce search
  const handleSearch = useCallback(
    (() => {
      let timer;
      return (val) => {
        setSearch(val);
        clearTimeout(timer);
        timer = setTimeout(() => { setDebouncedSearch(val); setPage(1); }, 500);
      };
    })(),
    []
  );

  const params = {
    search: debouncedSearch || undefined,
    category: category !== "All" ? category : undefined,
    priority: priority !== "All" ? priority : undefined,
    status: status !== "All" ? status : undefined,
    sortBy,
    page,
    limit: 8,
  };

  const { data, isLoading } = useTasks(params);
  const tasks = data?.tasks || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">{data?.total ?? 0} tasks found</p>
        </div>
        {user && (
          <button onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 bg-primary-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-primary-600 transition-colors">
            <Plus className="w-4 h-4" /> New Task
          </button>
        )}
      </div>

      {/* Search + Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-4 mb-6 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search tasks by title or description..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Filter className="w-4 h-4 text-gray-400" />
          {[
            { label: "Category", value: category, set: setCategory, options: categories },
            { label: "Priority", value: priority, set: setPriority, options: priorities },
            { label: "Status", value: status, set: setStatus, options: statuses },
          ].map(({ label, value, set, options }) => (
            <select key={label} value={value} onChange={(e) => { set(e.target.value); setPage(1); }}
              className="text-sm px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
              {options.map((o) => <option key={o}>{o}</option>)}
            </select>
          ))}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="text-sm px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option value="date">Sort: Newest</option>
            <option value="priority">Sort: Priority</option>
            <option value="title">Sort: A–Z</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {!user && (
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 mb-6 text-sm text-primary-600 dark:text-primary-400 text-center">
          <Link to="/login" className="font-semibold underline">Sign in</Link> to see and manage your tasks.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading
          ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
          : tasks.length > 0
            ? tasks.map((task) => <TaskCard key={task.id} task={task} />)
            : (
              <div className="col-span-full text-center py-16 text-gray-400 dark:text-slate-500">
                <p className="text-lg font-medium">No tasks found</p>
                <p className="text-sm mt-1">Try adjusting your filters or create a new task.</p>
              </div>
            )
        }
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="p-2 rounded-xl border border-gray-200 dark:border-slate-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-500 dark:text-slate-400">Page {page} of {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="p-2 rounded-xl border border-gray-200 dark:border-slate-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}