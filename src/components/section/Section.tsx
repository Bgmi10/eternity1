import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Star, Play, X, Loader2 } from "lucide-react"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { Dialog, DialogContent } from "../ui/Dialog"

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
}

export default function EnhancedSection({ data, title }: { data: MovieItem[]; title: string }) {
  const [active, setActive] = useState(0)
  const [imagesPerSlide, setImagesPerSlide] = useState(4)
  const [hoveredItem, setHoveredItem] = useState<MovieItem | null>(null)
  //@ts-ignore
  const [isHovering, setIsHovering] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const constraintsRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Handle window resize
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
  }

  const handlePrevSlide = () => {
    setActive(prev => (prev - 1 + totalSlides) % totalSlides)
  }
//@ts-ignore
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x > 0) {
        handlePrevSlide()
      } else {
        handleNextSlide()
      }
    }
    setIsDragging(false)
  }

  const handleTrailerClick = (movie: MovieItem) => {
    setSelectedMovie(movie)
    setModalOpen(true)
  }

  // Loading placeholder component
  const LoadingPlaceholder = () => (
    <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gray-600 animate-spin" />
      </div>
    </div>
  )

  return (
    <>
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
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            className="flex"
            animate={{ x: `-${(active * 100)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            {data.map((item, index) => (
              <motion.div
                key={item.id || index}
                className="relative flex-shrink-0 px-2"
                style={{ width: `${100 / imagesPerSlide}%` }}
                whileHover={{ scale: isDragging ? 1 : 1.05 }}
                onHoverStart={() => !isDragging && setHoveredItem(item)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <div className="relative rounded-lg overflow-hidden group">
                  {isLoading && <LoadingPlaceholder />}
                  <img
                    src={item.posterPath || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full lg:h-44 sm: h-22 object-cover"
                    onLoad={() => setIsLoading(false)}
                    loading="lazy"
                  />
                  
                  <AnimatePresence>
                    {hoveredItem === item && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 flex flex-col justify-between p-4 lg:block"
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
                            {item.genre.map((genre, idx) => (
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

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-4xl">
          <div className="relative aspect-video">
            <iframe
              className="w-full h-full"
              src={selectedMovie ? `https://www.youtube.com/embed/${selectedMovie.youtubeId}?autoplay=1` : ''}
              title={selectedMovie?.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              aria-label="Close trailer"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}