import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function SkipCardSkeleton() {
  return (
    <Card
      className={`
        bg-gray-900 p-0 border-gray-700 text-white transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20
        hover:border-gray-600
        w-full max-w-sm mx-auto
      `}
      role="article"
      tabIndex={0}
    >
      <CardHeader className="pb-3 p-0">
        <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden bg-gray-800">
          <Skeleton className="w-full h-full object-cover" />
          <div className="absolute top-3 right-3">
            <Skeleton className="h-6 w-14 rounded-full bg-blue-600" />
          </div>
          <div className="flex flex-wrap gap-2 absolute bottom-1 left-3">
            <Skeleton className="h-5 w-28 rounded-md" />
            <Skeleton className="h-5 w-28 rounded-md" />
          </div>
        </div>

        <Skeleton className="h-6 w-3/4 mb-2 mx-5 rounded" />
      </CardHeader>

      <div className="flex flex-col justify-between gap-4 h-full">
        <CardContent className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24 bg-gray-700 rounded" />
              <Skeleton className="h-4 w-12 bg-white/50 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24 bg-gray-700 rounded" />
              <Skeleton className="h-4 w-12 bg-white/50 rounded" />
            </div>
            <hr className="border-gray-600 my-2" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24 bg-white/80 rounded" />
              <Skeleton className="h-6 w-20 bg-white/80 rounded" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="w-4 h-4 rounded-full " />
                <Skeleton className="h-4 w-20 bg-gray-500 rounded" />
                <Skeleton className="h-4 w-16 bg-gray-500 rounded" />
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-2">
          <Skeleton className="h-10 w-full rounded-md " />
        </CardFooter>
      </div>
    </Card>
  );
}
