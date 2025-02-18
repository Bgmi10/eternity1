import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow, Pagination } from "swiper/modules";
 //@ts-ignore
import "swiper/css";
 //@ts-ignore
import "swiper/css/navigation";
 //@ts-ignore
import "swiper/css/effect-coverflow";
import { motion } from "framer-motion";
import { sliderData } from "../../utils/constants";
import { Bookmark, Play, Volume2, VolumeOffIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { FaBookmark, FaPlay } from "react-icons/fa";

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMute, setIsMute] = useState(true);
  const [isYTReady, setIsYTReady] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    //@ts-ignore
  const playerRef = useRef<YT.Player | null>(null);
  const iframeRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef(null);

  // Load YouTube IFrame API
  useEffect(() => {
    const loadYouTubeAPI = () => {
        //@ts-ignore
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
          //@ts-ignore
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  //@ts-ignore
        window.onYouTubeIframeAPIReady = () => {
          setIsYTReady(true);
        };
      } else {
        setIsYTReady(true);
      }
    };

    loadYouTubeAPI();
  }, []);

  // Create YouTube Player
  useEffect(() => {
    if (!isYTReady || !iframeRef.current || playerRef.current) return;
  //@ts-ignore
    if (window.YT && window.YT.Player) {
        //@ts-ignore
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
            //@ts-ignore
          onReady: (event: YT.PlayerEvent) => {
            event.target.mute();
            setIsMute(true);
            setIsVideoLoaded(true);
          },
          //@ts-ignore
          onStateChange: (event: YT.OnStateChangeEvent) => {
              //@ts-ignore
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          },
        },
      });
    }
  }, [isYTReady, activeIndex]);

  // Destroy player on slide change
  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
    setIsVideoLoaded(false); // Reset video loaded state

    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    if (!playerRef.current) return;

    if (isMute) {
      playerRef.current.unMute();
      setIsMute(false);
    } else {
      playerRef.current.mute();
      setIsMute(true);
    }
  };

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const posterVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -100 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };


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
  };

  const handleSlideClick = (index: any) => {
    // @ts-ignore
    swiperRef.current.swiper.slideTo(index);
  };

  return (
    <div className={`w-full h-full z-10 mt-[-10px] relative`} >
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Navigation, EffectCoverflow, Pagination]}
        grabCursor={true}
        effect="coverflow"
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        centeredSlides={true}
        pagination={{ clickable: true }}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        }}
        onSlideChange={handleSlideChange}
        className={`w-full`}
      >
        {sliderData.map((item) => (
          <SwiperSlide key={item.objectId} className="relative">
            <div className="relative w-full md:h-[600px] lg:h-[700px] overflow-hidden shadow-lg sm: mt-20 lg:mt-0">
              {/* Backdrop Image */}
              {!isVideoLoaded && (
                <motion.img
                  key={`backdrop-${activeIndex}`}
                  src={item.backdropURL}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                />
              )}

                 {/* <div className="absolute inset-0 w-full h-full mt-[-80px] sm: hidden lg:block">
                <div
                  id={`youtube-player-${item.objectId}`}
                  ref={iframeRef}
                  className="absolute inset-0 w-full h-full"
                />
              </div>  */}
              <div className="absolute bottom-0 w-full h-full bg-gradient-to-r from-black via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black via-black/10 to-transparent sm: hidden lg:block"></div>
              {/* Slide Content */}
              <div className="absolute flex lg:top-70 sm: top-20 lg:gap-5 sm: gap-2 left-10 lg:flex-row space-x-6">
                <div className="sm: hidden  lg:block absolute -top-45 right-5 text-gray-600 mt-3 z-40 rounded-full backdrop-blur-lg p-2" onClick={toggleMute}>
                  {isMute ? (
                    <VolumeOffIcon size={40} strokeWidth={3} className="cursor-pointer" />
                  ) : (
                    <Volume2 size={40} strokeWidth={3} className="cursor-pointer" />
                  )}
                </div>
                <div className="flex flex-col lg:gap-8 sm: gap-3">
                  <motion.div className="lg:gap-4 sm: gap-2 flex flex-col"  variants={posterVariants}
                  key={`movie-${activeIndex}`} 
                    initial="hidden"
                    animate="visible">
                    <motion.img src={item.titleImage} className="lg:w-80 lg:h-32 sm: w-32 sm: h-10"  />
                    <span className="text-teal-400 font-bold sm: text-xs lg:text-lg">{item.label}</span>
                  </motion.div>
                  {/* <motion.h3
                    key={`title-${activeIndex}`}
                    className="text-white font-extrabold lg:text-6xl sm: text-3xl drop-shadow-lg"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {item.name}
                  </motion.h3> */}
                  <div className="sm: hidden lg:block">
                      <motion.span
                        key={`storyline-${activeIndex}`}
                        className="w-1/2 text-gray-200 font-medium lg:text-xl sm: text-sm line-clamp-2"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                      >
                        {item.storyline}
                      </motion.span>
                  </div>
                  <motion.div className="w-fit flex gap-3" key={`button-${activeIndex}`}
    variants={buttonVariants}
    initial="hidden"
    animate="visible"
    transition={{ delay: 0.3 }}
>
    {/* Watch Now Button */}
    <motion.button
        className="bg-[#E50914] items-center text-sm sm:text-base lg:text-xl cursor-pointer text-white rounded-md px-3 sm:px-4 font-semibold flex gap-2 backdrop-filter backdrop-opacity-10"
    >
        Watch Now <FaPlay className="text-sm sm:text-base lg:text-lg" />
    </motion.button>

    {/* Bookmark Button */}
    <motion.button className="text-gray-950 p-2 sm:p-3 rounded-full bg-white cursor-pointer">
        <FaBookmark className="text-base sm:text-lg lg:text-2xl" />
    </motion.button>
</motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))} 

        <div className="absolute lg:bottom-20 sm: bottom-2 w-full flex justify-center gap-2 z-50">
          {sliderData.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-1 rounded-3xl cursor-pointer ${activeIndex === index ? 'bg-white' : 'bg-white opacity-50'}`}
              onClick={() => handleSlideClick(index - 1)}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </Swiper>
    </div>
  );
}
