import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { Volume2, VolumeX, Star, Info } from "lucide-react";
import { cn } from "../../lib/utils";
  //@ts-ignore
import "swiper/css";
  //@ts-ignore
import "swiper/css/effect-coverflow";
  //@ts-ignore
import "swiper/css/pagination";
import { sliderData } from "../../utils/constants"

interface YouTubePlayer {
  destroy: () => void;
  mute: () => void;
  unMute: () => void;
  playVideo: () => void;
}

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isYTReady, setIsYTReady] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  //@ts-ignore
  const [isHovered, setIsHovered] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const iframeRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!(window as any).YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        (window as any).onYouTubeIframeAPIReady = () => setIsYTReady(true);
      } else {
        setIsYTReady(true);
      }
    };

    loadYouTubeAPI();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!isYTReady || !iframeRef.current || playerRef.current) return;

    const YT = (window as any).YT;
    if (YT?.Player) {
      playerRef.current = new YT.Player(iframeRef.current, {
        videoId: sliderData[activeIndex]?.trailerId,
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
          onReady: (event: any) => {
            event.target.mute();
            setIsMuted(true);
            setIsVideoLoaded(true);
          },
          onStateChange: (event: any) => {
            if (event.data === YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          },
        },
      });
    }
  }, [isYTReady, activeIndex, sliderData]);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
    setIsVideoLoaded(false);

    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={1}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        coverflowEffect={{
          rotate: 15,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          renderBullet: (_, className) => {
            return `<span class="${className} w-2 h-2 bg-white/50 rounded-full transition-all duration-300 hover:bg-white"></span>`;
          },
        }}
        onSlideChange={handleSlideChange}
        className="w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]"
      >
        {sliderData.map((item, index) => (
          <SwiperSlide key={item.objectId}>
            <div 
              className="relative w-full h-full"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <AnimatePresence mode="wait">
                {!isVideoLoaded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <motion.img
                      src={item.backdropURL}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              {activeIndex === index && (
                <div className="absolute inset-0 flex items-center top-20">
                  <div className="container px-4 md:px-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="max-w-4xl space-y-8"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-4"
                      >
                        <motion.img
                          src={item.titleImage}
                          alt={item.name}
                          className="h-24 md:h-32 object-contain"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        
                        <motion.div 
                          className="flex items-center gap-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <span className="text-emerald-400 font-semibold text-lg">
                            {item.label}
                          </span>
                          {item.rating && (
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="font-medium">{item.rating}</span>
                            </div>
                          )}
                          
                        </motion.div>

                        {item.genres && (
                          <motion.div 
                            className="flex flex-wrap gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            {item.genres.map((genre) => (
                              <span 
                                key={genre}
                                className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/90"
                              >
                                {genre}
                              </span>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-white/90 text-lg md:text-xl line-clamp-2 leading-relaxed"
                      >
                        {item.storyline}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex items-center gap-4"
                      >
                        <motion.button 
                          className={cn(
                            "group relative inline-flex items-center gap-2 lg:px-8 lg:py-4 sm: px-3 sm: py-3",
                            "bg-red-600 hover:bg-red-700 text-white rounded-lg",
                            "transition-all duration-300 ease-out",
                            "overflow-hidden"
                          )}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                          <FaPlay className="text-lg relative z-10" />
                          <span className="font-semibold text-lg relative z-10">Watch Now</span>
                        </motion.button>

                        <motion.button 
                          className={cn(
                            "p-4 bg-white/10 hover:bg-white/20 text-white rounded-full",
                            "backdrop-blur-md transition-all duration-300",
                            "border border-white/20"
                          )}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaBookmark className="text-2xl" />
                        </motion.button>

                        <motion.button 
                          className={cn(
                            "p-4 bg-white/10 hover:bg-white/20 text-white rounded-full",
                            "backdrop-blur-md transition-all duration-300",
                            "border border-white/20"
                          )}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Info className="w-6 h-6" />
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.button
        onClick={toggleMute}
        className={cn(
          "absolute top-20 right-6 z-40 p-3",
          "rounded-full backdrop-blur-md transition-all duration-300",
          "bg-black/20 hover:bg-black/40",
          "border border-white/20",
          "text-white/90 hover:text-white"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
}