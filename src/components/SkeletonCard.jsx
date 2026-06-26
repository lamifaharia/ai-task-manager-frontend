export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
      <div className="skeleton h-40 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-5/6" />
        <div className="flex gap-2 mt-2">
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-6 w-16 rounded-full" />
        </div>
        <div className="skeleton h-9 w-full rounded-xl mt-2" />
      </div>
    </div>
  );
}