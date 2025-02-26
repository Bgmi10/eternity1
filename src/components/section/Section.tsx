// import { useState } from "react"
// import { Star, Play, X, Info } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"
// import eternityLogo from "/assets/ETERNITY.webp";

// interface MovieItem {
//   id: string
//   posterPath: string
//   title: string
//   overview: string
//   releasedYear: string
//   genre: string[]
//   duration: string
//   months: string
//   youtubeId: string
//   rating: number
//   loaded: boolean
// }

// export default function EnhancedSection({ data, title }: { data: MovieItem[]; title: string }) {
//   const [hoveredItem, setHoveredItem] = useState<MovieItem | null>(null)
//   const [isPlaying, setIsPlaying] = useState<string | null>(null)
//   const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

//   const handleTrailerClick = (movie: MovieItem) => {
//     setIsPlaying(prev => prev === movie.id ? null : movie.id)
//   }

//   const handleImageLoad = (itemId: string) => {
//     setLoadedImages(prev => new Set([...prev, itemId]))
//   }

//   const LoadingPlaceholder = () => (
//     <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">
//       <motion.div
//         animate={{ 
//           scale: [1, 1.2, 1],
//           opacity: [0.5, 1, 0.5]
//         }}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       >
//         <img 
//           src={eternityLogo} 
//           alt="Loading..."
//           className="w-20 lg:w-32"
//         />
//       </motion.div>
//     </div>
//   )

//   return (
//     <div className="relative px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex items-center mb-8"
//       >
//         <div className="flex items-center gap-3">
//           <div className="h-8 w-1 bg-gradient-to-b from-red-600 via-red-500 to-red-700 rounded-full shadow-lg shadow-red-500/20" />
//           <h2 className="text-2xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
//             {title}
//           </h2>
//         </div>
//       </motion.div>

//       <motion.div 
//         className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {data.map((item, index) => (
//           <motion.div
//             key={item.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className={`relative group ${index % 3 === 0 ? 'lg:row-span-2' : ''}`}
//           >
//             <motion.div 
//               className="relative rounded-2xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-white/5 shadow-xl"
//               whileHover={{ scale: 1.02 }}
//               onHoverStart={() => setHoveredItem(item)}
//               onHoverEnd={() => setHoveredItem(null)}
//             >
//               <div className={`w-full ${index % 3 === 0 ? 'aspect-[2/3]' : 'aspect-video'} relative`}>
//                 {isPlaying === item.id ? (
//                   <div className="relative w-full h-full">
//                     <iframe
//                       className="absolute inset-0 w-full h-full"
//                       src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=0`}
//                       title={item.title}
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     />
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => setIsPlaying(null)}
//                       className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10 backdrop-blur-sm"
//                     >
//                       <X className="w-4 h-4 text-white" />
//                     </motion.button>
//                   </div>
//                 ) : (
//                   <>
//                     {!loadedImages.has(item.id) && <LoadingPlaceholder />}
//                     <img
//                       src={item.posterPath}
//                       alt={`${item.title} by eternityready`}
//                       className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
//                       onLoad={() => setTimeout(() => handleImageLoad(item.id), 2000)}
//                       loading="lazy"
//                       style={{
//                         opacity: loadedImages.has(item.id) ? 1 : 0,
//                         transition: 'all 0.5s ease-in-out'
//                       }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                     <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500" />
//                   </>
//                 )}
//               </div>

//               <AnimatePresence>
//                 {hoveredItem === item && !isPlaying && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 20 }}
//                     className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/60 backdrop-blur-sm flex flex-col justify-between p-4 lg:p-6"
//                   >
//                     <div>
//                       <motion.h3 
//                         initial={{ opacity: 0, y: -20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="text-lg lg:text-xl font-bold text-white mb-2 drop-shadow-lg line-clamp-2"
//                       >
//                         {item.title}
//                       </motion.h3>
//                       <motion.div 
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.1 }}
//                         className="flex items-center gap-2 text-sm flex-wrap"
//                       >
//                         <div className="flex items-center text-yellow-400">
//                           <Star className="w-4 h-4 mr-1" fill="currentColor"/>
//                           <span>{item.rating.toFixed(1)}</span>
//                         </div>
//                         <span className="text-gray-400">•</span>
//                         <span className="text-red-500 font-medium">{item.duration}</span>
//                         <span className="text-gray-400">•</span>
//                         <span className="text-gray-300">{item.releasedYear}</span>
//                       </motion.div>
//                       <motion.div 
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.2 }}
//                         className="flex flex-wrap gap-2 mt-3"
//                       >
//                         {item.genre.map((genre, idx) => (
//                           <span 
//                             key={idx} 
//                             className="text-xs px-3 py-1 bg-gradient-to-r from-white/10 to-white/5 rounded-full text-white backdrop-blur-sm border border-white/10 shadow-lg shadow-black/20"
//                           >
//                             {genre}
//                           </span>
//                         ))}
//                       </motion.div>
//                     </div>
                    
