import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const Resume = () => {
  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">Resume</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Download my complete resume to learn more about my experience,
          education, and achievements.
        </p>
        <Button size="lg" className="shadow-lg" asChild>
          <a href="/Pubudu_CV.pdf" download>
            <Download className="mr-2 h-5 w-5" />
            Download CV
          </a>
        </Button>
      </div>
    </section>
  );
};