import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkillsSkeleton = () => {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bg-muted/30 via-cyan-400/10 to-bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Skills & Technologies
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="shadow-blue-500/50">
              <CardHeader>
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 mr-2" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, badgeIndex) => (
                    <Skeleton key={badgeIndex} className="h-6 w-16" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