//                     <div className="flex gap-2 mt-4">
//                       <motion.button 
//                         className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-red-500/20 backdrop-blur-sm"
//                         onClick={() => handleTrailerClick(item)}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                       >
//                         <Play className="w-4 h-4" />
//                         <span className="font-medium">Watch Trailer</span>
//                       </motion.button>
//                       <motion.button 
//                         className="p-2.5 rounded-xl bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 transition-all duration-300 backdrop-blur-sm border border-white/10 shadow-lg shadow-black/20"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <Info className="w-5 h-5 text-white" />
//                       </motion.button>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <AnimatePresence>
//                 {!hoveredItem && !isPlaying && (
//                   <motion.div 
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent"
//                   >
//                     <h3 className="text-base font-semibold text-white truncate">{item.title}</h3>
//                     <div className="flex items-center gap-2 text-xs mt-1.5">
//                       <div className="flex items-center text-yellow-400">
//                         <Star className="w-3 h-3 mr-1" fill="currentColor"/>
//                         <span>{item.rating.toFixed(1)}</span>
//                       </div>
//                       <span className="text-gray-400">•</span>
//                       <span className="text-red-500 font-medium">{item.duration}</span>
//                       <span className="text-gray-400">•</span>
//                       <span className="text-gray-300">{item.releasedYear}</span>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   )
// }


import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Star, Play, X, Info, Heart } from "lucide-react"
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

export default function EnhancedSection({ data, title }: { data: MovieItem[]; title: string }) {
  const [active, setActive] = useState(0)
  const [imagesPerSlide, setImagesPerSlide] = useState(4)
  const [hoveredItem, setHoveredItem] = useState<MovieItem | null>(null)
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const constraintsRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [startX, setStartX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) setImagesPerSlide(2)
      else if (width < 1024) setImagesPerSlide(3)
      else setImagesPerSlide(5)  // Increased from 4 to 5 for wider displays
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
    <div className="absolute inset-0 rounded-xl flex items-center justify-center bg-gradient-to-br from-black to-gray-900">
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

  return (
    <div className="relative px-4 sm:px-6 lg:px-12 py-6 lg:py-10 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-gradient-to-b from-red-600 via-red-500 to-red-700 rounded-full shadow-lg shadow-red-500/20" />
          <h2 className="text-2xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            {title}
          </h2>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevSlide}
            className="relative p-2.5 rounded-full bg-black/40 hover:bg-black/70 transition-all duration-300 
            disabled:opacity-40 disabled:cursor-not-allowed backdrop-blur-sm border border-white/10 shadow-md"
            disabled={active === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextSlide}
            className="relative p-2.5 rounded-full bg-black/40 hover:bg-black/70 transition-all duration-300 
            disabled:opacity-40 disabled:cursor-not-allowed backdrop-blur-sm border border-white/10 shadow-md"
            disabled={active === totalSlides - 1}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </motion.div>

      <div 
        ref={constraintsRef}
        className="relative overflow-visible"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="flex"
          animate={controls}
          initial={{ x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        >
          {data.map((item: MovieItem, index: number) => (
            <motion.div
              key={item.id || index}
              className="relative flex-shrink-0 px-2"
              style={{ 
                width: `${100 / imagesPerSlide}%`,
                transition: 'all 0.4s ease-out'
              }}
              whileHover={{ 
                scale: dragging ? 1 : 1.05,
                zIndex: 20
              }}
              onHoverStart={() => !dragging && setHoveredItem(item)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <motion.div 
                className="relative rounded-xl overflow-hidden group shadow-xl shadow-black/30 transform-gpu"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="w-full h-0 pt-[150%] relative">
                  {isPlaying === item.id ? (
                    <div className="absolute inset-0 w-full h-full bg-black">
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
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        onLoad={() => setTimeout(() => handleImageLoad(item.id), 800)}
                        loading="lazy"
                        style={{
                          opacity: loadedImages.has(item.id) ? 1 : 0,
                          transition: 'all 0.5s ease-in-out'
                        }}
                      />
                      
                      {/* Poster gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-blue-600/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Favorite button */}
                      <motion.button
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                      >
                        <Heart 
                          className="w-4 h-4" 
                          fill={favorites.has(item.id) ? "currentColor" : "none"} 
                          color={favorites.has(item.id) ? "#ff4560" : "white"} 
                        />
                      </motion.button>
                      
                      {/* Rating badge */}
                      <div className="absolute bottom-3 left-3 flex items-center bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
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
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/70 backdrop-blur-sm hidden flex-col justify-between p-4 lg:p-10 lg:block"
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
                              className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/90 backdrop-blur-sm border border-white/10"
                            >
                              {genre}
                            </span>
                          ))}
                        </motion.div>
                        
                        {/* Short overview */}
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-xs text-gray-300 mt-3 line-clamp-3"
                        >
                          {item.overview || "No description available for this title."}
                        </motion.p>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <motion.button 
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-red-600/20 cursor-pointer"
                          onClick={() => handleTrailerClick(item)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span className="font-medium text-sm">Trailer</span>
                        </motion.button>
                        <motion.button 
                          className="p-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors border border-white/10"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Info className="w-4 h-4 text-white" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Title and info shown below poster on mobile */}
              <AnimatePresence>
                {!hoveredItem && (
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
      </div>
      
     
    </div>
  )
}