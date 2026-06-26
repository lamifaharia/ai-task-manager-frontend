import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";

const COLORS = ["#4f46e5", "#7c3aed", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

export function StatusBarChart({ stats }) {
  const data = [
    { name: "Todo", value: stats.todo || 0 },
    { name: "In Progress", value: stats.inProgress || 0 },
    { name: "Done", value: stats.done || 0 },
  ];
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PriorityPieChart({ stats }) {
  const data = Object.entries(stats.byPriority || {}).map(([name, value]) => ({ name, value }));
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
          {data.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function CategoryLineChart({ stats }) {
  const data = Object.entries(stats.byCategory || {}).map(([name, value]) => ({ name, tasks: value }));
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey="tasks" fill="#7c3aed" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}