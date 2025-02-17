"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-coverflow"
import { motion } from "framer-motion"
import { sliderData } from "../../utils/constants"
import { Play, VibrateOffIcon as VolumeOff, Volume2, VolumeX, VolumeOffIcon } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMute, setIsMute] = useState(true)
  const [isYTReady, setIsYTReady] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const playerRef = useRef<YT.Player | null>(null)
  const iframeRef = useRef<HTMLDivElement | null>(null)

  // Load YouTube IFrame API
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement("script")
        tag.src = "https://www.youtube.com/iframe_api"
        const firstScriptTag = document.getElementsByTagName("script")[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

        window.onYouTubeIframeAPIReady = () => {
          setIsYTReady(true)
        }
      } else {
        setIsYTReady(true)
      }
    }

    loadYouTubeAPI()
  }, [])

  // Create YouTube Player
  useEffect(() => {
    if (!isYTReady || !iframeRef.current || playerRef.current) return

    // Ensure `window.YT` and `window.YT.Player` are defined
    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player(iframeRef.current, {
        videoId: sliderData[activeIndex]?.trailerId,
        width: "500%",
        height: "500%",
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          loop: 1,
          mute: 1,
        },
        events: {
          onReady: (event: YT.PlayerEvent) => {
            event.target.mute()
            setIsMute(true)
            setIsVideoLoaded(true)
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo()
            }
          },
        },
      })
    }
  }, [isYTReady, activeIndex])

  // Destroy player on slide change
  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex)
    setIsVideoLoaded(false) // Reset video loaded state

    if (playerRef.current) {
      playerRef.current.destroy()
      playerRef.current = null
    }
  }

  // Toggle mute/unmute
  const toggleMute = () => {
    if (!playerRef.current) return

    if (isMute) {
      playerRef.current.unMute()
      setIsMute(false)
    } else {
      playerRef.current.mute()
      setIsMute(true)
    }
  }

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const posterVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -100 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  }

  const languageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 * index,
        ease: "easeOut",
      },
    }),
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  }

  return (
    <div className="w-full h-full z-10 mt-[-10px] relative">
      <Swiper
        modules={[Autoplay, Navigation, EffectCoverflow]}
        effect="coverflow"
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        }}
        onSlideChange={handleSlideChange}
        className="w-full"
      >
        {sliderData.map((item, index) => (
          <SwiperSlide key={item.objectId} className="relative">
            <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg shadow-lg">
              {/* Backdrop Image */}
              {!isVideoLoaded && (
                <motion.img
                  key={`backdrop-${activeIndex}`}
                  src={item.backdropURL}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full object-cover brightness-50"
                />
              )}

              <div className="absolute inset-0 w-full h-full mt-[-80px]">
                <div
                  id={`youtube-player-${item.objectId}`}
                  ref={iframeRef}
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-100"></div>
              <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black via-black/90 to-transparent"></div>

              {/* Slide Content */}
              <div className="absolute top-30 left-10 flex space-x-6">
                <motion.img
                  key={`poster-${activeIndex}`}
                  src={item.posterURL}
                  alt={item.name}
                  className="w-80 rounded-3xl shadow-2xl object-cover"
                  variants={posterVariants}
                  initial="hidden"
                  animate="visible"
                />
                <div className="absolute right-10 text-white mt-3 z-40" onClick={toggleMute}>
                  {isMute ? (
                    <VolumeOffIcon size={40} strokeWidth={3} className="cursor-pointer" />
                  ) : (
                    <Volume2 size={40} strokeWidth={3} className="cursor-pointer" />
                  )}
                </div>
                <div className="flex flex-col gap-8">
                  <motion.h3
                    key={`title-${activeIndex}`}
                    className="text-white font-extrabold text-6xl drop-shadow-lg"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {item.name}
                  </motion.h3>
                  <motion.span
                    key={`storyline-${activeIndex}`}
                    className="line-clamp-3 text-gray-200 font-stretch-50% text-xl"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                  >
                    {item.storyline}
                  </motion.span>
                  <div className="flex gap-2">
                    {item.languages.map((language, langIndex) => (
                      <motion.span
                        key={`${language}-${activeIndex}`}
                        className="text-xl text-white rounded-xl px-10 p-2 font-bold backdrop-blur-2xl bg-gradient-to-b from-gray-800"
                        variants={languageVariants}
                        initial="hidden"
                        animate="visible"
                        custom={langIndex}
                      >
                        {language}
                      </motion.span>
                    ))}
                  </div>
                  <div className="w-fit">
                    <motion.button
                      key={`button-${activeIndex}`}
                      className="bg-[#E50914] cursor-pointer p-3 text-white rounded-xl px-6 font-bold flex gap-2"
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      Watch Now <Play fill="white" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

