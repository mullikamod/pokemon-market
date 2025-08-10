export default function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-soft animate-pulse">
      <div className="h-40 w-full rounded-xl bg-white/10" />
      <div className="mt-3 h-4 w-2/3 bg-white/10 rounded" />
      <div className="mt-2 h-3 w-1/2 bg-white/10 rounded" />
      <div className="mt-4 h-9 w-full bg-white/10 rounded-xl" />
    </div>
  );
}
