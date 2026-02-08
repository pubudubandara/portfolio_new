import React from "react";

const BackgroundAnimation = () => {
  // Generate random stars
  const generateStars = (count: number) => {
    const stars = [];
    const moveAnimations = [
      "animate-move-star-1",
      "animate-move-star-2",
      "animate-move-star-3",
    ];
    const delays = [
      "",
      "animation-delay-500",
      "animation-delay-1000",
      "animation-delay-1500",
      "animation-delay-2000",
      "animation-delay-2500",
      "animation-delay-3000",
      "animation-delay-3500",
    ];
    const sizes = ["w-0.5 h-0.5", "w-0.4 h-0.4", "w-0.3 h-0.3"];

    for (let i = 0; i < count; i++) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const moveAnimation =
        moveAnimations[Math.floor(Math.random() * moveAnimations.length)];
      const delay = delays[Math.floor(Math.random() * delays.length)];
      const size = sizes[Math.floor(Math.random() * sizes.length)];

      stars.push(
        <div
          key={i}
          className={`absolute ${size} bg-white dark:bg-white rounded-full ${moveAnimation} ${delay} transition-all duration-300`}
          style={{
            top: `${top}%`,
            left: `${left}%`,
            opacity: Math.random() * 0.5 + 0.3,
          }}
        />,
      );
    }
    return stars;
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-50 dark:bg-slate-950 star-container">
  {/* Blur overlay */}
  <div className="absolute inset-0 z-[1] backdrop-blur-[150px]" />

  {/* Animation Container */}
  <div className="relative w-full h-full">
    
    {/* Blob 1: Blue - Top Left */}
    <div className="absolute top-0 left-0 w-72 h-72 md:w-[600px] md:h-[600px] 
                    bg-slate-900 dark:bg-blue-800 rounded-full 
                    mix-blend-multiply dark:mix-blend-screen 
                    filter blur-[80px] md:blur-[120px] 
                    opacity-60 dark:opacity-40 md:opacity-70 md:dark:opacity-40
                    animate-blob" />

    {/* Blob 2: Purple - Top Right */}
    <div className="absolute top-0 right-0 w-64 h-64 md:w-[550px] md:h-[550px] 
                    bg-purple-700 dark:bg-purple-800 rounded-full 
                    mix-blend-multiply dark:mix-blend-screen 
                    filter blur-[80px] md:blur-[100px] 
                    opacity-60 dark:opacity-35 md:opacity-70 md:dark:opacity-35
                    animate-blob-reverse animation-delay-2000" />

    {/* Blob 3: Cyan/Pink - Bottom Left */}
    <div className="absolute -bottom-20 -left-10 md:-bottom-32 md:left-20 
                    w-72 h-72 md:w-[580px] md:h-[580px] 
                    bg-cyan-800 dark:bg-pink-700 rounded-full 
                    mix-blend-multiply dark:mix-blend-screen 
                    filter blur-[80px] md:blur-[110px] 
                    opacity-60 dark:opacity-40 md:opacity-70 md:dark:opacity-40
                    animate-blob animation-delay-4000" />

    {/* Blob 4: Indigo - Bottom Right */}
    <div className="absolute bottom-10 right-0 w-60 h-60 md:w-[500px] md:h-[500px] 
                    bg-indigo-800 dark:bg-indigo-600 rounded-full 
                    mix-blend-multiply dark:mix-blend-screen 
                    filter blur-[60px] md:blur-[90px] 
                    opacity-50 dark:opacity-30 md:opacity-60 md:dark:opacity-30
                    animate-blob-reverse animation-delay-6000" />

    {/* Blob 5: Violet - Center */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    w-80 h-80 md:w-[650px] md:h-[650px] 
                    bg-violet-800 dark:bg-violet-800 rounded-full 
                    mix-blend-multiply dark:mix-blend-screen 
                    filter blur-[90px] md:blur-[130px] 
                    opacity-50 dark:opacity-35 md:opacity-60 md:dark:opacity-35
                    animate-blob animation-delay-2000" />

    {/* Blob 6: Rose - Middle Right */}
    <div className="absolute top-1/2 right-0 -translate-y-1/2 
                    w-60 h-60 md:w-[500px] md:h-[500px] 
                    bg-rose-400 dark:bg-purple-900 rounded-full 
                    mix-blend-multiply dark:mix-blend-screen 
                    filter blur-[70px] md:blur-[100px] 
                    opacity-35 dark:opacity-20 md:opacity-35 md:dark:opacity-15
                    animate-blob-reverse animation-delay-4000" />

    {/* Starry Sky Layer */}
    <div className="absolute inset-0 z-[2]">{generateStars(100)}</div>
  </div>
</div>
  );
};

export default BackgroundAnimation;
