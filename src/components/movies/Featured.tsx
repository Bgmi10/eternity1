import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

export default function Featured({ data }: { data: any }) {
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState(0);
  const [isMouseHoverSection, setIsMouseHoverSection] = useState(false);
  const [imagesPerSlide, setImagesPerSlide] = useState(4);
  const carousel = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setImagesPerSlide(2);
      } else if (width < 1024) {
        setImagesPerSlide(3);
      } else {
        setImagesPerSlide(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data]);

  const totalSlides = Math.ceil(data.length / imagesPerSlide);

  const handleNextSlide = () => {
    if (active < totalSlides - 1) {
      setActive(prev => prev + 1);
      controls.start({ x: `-${(active + 1) * 100}%` });
    }
  };

  const handlePrevSlide = () => {
    if (active > 0) {
      setActive(prev => prev - 1);
      controls.start({ x: `-${(active - 1) * 100}%` });
    }
  };

  return (
    <div className="bg-black py-8 px-4 rounded-lg shadow-lg my-10 max-w-8xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold relative inline-block pb-2">
          Featured
          <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-red-600"></span>
        </h2>
        
        <div className="hidden md:flex items-center gap-2 bg-black/30 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-lg">
          {Array.from({ length: Math.min(5, totalSlides) }).map((_, idx) => (
            <motion.button
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                active === idx ? 'bg-red-500 w-6' : 'bg-white/30 hover:bg-white/50'
              }`}
              onClick={() => {
                setActive(idx);
                controls.start({ x: `-${idx * 100}%` });
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={active === idx ? "true" : "false"}
            />
          ))}
        </div>
      </div>
      
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsMouseHoverSection(true)}
        onMouseLeave={() => setIsMouseHoverSection(false)}
        role="region"
        aria-label="Featured content carousel"
      >
        {isMouseHoverSection && (
          <>
            <div className="absolute inset-y-0 -left-3 z-30 lg:flex items-center hidden mb-16">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevSlide}
                className={`flex items-center justify-center cursor-pointer w-10 h-[150px] rounded-xl bg-gradient-to-br from-black-600/20 to-black/60 backdrop-blur-lg
                  backdrop-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-black
                  transition-all duration-300 transform lg:mr-4 mr-2
                  ${active === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                disabled={active === 0}
                aria-label="Previous slide"
                aria-disabled={active === 0}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            <div className="absolute inset-y-0 -right-8 z-30 lg:flex items-center hidden mb-16">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                className={`flex items-center justify-center cursor-pointer w-12 h-[150px] rounded-xl bg-gradient-to-br from-black-600/20 to-black/60 backdrop-blur-lg
                  backdrop-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-black
                  transition-all duration-300 transform lg:mr-4 mr-2
                  ${active === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                disabled={active === totalSlides - 1}
                aria-label="Next slide"
                aria-disabled={active === totalSlides - 1}
              >
                <ChevronRight className="w-6 h-6 text-white hover:scale-110 mr-3" />
              </motion.button>
            </div>
          </>
        )}
        
        <motion.div
          ref={carousel}
          className="overflow-hidden cursor-grab"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="flex"
            animate={controls}
            initial={{ x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            aria-live="polite"
          >
            {data.map((item: any, index: number) => (
              <motion.div
                key={index}
                className="min-w-[240px] p-2 transition-transform duration-300 ease-in-out"
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="bg-gradient-to-b from-gray-400/20 via-black to-black overflow-hidden transition-colors duration-300 shadow-lg">
                  <div className="relative">
                    <img
                      src={item.posterUrl}
                      alt={item.title || 'Featured item'}
                      className="h-32 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <motion.div 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.9 }}
                        className="bg-red-600/80 p-3 rounded-full"
                      >
                        <Play className="text-white" size={20} fill='white' />
                      </motion.div>
                    </div>
                  </div>
                  <div className="p-4 text-white">
                    <h3 className="font-bold text-md line-clamp-2">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Show a gradient fade at the edge to hint at more content */}
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
      </div>
      
      <div className="flex justify-center mt-6 space-x-3 md:hidden">
        {Array.from({ length: Math.min(3, totalSlides) }).map((_, idx) => (
          <span 
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === active ? 'bg-red-600' : 'bg-gray-600'}`}
          ></span>
        ))}
      </div>
    </div>
  );
}