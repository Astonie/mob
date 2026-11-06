export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="animate-pulse space-y-6">
        <div className="h-52 w-full rounded-xl bg-slate-200" />
        <div className="h-4 w-1/3 rounded bg-slate-200" />
        <div className="h-3 w-2/3 rounded bg-slate-100" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 rounded-xl bg-slate-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
