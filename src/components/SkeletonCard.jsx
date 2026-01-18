export default function SkeletonCard() {
  return (
    <div className="bg-slate-100 dark:bg-slate-800/50 rounded-[2.5rem] p-6 animate-pulse border border-slate-200 dark:border-slate-700">
      <div className="w-full h-64 bg-slate-200 dark:bg-slate-700 rounded-3xl mb-6"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-6"></div>
      <div className="flex justify-between items-center">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-xl w-28"></div>
      </div>
    </div>
  );
}