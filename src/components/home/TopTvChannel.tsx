"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

interface Channel {
  id: number
  image: string
  name: string
}

export default function TopTvChannels() {
  const data: Channel[] = [
    {
      id: 1,
      image: "https://eternityready.net/assets/images/channels/7.webp",
      name: "Harry Styles"
    },
    {
      id: 2,
      image: "https://eternityready.net/assets/images/channels/8.webp",
      name: "Jefferon Hall"
    },
    {
      id: 3,
      image: "https://eternityready.net/assets/images/channels/1.webp",
      name: "Alaya Pacheco"
    },
    {
      id: 4,
      image: "https://eternityready.net/assets/images/channels/2.webp",
      name: "Sarah Neal"
    },
    {
      id: 5,
      image: "https://eternityready.net/assets/images/channels/6.webp",
      name: "Emily Carey"
    },
    {
      id: 6,
      image: "https://eternityready.net/assets/images/channels/3.webp",
      name: "Emma Narburg"
    },
    {
      id: 7,
      image: "https://eternityready.net/assets/images/channels/4.webp",
      name: "Richard Cant"
    },
    {
      id: 8,
      image: "https://eternityready.net/assets/images/channels/5.webp",
      name: "David Horovitch"
    },
  ]

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

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
            Top TV Channels
          </h2>
          <p className="text-gray-400 text-sm">Most popular channels right now</p>
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

        {/* Channels Slider */}
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
          {data.map((channel) => (
            <motion.div
              key={channel.id}
              className="flex flex-col items-center flex-shrink-0 group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-40 rounded- overflow-hidden border-2 border-transparent  transition-all duration-300 shadow-lg">
                <img
                  src={channel.image}
                  alt={channel.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 rounded-full" />
              </div>
              <p className="mt-3 text-white font-medium text-center max-w-[100px] truncate">
                {channel.name}
              </p>
              <div className="mt-1 w-4 h-1 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}