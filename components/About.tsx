import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Text Section */}
          <div>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I'm a passionate Information Technology student at the University
              of Moratuwa, currently pursuing my BSc (Hons) in IT. I have a
              strong interest in modern web development technologies and
              artificial intelligence.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              My journey in technology has led me to specialize in the MERN
              stack, where I enjoy building full-stack applications that solve
              real-world problems. I'm always eager to learn new technologies and
              take on challenging projects.
            </p>
          </div>

          {/* Right Card Section with Glowing Bottom-Right Element */}
          <div className="relative">
            {/* Main Card */}
            <Card className="shadow-lg relative z-10">
              <CardHeader>
                <CardTitle>Education & Interests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">University</h4>
                  <p className="text-muted-foreground">
                    BSc (Hons) in Information Technology
                  </p>
                  <p className="text-muted-foreground">University of Moratuwa</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Key Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Web Development</Badge>
                    <Badge variant="secondary">Artificial Intelligence</Badge>
                    <Badge variant="secondary">MERN Stack</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Glowing Corner Card */}
            <Card className="absolute top-5 left-5 w-0 h-0 rounded-xl z-0 shadow-[0px_0px_100px_30px_rgba(0,255,255,0.6)] bg-cyan-400/60 border-none -rotate-45" />
          </div>
        </div>
      </div>
    </section>
  );
};
