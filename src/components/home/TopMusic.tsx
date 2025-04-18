"use client"

import { ChevronLeft, ChevronRight, Clock, Play } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

interface MusicItem {
  id: number
  title: string
  year: number
  duration: string
  video: string
  postedAt: string
  image: string
}

export default function TopMusic() {
  const data: MusicItem[] = [
    {
      id: 1,
      title: "Justin Bieber",
      year: 2022,
      duration: "1 hr 25 mins",
      video: "TV-MA",
      postedAt: "2 years",
      image: "https://eternityready.net/assets/images/music/8.webp"
    },
    {
      id: 2,
      title: "Heavens Country",
      year: 2022,
      duration: "1 hr 25 mins",
      video: "TV-MA",
      postedAt: "2 years",
      image: "https://eternityready.net/assets/images/music/1.webp"
    },
    {
      id: 3,
      title: "Moby In this World",
      year: 2022,
      duration: "1 hr 25 mins",
      video: "TV-MA",
      postedAt: "2 years",
      image: "https://eternityready.net/assets/images/music/2.webp"
    },
    {
      id: 4,
      title: "Take Heart (MMXX)",
      year: 2022,
      duration: "1 hr 25 mins",
      video: "TV-MA",
      postedAt: "2 years",
      image: "https://eternityready.net/assets/images/music/3.webp"
    },
    {
      id: 5,
      title: "I still havent found what...",
      year: 2022,
      duration: "1 hr 25 mins",
      video: "TV-MA",
      postedAt: "2 years",
      image: "https://eternityready.net/assets/images/music/4.webp"
    },
    {
      id: 6,
      title: "Trytan blood of kings",
      year: 2022,
      duration: "1 hr 25 mins",
      video: "TV-MA",
      postedAt: "2 years",
      image: "https://eternityready.net/assets/images/music/5.webp"
    },
    {
      id: 7,
      title: "3D remedy- here is my heart",
      year: 2022,
      duration: "1 hr 25 mins",
      video: "TV-MA",
      postedAt: "2 years",
      image: "https://eternityready.net/assets/images/music/6.webp"
    },
    {
      id: 8,
      title: "Bibel study lauren",
      year: 2022,
      duration: "1 hr 25 mins",
      video: "TV-MA",
      postedAt: "2 years",
      image: "https://eternityready.net/assets/images/music/7.webp"
    },
  ]

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null)

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollContainerRef.current) return

      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 20)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20)
    }

    checkScroll()

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll)
      return () => scrollContainer.removeEventListener("scroll", checkScroll)
    }
  }, [data])

  const scrollLeft20 = () => {
    if (!scrollContainerRef.current) return
    const newPosition = scrollContainerRef.current.scrollLeft - 320
    scrollContainerRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })
  }

  const scrollRight20 = () => {
    if (!scrollContainerRef.current) return
    const newPosition = scrollContainerRef.current.scrollLeft + 320
    scrollContainerRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0))
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()

    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
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

  return (
    <div className="flex flex-col gap-6 px-4 py-8 bg-gradient-to-b from-gray-900 to-black rounded-xl shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white">
            Top Music Videos
          </h2>
          <p className="text-gray-400 text-sm">Most played tracks this week</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-xs font-medium bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-full transition-colors">
            View All
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative group">
        {/* Navigation Arrows */}
        {showLeftArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black text-white rounded-full p-2 shadow-lg -ml-2 backdrop-blur-sm"
            onClick={scrollLeft20}
            whileHover={{ scale: 1.1 }}
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
        )}

        {showRightArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black text-white rounded-full p-2 shadow-lg -mr-2 backdrop-blur-sm"
            onClick={scrollRight20}
            whileHover={{ scale: 1.1 }}
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        )}

        {/* Scroll gradient indicators */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/90 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showLeftArrow ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showRightArrow ? "opacity-100" : "opacity-0"}`}
        />

        {/* Music Slider */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 pt-2 px-2"
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
          {data.map((item) => (
            <motion.div
              key={item.id}
              className="flex flex-col flex-shrink-0 group w-56 h-52"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
              onMouseEnter={() => setHoveredItemId(item.id)}
              onMouseLeave={() => setHoveredItemId(null)}
            >
              <div className="relative rounded-md overflow-hidden shadow-lg h-full w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {hoveredItemId === item.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-teal-500/90 hover:bg-teal-400 text-white rounded-full p-3 shadow-xl transition-all transform hover:scale-110">
                      <Play className="h-6 w-6 fill-current" />
                    </button>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex justify-between items-center text-xs text-gray-200">
                    <span className="bg-black/70 px-2 py-1 rounded">{item.video}</span>
                    <div className="flex items-center gap-1 bg-black/70 px-2 py-1 rounded">
                      <Clock className="h-3 w-3" />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 px-1">
                <h3 className="font-semibold text-white truncate">{item.title}</h3>
                <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
                  <span>{item.year}</span>
                  <span>{item.postedAt}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}