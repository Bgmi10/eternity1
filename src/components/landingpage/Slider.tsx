import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
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
  pauseVideo: () => void;
  getPlayerState: () => number;
}

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isYTReady, setIsYTReady] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  //@ts-ignore
  const [isHovered, setIsHovered] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);
  const activePlayerIdRef = useRef<string | null>(null);
  
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!(window as any).YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      
        (window as any).onYouTubeIframeAPIReady = () => {
          setIsYTReady(true);
        };
      } else if ((window as any).YT && (window as any).YT.Player) {
        setIsYTReady(true);
      }
    };

    loadYouTubeAPI();

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error("Error destroying player:", error);
        }
        playerRef.current = null;
      }
    };
  }, []);

  const createYouTubePlayer = (containerId: string, videoId: string) => {
    if (!videoId) {
      console.error("Invalid video ID");
      return;
    }
    
    const YT = (window as any).YT;
    if (!YT?.Player) {
      console.error("YouTube API not available");
      return;
    }
    
    const playerId = `youtube-player-${activeIndex}-${Date.now()}`;
    activePlayerIdRef.current = playerId;
    
    try {
      console.log(`Initializing player for ${videoId} with ID ${playerId}`);
      setIsVideoLoaded(false);
      
      playerRef.current = new YT.Player(containerId, {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          mute: 1,
          enablejsapi: 1,
        },
        events: {
          onReady: (event: any) => {
            if (activePlayerIdRef.current !== playerId) {
              console.log(`Player ${playerId} ready but no longer active, destroying`);
              event.target.destroy();
              return;
            }
            
            console.log(`Player ${playerId} ready, playing video`);
            event.target.mute();
            setIsMuted(true);
            event.target.playVideo();
            setIsVideoLoaded(true);
          },
          onStateChange: (event: any) => {
            if (activePlayerIdRef.current !== playerId) return;
            
            if (event.data === YT.PlayerState.ENDED) {
              event.target.playVideo();
            } else if (event.data === YT.PlayerState.PLAYING) {
              setIsVideoLoaded(true);
            }
          },
          onError: (event: any) => {
            console.error(`YouTube player error for ${playerId}:`, event.data);
            setIsVideoLoaded(false);
          }
        },
      });
    } catch (error) {
      console.error("Error initializing YouTube player:", error);
      setIsVideoLoaded(false);
    }
  };

  useEffect(() => {
    if (!isYTReady || !playerContainerRef.current) return;
    
    const initializePlayer = () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error("Error destroying previous player:", error);
        }
        playerRef.current = null;
      }
      
      if (playerContainerRef.current) {
        playerContainerRef.current.innerHTML = '';
        
        const playerDiv = document.createElement("div");
        const uniqueId = `player-container-${activeIndex}`;
        playerDiv.id = uniqueId;
        
        playerDiv.style.width = "100%";
        playerDiv.style.height = "100%";
        playerDiv.style.position = "absolute";
        playerDiv.style.top = "0";
        playerDiv.style.left = "0";
        
        playerContainerRef.current.appendChild(playerDiv);
        
        setTimeout(() => {
          if (document.getElementById(uniqueId)) {
            const videoId = sliderData[activeIndex]?.trailerId;
            if (videoId) {
              createYouTubePlayer(uniqueId, videoId);
            } else {  
              console.error(`No trailer ID for slide ${activeIndex}`);
            }
          }
        }, 300);
      }
    };
    
    const timer = setTimeout(initializePlayer, 250);
    return () => clearTimeout(timer);
  }, [isYTReady, activeIndex]);

  const handleSlideChange = (swiper: any) => {
    const newIndex = swiper.realIndex;
    activePlayerIdRef.current = null;
    
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (error) {
        console.error("Error destroying player during slide change:", error);
      }
      playerRef.current = null;
    }
    
    setActiveIndex(newIndex);
    setIsVideoLoaded(false);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch (error) {
      console.error("Error toggling mute:", error);
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
        loop={false}
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
             {!isVideoLoaded && <div className="absolute inset-0">
                <img
                  src={item.backdropURL}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>}
              
              {activeIndex === index && (
                <div 
                  ref={playerContainerRef}
                  className={`absolute  bg-gradient-to-r from-black/90 via-black/50 to-transparent z-20 inset-0 transition-opacity duration-500 ${
                    isVideoLoaded ? 'opacity-100 w-[2000px] h-[1000px] mt-[-130px] ml-[-200px]' : 'opacity-0'
                  }`}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20" />

              {activeIndex === index && (
                <div className="absolute inset-0 flex items-center top-20 z-30">
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
                            "group relative inline-flex items-center gap-2 lg:px-8 lg:py-4 px-4 py-3",
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

      {/* Volume control */}
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