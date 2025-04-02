import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";

export default function NewReleases({ data }: { data?: any }) {
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
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
    <div className="bg-gradient-to-br from-black via-gray-900/40 to-black py-8 px-4 sm:px-6 lg:px-4 rounded-xl shadow-2xl relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-gray-400/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-gray-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Title section with enhanced styling */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-0 border-b border-white/10 pb-4">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-white text-2xl font-bold tracking-tight">
                New Releases 
              </h2>
            </div>
            <p className="text-gray-400 ml-3 mt-1 sm: hidden">Discover our latest collection of inspirational content</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2  backdrop-blur-md rounded-full p-1.5 border border-white/10 shadow-lg">
              {Array.from({ length: Math.min(5, totalSlides) }).map((_, idx) => (
                <motion.button
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active === idx ? 'bg-red-500 w-8' : 'bg-white/20 w-2 hover:bg-white/40'
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
            
            <div className="lg:flex items-center gap-2 sm: hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevSlide}
                className={`flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md
                  transition-all duration-300 border border-white/10 ${active === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                disabled={active === 0}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                className={`flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md
                  transition-all duration-300 border border-white/10 ${active === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                disabled={active === totalSlides - 1}
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Carousel section */}
        <motion.div
          ref={carousel}
          className="overflow-hidden"
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
                className="min-w-[220px] sm:min-w-[240px] p-3 transition-transform duration-300 ease-in-out"
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredItem(index)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <div className="bg-gradient-to-b from-gray-800/30 via-gray-900/40 to-black rounded-lg overflow-hidden transition-all duration-300 shadow-lg border border-white/5 h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.posterUrl || "/api/placeholder/400/225"}
                      alt={item.title || 'Movie poster'}
                      className="w-60 h-32 object-cover transition-transform duration-500 ease-out"
                      style={{
                        transform: hoveredItem === index ? 'scale(1.05)' : 'scale(1)'
                      }}
                    />
                    {/* Duration badge */}
                    <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                      {item.duration}
                    </div>
                    
                    {/* Popular tag if present */}
                    {item.popular && (
                      <div className="absolute top-3 right-3 bg-red-600/90 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm">
                        <TrendingUp size={12} />
                        <span>Popular</span>
                      </div>
                    )}
                    
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
                  
                  <div className="p-4">
                    <h3 className="font-bold text-white text-lg line-clamp-2 mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">by {item.postedBy}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}