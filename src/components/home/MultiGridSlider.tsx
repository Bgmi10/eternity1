import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
//@ts-ignore
import 'swiper/css';
//@ts-ignore
import 'swiper/css/navigation';
//@ts-ignore
import 'swiper/css/effect-fade';
import { multiGridData } from '../../utils/constants';

const MultiItemSlider = ({ title }: { title: string }) => {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);
  };
  
  // Create smaller chunks for mobile view (4 items per slide)
  const createMobileSlides = () => {
    const allItems = multiGridData.flat();
    const mobileSlides = [];
    
    for (let i = 0; i < allItems.length; i += 4) {
      mobileSlides.push(allItems.slice(i, i + 4));
    }
    
    return mobileSlides;
  };
  
  const mobileSlides = createMobileSlides();

  return (
    <motion.div 
      className="bg-gradient-to-br from-gray-400/20 via-black py-16"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-white mb-16 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        > 
          {title}
        </motion.h2>

        {/* Mobile Slider (4 items per slide) */}
        <motion.div 
          className="relative block md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            modules={[Navigation, Autoplay, EffectFade]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            className="w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            {mobileSlides.map((slide, index) => (
              <SwiperSlide key={`mobile-${index}`}>
                <div className="grid grid-cols-2 gap-6 p-1">
                  {slide.map((item, itemIndex) => (
                    <motion.div 
                      key={`mobile-item-${index}-${itemIndex}`} 
                      className="bg-gradient-to-b via-gray-400/20 cursor-pointer rounded-md overflow-hidden hover:shadow-2xl group"
                    >
                      <div className="relative overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-52 h-32"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      </div>
                
                      <div className="p-1 bg-gray-400/0">
                        <motion.h3 
                          className="text-md font-bold text-white truncate"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {item.name}
                        </motion.h3>
                        <motion.p 
                          className="text-xs text-gray-400 line-clamp-2"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {item.descriptions}
                        </motion.p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Desktop Slider (original) */}
        <motion.div 
          className="relative hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            modules={[Navigation, Autoplay, EffectFade]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            className="w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            {multiGridData.map((slide, index) => (
              <SwiperSlide key={`desktop-${index}`}>
                <div className="grid grid-cols-5 gap-6 p-1">
                  {slide.map((item, itemIndex) => (
                    <motion.div 
                      key={`desktop-item-${index}-${itemIndex}`} 
                      className="bg-gradient-to-b via-gray-400/20 cursor-pointer rounded-md overflow-hidden hover:shadow-2xl group"
                    >
                      <div className="relative overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-52 h-32"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      </div>
                
                      <div className="p-1 bg-gray-400/0">
                        <motion.h3 
                          className="text-md font-bold text-white truncate"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {item.name}
                        </motion.h3>
                        <motion.p 
                          className="text-xs text-gray-400 line-clamp-2"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {item.descriptions}
                        </motion.p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Pagination Indicators */}
        <div className="flex justify-center gap-2 lg:mt-6">
          {(window.innerWidth >= 768 ? multiGridData : mobileSlides).map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => swiperRef.current?.slideTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      
        {/* Navigation */}
        <div className='flex justify-center items-center mt-10 space-x-6'>
          <motion.button 
            onClick={() => swiperRef.current?.slidePrev()}
            className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-300"
          >
            <FaChevronLeft className="text-2xl" />
          </motion.button>
          
          <motion.a 
            href="#" 
            className="px-8 py-3 border border-gray-400/40 text-white rounded-lg font-semibold transition-colors"
          >
            View All
          </motion.a>
          
          <motion.button 
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-300"
          >
            <FaChevronRight className="text-2xl" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MultiItemSlider;