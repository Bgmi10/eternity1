"use client"

import { ChevronLeft, ChevronRight, Radio as RadioIcon, Volume2, Play} from "lucide-react"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

export default function Radio() {
  const data = [
    {
      id: 1,
      image: "https://eternityreadyradio.com/api/public/stations/thumbnail/eternityRadio.png",
      name: "Eternity Ready Radio"
    },
    {
      id: 2,
      image: "https://eternityready.net/assets/images/radio/2.webp",
      name: "Eternity Radio"
    },
    {
      id: 3,
      image: "https://eternityready.net/assets/images/radio/3.webp",
      name: "vertizontal media"
    },
    {
      id: 4,
      image: "https://eternityready.net/assets/images/radio/4.webp",
      name: "Channel worship"
    },
    {
      id: 5,
      image: "https://eternityready.net/assets/images/radio/5.webp",
      name: "KJOI"
    },
    {
      id: 6,
      image: "https://eternityready.net/assets/images/radio/6.webp",
      name: "ASG Radio"
    },
    {
      id: 7,
      image: "https://eternityready.net/assets/images/radio/7.webp",
      name: "Serene Be still & know"
    },
    {
      id: 8,
      image: "https://eternityready.net/assets/images/radio/8.webp",
      name: "Heaven`s Country"
    }
  ]

  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(2) // Default to your main station
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

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
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const scrollAmount = 300
    scrollContainerRef.current.scrollTo({
      left: direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount,
      behavior: "smooth"
    })
  }

  const togglePlay = (id: number) => {
    setCurrentPlaying(currentPlaying === id ? null : id)
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-xl shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Radio Stations</h2>
          <p className="text-gray-400 text-sm">Tune in to your favorite channels</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs font-medium bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-full transition-colors flex items-center gap-1">
            <RadioIcon className="h-3 w-3" />
            <span>All Stations</span>
          </button>
        </div>
      </div>

      {/* Featured Station (Your main company) */}
      {data[0] && (
        <div className="mb-8 relative rounded-xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent z-10" />
          <img 
            src={"https://eternityreadyradio.com/api/public/stations/EternityReadyRadio_logo.png"} 
            alt={data[0].name}
            className="w-full h-64 object-cover bg-black"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className="flex justify-between items-end">
              <div>
                <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full mb-2 inline-block">Featured Station</span>
                <h3 className="text-2xl font-bold text-white">{data[1].name}</h3>
                <p className="text-gray-300 text-sm">24/7 Inspirational Music & Talk</p>
              </div>
              <button 
                onClick={() => togglePlay(data[0].id)}
                className={`p-3 rounded-full ${currentPlaying === data[0].id ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/20 hover:bg-white/30'} transition-all`}
              >
                {currentPlaying === data[0].id ? (
                  <Volume2 className="h-6 w-6 text-white" />
                ) : (
                  <Play className="h-6 w-6 text-white fill-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Other Stations */}
      <div className="relative">
        {/* Navigation Arrows */}
        {showLeftArrow && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black text-white rounded-full p-2 shadow-lg -ml-2 backdrop-blur-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {showRightArrow && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black text-white rounded-full p-2 shadow-lg -mr-2 backdrop-blur-sm"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        {/* Stations Grid */}
        <div 
          ref={scrollContainerRef}
          className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {data.filter(item => item.id !== 2).map((station) => (
            <motion.div
              key={station.id}
              className="relative w-40 h-40 rounded-lg overflow-hidden group"
              whileHover={{ scale: 1.03 }}
              onMouseEnter={() => setHoveredItem(station.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <img 
                src={station.image} 
                alt={station.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h4 className="text-white font-medium truncate">{station.name}</h4>
              </div>
              {(hoveredItem === station.id || currentPlaying === station.id) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <button 
                    onClick={() => togglePlay(station.id)}
                    className={`p-3 rounded-full ${currentPlaying === station.id ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/20 hover:bg-white/30'} transition-all`}
                  >
                    {currentPlaying === station.id ? (
                      <Volume2 className="h-5 w-5 text-white" />
                    ) : (
                      <Play className="h-5 w-5 text-white fill-white" />
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}