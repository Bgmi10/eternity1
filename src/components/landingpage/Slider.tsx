import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { FaBookmark, FaPlay } from "react-icons/fa";
//@ts-ignore
import "swiper/css";
//@ts-ignore
import "swiper/css/effect-coverflow";
//@ts-ignore
import "swiper/css/pagination";
import { sliderData } from "../../utils/constants";

interface SliderData {
  objectId: string;
  name: string;
  titleImage: string;
  backdropURL: string;
  trailerId: string;
  label: string;
  storyline: string;
}

interface YouTubePlayer {
  destroy: () => void;
  mute: () => void;
  unMute: () => void;
  playVideo: () => void;
}

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  //@ts-ignore
  const [isMuted, setIsMuted] = useState(true);
  const [isYTReady, setIsYTReady] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
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
        videoId: data[activeIndex]?.trailerId,
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
  }, [isYTReady, activeIndex, data]);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
    setIsVideoLoaded(false);

    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
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
          disableOnInteraction: false,
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
            <div className="relative w-full h-full">
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

              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              {activeIndex === index && (
                <div className="absolute inset-0 flex items-center">
                  <div className="container px-4 md:px-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="max-w-3xl space-y-6"
                    >
                      <motion.img
                        src={item.titleImage}
                        alt={item.name}
                        className="h-24 md:h-32 object-contain"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                      
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-emerald-400 text-lg font-semibold"
                      >
                        {item.label}
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-white/90 text-lg md:text-xl line-clamp-3"
                      >
                        {item.storyline}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex items-center gap-4"
                      >
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                          <FaPlay className="text-lg" />
                          <span className="font-semibold">Watch Now</span>
                        </button>
                        <button className="p-3 bg-white hover:bg-gray-100 text-gray-900 rounded-full transition-colors">
                          <FaBookmark className="text-xl" />
                        </button>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <button
        onClick={toggleMute}
        className={cn(
          "absolute top-4 right-4 z-50 p-2 rounded-full backdrop-blur-md transition-all duration-300",
          "hover:bg-white/20",
          "text-white/80 hover:text-white"
        )}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </button> */}
    </div>
  );
}