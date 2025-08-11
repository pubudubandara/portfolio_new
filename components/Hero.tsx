"use client";

import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export const Hero = () => {
  return (
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex w-[200px] h-[200px] justify-center items-center relative">
              {/* Colored rings - adjusted to hug the image */}
              <div className="w-full h-full shadow-2xl shadow-pink-500/40 bg-transparent rounded-full absolute animate-pulse -m-1"></div>
              <div className="w-full h-full shadow-2xl shadow-violet-500/40 bg-transparent rounded-full absolute rotate-90 animate-pulse -m-1"></div>
              <div className="w-full h-full shadow-2xl shadow-cyan-500/40 bg-transparent rounded-full absolute rotate-180 animate-pulse -m-1"></div>

              {/* Image - made slightly larger to overlap rings */}
              <Image
                src="/img.jpeg?height=200&width=200"
                alt="Pubudu Bandara"
                width={200}
                height={200}
                className="rounded-full shadow-lg relative z-10 w-[calc(100%-8px)] h-[calc(100%-8px)]"
              />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Pubudu Bandara
          </h1>
          <TypeAnimation
            className="text-xl sm:text-2xl text-muted-foreground mb-8"
            sequence={[
              "Undergraduate in Information Technology🎓",
              2000,
              "University of Moratuwa",
              2000,
              "Fullstack Developer 💻",
              2000,
            ]}
            repeat={Infinity}
            deletionSpeed={90}
            speed={80}
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Button size="lg" className="shadow-lg">
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </Button>
            <Button size="lg" variant="outline">
              <Mail className="mr-2 h-5 w-5" />
              Contact Me
            </Button>
          </div>
        </div>
      </section>
  );
};
