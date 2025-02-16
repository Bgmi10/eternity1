import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules";
//@ts-ignore
import "swiper/css";
//@ts-ignore
import "swiper/css/navigation";
//@ts-ignore
import "swiper/css/effect-coverflow";
import { motion } from "framer-motion";
import { sliderData } from "../../utils/constants";
import { Play } from "lucide-react";
import { useState } from "react";

export default function Slider() {
    const [activeIndex, setActiveIndex] = useState(0);

    const textVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const posterVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8,
            x: -100
        },
        visible: { 
            opacity: 1, 
            scale: 1,
            x: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        }
    };

    const languageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (index: any) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: 0.1 * index,
                ease: "easeOut"
            }
        })
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                duration: 0.5,
                delay: 0.6,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="w-full h-full z-10 mt-[-10px] relative">
            <Swiper
                modules={[Autoplay, Navigation, EffectCoverflow]}
                effect="coverflow"
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                centeredSlides={true}
                coverflowEffect={{
                    rotate: 10,
                    stretch: 0,
                    depth: 150,
                    modifier: 1,
                    slideShadows: true,
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="w-full"
            >
                {sliderData.map((item) => (
                    <SwiperSlide key={item.objectId} className="relative">
                        <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg shadow-lg">
                            <motion.img
                                key={`backdrop-${activeIndex}`}
                                src={item.backdropURL}
                                initial={{ scale: 1.2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="w-full h-full object-cover brightness-50"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-100"></div>
                            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

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
                                            Watch Now <Play fill="white"/>  
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style>{`
                .bg-radial-gradient {
                    background: radial-gradient(
                        circle at center,
                        transparent 0%,
                        rgba(0, 0, 0, 0.8) 70%
                    );
                }
            `}</style>
        </div>
    );
}