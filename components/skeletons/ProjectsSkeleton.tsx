import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProjectsSkeleton = () => {
  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bg-muted/30 to-cyan-400/10"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[...Array(2)].map((_, index) => (
            <Card key={index} className="shadow-blue-500/50">
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[...Array(4)].map((_, badgeIndex) => (
                    <Skeleton key={badgeIndex} className="h-6 w-20" />
                  ))}
                </div>
                
                {/* Contribution skeleton */}
                <div className="mb-4">
                  <Skeleton className="h-4 w-28 mb-2" />
                  <div className="bg-muted/30 p-3 rounded-md border-l-4 border-primary">
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
