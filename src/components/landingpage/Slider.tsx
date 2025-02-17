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
import { Play, Volume2, VolumeOffIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

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
            <div className="relative w-full h-[800px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg shadow-lg">
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

                 <div className="absolute inset-0 w-full h-full mt-[-80px] sm: hidden lg:block">
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
              <div className="absolute flex top-30 gap-5 left-10 lg:flex-row sm: flex-col space-x-6">
                <motion.img
                  key={`poster-${activeIndex}`}
                  src={item.posterURL}
                  alt={item.name}
                  className="lg:w-80 sm: w-32 rounded-3xl shadow-2xl object-cover"
                  variants={posterVariants}
                  initial="hidden"
                  animate="visible"
                />
                <div className="sm: hidden  lg:block absolute right-10 text-white mt-3 z-40" onClick={toggleMute}>
                  {isMute ? (
                    <VolumeOffIcon size={40} strokeWidth={3} className="cursor-pointer" />
                  ) : (
                    <Volume2 size={40} strokeWidth={3} className="cursor-pointer" />
                  )}
                </div>
                <div className="flex flex-col gap-8">
                  <motion.h3
                    key={`title-${activeIndex}`}
                    className="text-white font-extrabold lg:text-6xl sm: text-3xl drop-shadow-lg"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {item.name}
                  </motion.h3>
                  <motion.span
                    key={`storyline-${activeIndex}`}
                    className="line-clamp-3 text-gray-200 font-stretch-50% lg:text-xl sm: text-sm"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                  >
                    {item.storyline}
                  </motion.span>
                  <div className="flex gap-2 flex-wrap">
                    {item.languages.map((language, langIndex) => (
                      <motion.span
                        key={`${language}-${activeIndex}`}
                        className="lg:text-xl text-md text-white rounded-xl lg:px-10 p-2 sm: px-6 font-bold backdrop-blur-2xl bg-gradient-to-b from-gray-800"
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
                      className="bg-[#E50914] lg:text-xl sm: text-md cursor-pointer p-3 text-white rounded-xl lg:px-6 font-bold flex gap-2"
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

        <div className="absolute bottom-20 w-full flex justify-center gap-2 z-50">
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
