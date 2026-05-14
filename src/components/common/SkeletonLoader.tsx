function Shimmer({ className }: { className: string }) {
  return <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded ${className}`} />;
}

export function HeroSkeleton() {
  return (
    <div className="min-h-[90vh] bg-gray-100 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-6">
          <Shimmer className="h-8 w-48 rounded-full" />
          <Shimmer className="h-16 w-full" />
          <Shimmer className="h-16 w-3/4" />
          <Shimmer className="h-6 w-2/3" />
          <div className="flex gap-4 pt-4">
            <Shimmer className="h-14 w-48 rounded-lg" />
            <Shimmer className="h-14 w-48 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <Shimmer className="h-48 w-full rounded-lg" />
          <Shimmer className="h-4 w-24 rounded-full" />
          <Shimmer className="h-6 w-3/4" />
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}

export function ListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md p-6 flex gap-6">
          <Shimmer className="h-20 w-20 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <Shimmer className="h-5 w-3/4" />
            <Shimmer className="h-4 w-1/2" />
            <Shimmer className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PageSkeleton() {
  return (
    <div className="min-h-[60vh]">
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Shimmer className="h-12 w-64" />
          <Shimmer className="h-6 w-96 max-w-full" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CardSkeleton count={6} />
      </div>
    </div>
  );
}
