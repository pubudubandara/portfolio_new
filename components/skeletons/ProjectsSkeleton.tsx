import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProjectsSkeleton = () => {
  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/15 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.3))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.05),rgba(255,255,255,0.2))]" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-80 mx-auto mb-4 bg-gradient-to-r from-gray-300 via-blue-300 to-gray-300 dark:from-gray-700 dark:via-blue-700 dark:to-gray-700" />
          <Skeleton className="h-1 w-24 mx-auto mt-4 bg-gradient-to-r from-blue-400 to-purple-400" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[...Array(2)].map((_, index) => (
            <Card 
              key={index} 
              className="border border-gray-200/80 dark:border-gray-700/50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg"
            >
              <CardHeader className="pb-4">
                <Skeleton className="h-7 w-3/4 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700" />
                <div className="space-y-2 mt-3">
                  <Skeleton className="h-4 w-full bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600" />
                  <Skeleton className="h-4 w-4/5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600" />
                  <Skeleton className="h-4 w-3/5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tech Stack skeleton */}
                <div className="space-y-3">
                  <Skeleton className="h-4 w-20 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700" />
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, badgeIndex) => (
                      <Skeleton 
                        key={badgeIndex} 
                        className="h-6 w-20 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50" 
                      />
                    ))}
                  </div>
                </div>
                
                {/* Contribution skeleton */}
                <div className="space-y-3">
                  <Skeleton className="h-4 w-28 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700" />
                  <div className="relative">
                    <Skeleton className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-400" />
                    <div className="bg-gradient-to-r from-blue-50/90 to-indigo-50/90 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 pl-6 rounded-r-lg border border-l-0 border-blue-200/50 dark:border-blue-800/30">
                      <Skeleton className="h-4 w-full mb-1 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600" />
                      <Skeleton className="h-4 w-3/4 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600" />
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons skeleton */}
                <div className="flex gap-3 pt-2">
                  <Skeleton className="h-9 flex-1 rounded-md bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600" />
                  <Skeleton className="h-9 flex-1 rounded-md bg-gradient-to-r from-blue-400 to-purple-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};