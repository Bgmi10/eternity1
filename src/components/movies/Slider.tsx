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

interface YouTubePlayer {
  destroy: () => void;
  mute: () => void;
  unMute: () => void; 
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState: () => number;
}

interface Data {
  name: string;
  storyline: string;
  genres: string[];
  rating: string;
  label: string;
  backdropURL: string;
  titleImage: string;
  objectId: string;

}

export default function HeroSlider({ data }: { data: any }) {
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
          autoplay: 1,        // Start the video automatically
          controls: 0,        // Hide controls (play, pause, etc.)
          modestbranding: 1,  // Hide YouTube logo
          rel: 0,             // Prevent showing related videos at the end
          showinfo: 0,        // Hide video title and uploader info
          iv_load_policy: 3,  // Disable annotations
          autohide: 1,        // Hide controls automatically when video starts
          mute: 1,            // Mute the video initially (optional, based on your preference)
          enablejsapi: 1,     // Enable JavaScript API
          fs: 0,              // Disable fullscreen button
          cc_load_policy: 0,  // Disable closed  (if any)
          playsinline: 1,     // Play the video inline on mobile (no fullscreen mode)
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
            const videoId = data[activeIndex]?.trailerId;
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
        grabCursor
        centeredSlides
        slidesPerView={1}
        loop={false}
        pagination={false}
        onSlideChange={handleSlideChange}
        className="w-full h-[380px] md:h-[calc(100vh-5rem)]"
      >
        {data.map((item: Data, index: number) => (
          <SwiperSlide key={item.objectId}>
            <div 
              className="relative w-full h-full lg:mt-0"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
             {!isVideoLoaded && <div className="absolute inset-0">
                <img
                  src={item.backdropURL}
                  alt={item.name}
                  className="w-full  sm: h-[400px] lg:h-[900px] object-cover sm: mt-20 lg:mt-0"
                />
              </div>}
              {activeIndex === index && (
  <div 
    ref={playerContainerRef}
    className={`absolute bg-gradient-to-r from-black/90 via-black/50 to-transparent z-20 inset-0 transition-opacity duration-500 ${
      isVideoLoaded 
        ? 'opacity-100 lg:w-[2000px] lg:h-[1000px] lg:mt-[-130px] max-h-[1000px] w-[1000px] ml-[-300px] h-full sm: top-6 lg:top-0' 
        : 'opacity-0'
    }`}
  />
)}
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-transparent z-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent z-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20" />

              {activeIndex === index && (
                <div className="absolute inset-0 flex items-center lg:top-20 z-30 sm: top-18">
                  <div className="container px-4 md:px-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="max-w-4xl lg:space-y-8 sm: space-y-6"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:space-y-4 sm: space-y-4"
                      >
                        <motion.img
                          src={item.titleImage}
                          alt={item.name}
                          className="h-16 md:h-32 object-contain"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        
                        <motion.div 
                          className="flex items-center lg:gap-6 gap-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <span className="text-emerald-400 font-semibold lg:text-lg">
                            {item.label}
                          </span>
                          {item.rating && (
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Star className="lg:w-4 lg:h-4 w-3 h-6 fill-current" />
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
                                className="px-3 py-1 bg-white/10 rounded-full lg:text-sm  text-white/90"
                              >
                                {genre}
                              </span>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                      <div className="sm: hidden lg:block">
                        <motion.p
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 0.5, delay: 0.5 }}
                         className="text-white/90 text-lg md:text-xl leading-relaxed 
                                    lg:block w-1/2 hidden overflow-hidden text-ellipsis 
                                    line-clamp-2"
                         style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}
                        >
                          {item.storyline}
                        </motion.p>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex items-center gap-3"
                      >
                        <motion.button 
                          className={cn(
                            "group relative inline-flex items-center gap-2 lg:px-4 lg:py-2 px-3 py-2",
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
                          <FaPlay className="lg:text-lg text-sm relative z-10" />
                          <span className="font-semibold lg:text-lg text-sm relative z-10">Watch Now</span>
                        </motion.button>

                        <motion.button 
                          className={cn(
                            "lg:p-3 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full",
                            "backdrop-blur-md transition-all duration-300",
                            "border border-white/20"
                          )}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaBookmark className="lg:text-2xl text-sm" />
                        </motion.button>

                        <motion.button 
                          className={cn(
                            "lg:p-3 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full",
                            "backdrop-blur-md transition-all duration-300",
                            "border border-white/20"
                          )}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Info className="lg:w-6 lg:h-6 h-4 w-4" />
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
      <div className="flex justify-center gap-2 lg:mt-6">
        {data.map((_: Data, index: number) => (
          <button
            key={index}
            onClick={() => swiperRef.current.swiper.slideTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeIndex  === index ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
      <motion.button
        onClick={toggleMute}
        className={cn(
          "absolute top-20 right-6 z-40 p-3",
          "rounded-full backdrop-blur-md transition-all duration-300",
          "bg-black/20 hover:bg-black/40",
          "border border-white/20",
          "text-white/90 hover:text-white"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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