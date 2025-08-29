import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkillsSkeleton = () => {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-80 mx-auto mb-4 bg-gradient-to-r from-gray-300 via-blue-300 to-gray-300 dark:from-gray-700 dark:via-blue-700 dark:to-gray-700" />
          <Skeleton className="h-1 w-24 mx-auto mt-4 bg-gradient-to-r from-blue-400 to-purple-400" />
        </div>

        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-6">
            {[...Array(14)].map((_, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden border border-gray-200/80 dark:border-gray-700/50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg transition-all duration-500 w-32 shrink-0"
              >
                {/* Gradient overlay skeleton */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
                
                <div className="relative z-10 p-4 text-center">
                  {/* Image skeleton */}
                  <div className="w-16 h-16 mx-auto mb-3 relative">
                    <Skeleton className="w-full h-full rounded-lg bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700" />
                  </div>
                  
                  {/* Skill name skeleton */}
                  <Skeleton className="h-4 w-20 mx-auto bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};