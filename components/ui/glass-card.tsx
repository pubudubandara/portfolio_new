import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "group relative overflow-hidden",
          "border border-gray-200/20 dark:border-gray-700/30",
          "bg-blue-900/10 dark:bg-gray-500/20 backdrop-blur-lg",
          "shadow-lg hover:shadow-2xl hover:shadow-blue-500/20",
          "hover:bg-blue-900/20 dark:hover:bg-gray-800/40",
          "transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02]",
          className
        )}
        {...props}
      />
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
