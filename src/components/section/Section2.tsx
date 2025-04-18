"use client"
import type React from "react"
import { FlameIcon as Fire, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, useAnimationControls } from "framer-motion"
import { useState, useRef, useEffect } from "react"
interface Data {
  id: number
  posterPath: string
  title: string
}

export default function Section2({ data }: { data: Data[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const controls = useAnimationControls()

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollContainerRef.current) return

      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 20)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20)
    }

    // Initial check
    checkScroll()

    // Add scroll event listener
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll)
      return () => scrollContainer.removeEventListener("scroll", checkScroll)
    }
  }, [data])

  // Scroll functions
  const scrollLeft20 = () => {
    if (!scrollContainerRef.current) return
    const newPosition = scrollContainerRef.current.scrollLeft - 440
    scrollContainerRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })
  }

  const scrollRight20 = () => {
    if (!scrollContainerRef.current) return
    const newPosition = scrollContainerRef.current.scrollLeft + 440
    scrollContainerRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })
  }

  // Mouse drag handlers for custom scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0))
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()

    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2 // Scroll speed multiplier
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  // Animation for new items indicator
  useEffect(() => {
    controls.start({
      x: [0, 10, 0],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        duration: 1.5,
      },
    })
  }, [controls])

  return (
    <div className="flex flex-col m-5 gap-6">
      {/* Header with badge */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="font-bold  text-xl lg:text-2xl bg-gradient-to-r from-gray-100 to-gray-600 via-gray-200 bg-clip-text text-transparent flex items-center gap-2">
            Most Watched
          </h2>
        </div>

        {/* New badge */}
        <motion.div
          className="bg-gradient-to-r from-red-600 to-red-600 text-white lg:px-3 lg:py-1 px-1 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg"
        >
          <Fire className="h-4 w-4 text-amber-500" fill="#FFBF00" />
          <span>New Arrivals</span>
        </motion.div>
      </div>

      {/* Scroll container with navigation */}
      <div className="relative group">
        {/* Left scroll button */}
        {showLeftArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-30 lg:top-30 -translate-y-1/2 z-20 bg-black/80 hover:bg-black text-white rounded-full p-2 shadow-lg -ml-4 backdrop-blur-sm"
            onClick={scrollLeft20}
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>
        )}

        {/* Right scroll button */}
        {showRightArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 top-30 lg:top-30 -translate-y-1/2 z-20 bg-black/80 hover:bg-black text-white rounded-full p-2 shadow-lg -mr-4 backdrop-blur-sm"
            onClick={scrollRight20}
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        )}

        {/* Scroll gradient indicators */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/90 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showLeftArrow ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showRightArrow ? "opacity-100" : "opacity-0"}`}
        />

        {/* Main scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 pt-2 px-3"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {data.map((item: Data) => (
            <motion.div
              key={item.id}
              className="relative overflow-hidden flex-shrink-0 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: item.id * 0.1 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
             <div className="relative">
                <img
                  src={item.posterPath}
                  alt={item.title || `Item ${item.id}`}
                  className="lg:w-full sm: w-[170px] h-52 object-cover shadow-md"
                  loading="lazy"
                />
               
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/90 transition-all duration-300" />
              
              </div>
              <p className="font-medium truncate text-shadow text-white mt-1">{item.title}</p>
            </motion.div>
          ))}

          {/* Add a "See all" card at the end */}
          <motion.div
            className="relative flex-shrink-0 lg:w-[80px] lg:h-[250px] rounded-lg border-2 border-dashed border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
          >
            <div className="text-teal-500 font-bold text-lg">See All</div>
            <ChevronRight className="h-8 w-8 text-teal-500 mt-2" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

