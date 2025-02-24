import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Star, Play, X } from "lucide-react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import eternityLogo from "/assets/ETERNITY.webp";

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

export default function EnhancedSection({ data, title }: { data: any; title: string }) {
  const [active, setActive] = useState(0)
  const [imagesPerSlide, setImagesPerSlide] = useState(4)
  const [hoveredItem, setHoveredItem] = useState<MovieItem | null>(null)
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const constraintsRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [startX, setStartX] = useState(0)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) setImagesPerSlide(2)
      else if (width < 1024) setImagesPerSlide(3)
      else setImagesPerSlide(4)
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

  const LoadingPlaceholder = () => (
    <div className="absolute inset-0 rounded-lg flex items-center justify-center">
      <img 
        src={eternityLogo} 
        alt="Loading..."
        className="animate-pulse sm: w-20 lg:w-full"
      />
    </div>
  )

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl lg:text-4xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrevSlide}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={active === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={handleNextSlide}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={active === totalSlides - 1}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div 
        ref={constraintsRef}
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="flex"
          animate={controls}
          initial={{ x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          {data.map((item: any, index: number) => (
            <motion.div
              key={item.id || index}
              className="relative flex-shrink-0 px-2"
              style={{ width: `${100 / imagesPerSlide}%` }}
              whileHover={{ scale: dragging ? 1 : 1.05 }}
              onHoverStart={() => !dragging && setHoveredItem(item)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <div className="relative rounded-lg overflow-hidden group">
                <div className="w-full lg:h-44 sm:h-22">
                  {isPlaying === item.id ? (
                    <div className="relative w-full h-full">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=0`}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <button
                        onClick={() => setIsPlaying(null)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ) : (
                    <>
                      {!loadedImages.has(item.id) && <LoadingPlaceholder />}
                      <img
                        src={item.posterPath || "/placeholder.svg"}
                        alt={`${item.title} by eternityready`}
                        className="w-full h-full object-cover"
                        onLoad={() => setTimeout(() => {handleImageLoad(item.id)}, 2000) }
                        loading="lazy"
                        style={{
                          opacity: loadedImages.has(item.id) ? 1 : 0,
                          transition: 'opacity 0.3s ease-in-out'
                        }}
                      />
                    </>
                  )}
                </div>
                
                <AnimatePresence>
                  {hoveredItem === item && !isPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/80 lg:flex flex-col justify-between p-4 sm: hidden"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex items-center text-yellow-400">
                            <Star className="w-4 h-4 mr-1" fill="currentColor"/>
                            <span>{item.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-white">•</span>
                          <span className="text-red-500">{item.duration}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.genre.map((genre: any, idx: number) => (
                            <span 
                              key={idx} 
                              className="text-xs px-2 py-1 bg-gray-700/50 rounded-full text-white"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <button 
                        className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        onClick={() => handleTrailerClick(item)}
                      >
                        <Play className="w-4 h-4" />
                        <span>Watch Trailer</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-2 lg:hidden">
                <h3 className="text-sm font-semibold text-white truncate">{item.title}</h3>
                <div className="flex items-center gap-2 text-xs mt-1">
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-3 h-3 mr-1" fill="currentColor"/>
                    <span>{item.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-white">•</span>
                  <span className="text-red-500">{item.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}