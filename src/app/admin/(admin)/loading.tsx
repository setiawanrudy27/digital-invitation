export default function AdminLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="h-3 w-40 animate-pulse rounded-full bg-muted" />
        <div className="h-8 w-72 max-w-full animate-pulse rounded-xl bg-muted" />
        <div className="h-4 w-96 max-w-full animate-pulse rounded-lg bg-muted/70" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-4 rounded-3xl border border-border/50 bg-surface/60 p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="size-12 animate-pulse rounded-3xl bg-muted" />
              <div className="h-3 w-16 animate-pulse rounded-full bg-muted/70" />
            </div>
            <div className="h-7 w-12 animate-pulse rounded-lg bg-muted" />
            <div className="h-3 w-40 animate-pulse rounded-full bg-muted/70" />
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-4 rounded-3xl border border-border/50 bg-surface/60 p-7">
            <div className="mb-4 flex items-center justify-between">
              <div className="size-11 animate-pulse rounded-3xl bg-muted" />
              <div className="size-5 animate-pulse rounded-md bg-muted" />
            </div>
            <div className="h-5 w-40 animate-pulse rounded-lg bg-muted" />
            <div className="h-4 w-72 max-w-full animate-pulse rounded-lg bg-muted/70" />
            <div className="h-9 w-36 animate-pulse rounded-2xl bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}