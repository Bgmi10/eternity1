import { useState, useEffect, useRef } from "react"
import { Star, Play, X, Info, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import eternityLogo from "/assets/ETERNITY.webp";
import { useNavigate } from "react-router-dom";
import React from "react";
interface MovieItem {
  id: string
  posterPath: string
  title: string
  overview: string
  releasedYear: string
  genre: string[]
  duration: string
  months: string
  youtubeId: string
  rating: number
  loaded: boolean
}

export default function EnhancedSection({ data, title, sectionNavigation }: { data: MovieItem[]; title: string, sectionNavigation: string }) {
  const [active, setActive] = useState(0)
  const [imagesPerSlide, setImagesPerSlide] = useState(4)
  const [peekPercentage, setPeekPercentage] = useState(0) // Percentage of next image to show
  const [hoveredItem, setHoveredItem] = useState<MovieItem | null>(null)
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const constraintsRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [startX, setStartX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isMouseHoverSection, setIsMouseHoverSection] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setImagesPerSlide(2)
        setPeekPercentage(15) // Show 15% of the next image on small devices
      }
      else if (width < 1024) {
        setImagesPerSlide(3)
        setPeekPercentage(10) // Show 10% of the next image on medium devices
      }
      else {
        setImagesPerSlide(4)
        setPeekPercentage(0) // No peek on large devices
      }
    }   

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalSlides = Math.ceil(data.length / imagesPerSlide)

  const handleNextSlide = () => {
    setActive(prev => (prev + 1) % totalSlides)
    controls.start({ x: `-${((active + 1) * 100)}%` })
  }

  const handlePrevSlide = () => {
    setActive(prev => (prev - 1 + totalSlides) % totalSlides)
    controls.start({ x: `-${((active - 1) * 100)}%` })
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX)
    setDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return

    const currentX = e.touches[0].clientX
    const diff = startX - currentX
    const threshold = window.innerWidth * 0.1

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && active < totalSlides - 1) {
        handleNextSlide()
        setDragging(false)
      } else if (diff < 0 && active > 0) {
        handlePrevSlide()
        setDragging(false)
      }
    }
  }

  const handleTouchEnd = () => {
    setDragging(false)
  }

  const handleTrailerClick = (movie: MovieItem) => {
    setIsPlaying(prev => prev === movie.id ? null : movie.id)
  }

  const handleImageLoad = (itemId: string) => {
    setLoadedImages(prev => new Set([...prev, itemId]))
  }

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId)
      } else {
        newFavorites.add(itemId)
      }
      return newFavorites
    })
  }

  const LoadingPlaceholder = () => (
    <div className="absolute inset-0 rounded-xl flex items-center justify-center">
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img 
          src={eternityLogo} 
          alt="Loading..."
          className="w-16 lg:w-24"
        />
      </motion.div>
    </div>
  )

  // Calculate width for each item with peek effect
  //@ts-ignore
  const getItemWidth = (index: number) => {
    // Base width percentage based on images per slide
    const baseWidth = 100 / imagesPerSlide;
    
    // For most items, return the base width
    return `${baseWidth}%`;
  }

  // Calculate container padding to show peek effect
  const getContainerStyles = () => {
    if (peekPercentage > 0) {
      // Add negative right margin to create the peek effect
      return {
        paddingRight: `${peekPercentage}%`,
        marginRight: `-${peekPercentage}%`
      };
    }
    return {};
  }

  return (
    <div className="relative px-4 sm:px-6 py-6 lg:py-10 overflow-hidden mt-5">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:mb-8 mb-4"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center lg:gap-6 sm: gap-2">
            <h2 className="text-xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 drop-shadow-lg">
              {title}
            </h2>
          </div>
         <div className="flex items-center gap-3">
            <button className="text-teal-500 lg:mt-1 lg:text-lg cursor-pointer sm: text-sm flex items-center font-medium transition-all duration-300 hover:group hover:translate-x-2" onClick={() => navigate(sectionNavigation)}>
              View More
              <ChevronRight className="lg:w-6 lg:h-6 sm: w-5 sm: h-5 text-teal-500 lg:mt-[3px] sm: mt-0 transition-transform duration-300 ease-out " />
            </button>
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
        </div>
      </motion.div>

      <div 
        ref={constraintsRef}
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsMouseHoverSection(true)}
        onMouseLeave={() => setIsMouseHoverSection(false)}
        role="region"
        aria-label={`${title} movie carousel`}
        aria-roledescription="carousel"
        style={getContainerStyles()}
      >
        {/* Navigation Buttons */}
        {isMouseHoverSection && 
        <>
        <div className="bg-gradient-to-b from-black via-black/20 to-black/90"/>
        <div className="absolute inset-y-0 -left-3 z-30 lg:flex items-center hidden">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevSlide}
            className={`flex items-center justify-center cursor-pointer w-10 h-[150px] rounded-xl bg-gradient-to-br from-black-600/20 to-black/60 backdrop-blur-lg
                backdrop-opacity-90 
              focus:outline-none focus:ring-2 focus:ring-offset-black
              transition-all duration-300 transform lg:mr-4 mr-2
         `}
            disabled={active === 0}
            aria-label="Previous slide"
            aria-disabled={active === 0}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>
        </div>
        </>}
        
        {isMouseHoverSection &&
        <>
         <div className="bg-gradient-to-b from-black via-black/20 to-black/90"/>
        <div className="absolute inset-y-0 -right-8  z-30 lg:flex items-center hidden">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextSlide}
            className={`flex items-center justify-center cursor-pointer w-12 h-[150px] rounded-xl bg-gradient-to-br from-black-600/20 to-black/60 backdrop-blur-lg
                backdrop-opacity-90 
              focus:outline-none focus:ring-2 focus:ring-offset-black
              transition-all duration-300 transform lg:mr-4 mr-2
         `}
            disabled={active === totalSlides - 1}
            aria-label="Next slide"
            aria-disabled={active === totalSlides - 1}
          >
            <ChevronRight className="w-6 h-6 text-white hover:scale-110 mr-3" />
          </motion.button>
        </div>
        </>}
        
        <motion.div
          className="flex"
          animate={controls}
          initial={{ x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          aria-live="polite"
        >
          {data.map((item: MovieItem, index: number) => (
            <motion.div
              key={item.id || index}
              className="relative flex-shrink-0 px-2"
              style={{ 
                width: getItemWidth(index),
                transition: 'all 0.4s ease-out'
              }}
              
              onHoverStart={() => !dragging && setHoveredItem(item)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <motion.div 
                className="relative overflow-hidden group shadow-xl shadow-black/30 transform-gpu"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                role="group"
                aria-label={item.title}
              >
                <div className="w-full lg:h-[180px] sm: h-[100px] relative">
                  {isPlaying === item.id ? (
                    <div className="absolute inset-0 w-full bg-black">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=0`}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsPlaying(null)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors z-10 backdrop-blur-sm"
                        aria-label="Close trailer"
                      >
                        <X className="w-4 h-4 text-white" />
                      </motion.button>
                    </div>
                  ) : (
                    <>
                      {!loadedImages.has(item.id) && <LoadingPlaceholder />}
                      <img
                        src={item.posterPath}
                        alt={item.title}
                        className="absolute inset-0 h-full transition-all duration-500 group-hover:scale-105"
                        onLoad={() => setTimeout(() => handleImageLoad(item.id), 800)}
                        loading="lazy"
                        style={{
                          opacity: loadedImages.has(item.id) ? 1 : 0,
                          transition: 'all 0.5s ease-in-out'
                        }}
                      />
                      
                      {/* Enhanced Poster Gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-blue-600/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Fancy Glow Effect on Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent blur-xl" />
                      </div>
                      
                      {/* Favorite button with enhanced design */}
                      <motion.button
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10 shadow-lg"
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 0, 0, 0.2)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        aria-label={favorites.has(item.id) ? `Remove ${item.title} from favorites` : `Add ${item.title} to favorites`}
                        aria-pressed={favorites.has(item.id)}
                      >
                        <Heart 
                          className="w-4 h-4" 
                          fill={favorites.has(item.id) ? "currentColor" : "none"} 
                          color={favorites.has(item.id) ? "#ff4560" : "white"} 
                        />
                      </motion.button>
                      
                      {/* Enhanced Rating badge */}
                      <div className="absolute bottom-3 sm: hidden  left-3 lg:flex items-center bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/5 shadow-lg">
                        <Star className="w-3 h-3 mr-1 text-yellow-400" fill="currentColor"/> 
                        <span className="text-xs font-semibold text-white">{item.rating.toFixed(1)}</span>
                      </div>
                    </>
                  )}
                </div>
                
                <AnimatePresence>
                  {hoveredItem === item && !isPlaying && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80 backdrop-blur-sm lg:flex flex-col justify-between p-4 lg:p-6 sm: hidden"
                    >
                      <div>
                        <motion.h3 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-lg lg:text-xl font-bold text-white mb-2 leading-tight"
                        >
                          {item.title}
                        </motion.h3>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="flex items-center gap-2 text-xs"
                        >
                          <div className="flex items-center text-yellow-400">
                            <Star className="w-3 h-3 mr-0.5" fill="currentColor"/>
                            <span className="font-semibold">{item.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-gray-500">•</span>
                          <span className="text-red-500 font-medium">{item.duration}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-300">{item.releasedYear}</span>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="flex flex-wrap gap-1.5 mt-3"
                        >
                          {item.genre.slice(0, 3).map((genre: string, idx: number) => (
                            <span 
                              key={idx} 
                              className="text-xs px-2 py-0.5 bg-gradient-to-r from-white/15 to-white/5 rounded-full text-white/90 backdrop-blur-sm border border-white/10"
                            >
                              {genre}
                            </span>
                          ))}
                        </motion.div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <motion.button 
                          className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 shadow-lg shadow-red-600/20 cursor-pointer"
                          onClick={() => handleTrailerClick(item)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          aria-label={`Play trailer for ${item.title}`}
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span className="font-medium text-sm">Trailer</span>
                        </motion.button>
                        <motion.button 
                          className="p-2 rounded-lg bg-gradient-to-br from-white/15 to-white/5 hover:from-white/20 hover:to-white/10 transition-all duration-300 border border-white/10 shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`More information about ${item.title}`}
                        >
                          <Info className="w-4 h-4 text-white" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <AnimatePresence>
                {(
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="mt-2 lg:hidden px-1"
                  >
                    <h3 className="text-sm font-medium text-white truncate">{item.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs mt-1">
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-3 h-3 mr-0.5" fill="currentColor"/>
                        <span>{item.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-300">{item.releasedYear}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Show a gradient fade at the edge to hint at more content */}
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-black to-transparent hidden sm:block md:hidden pointer-events-none"></div>
      </div> 
    </div>
  )
}