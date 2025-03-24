import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
//@ts-ignore
import 'swiper/css';
//@ts-ignore
import 'swiper/css/navigation';
//@ts-ignore
import 'swiper/css/effect-fade';
import { multiGridData } from '../../utils/constants';

const MultiItemSlider = ({ title }: { title: string }) => {
  const swiperRef = useRef<any>(null);
  //@ts-ignore
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const handleSlideChange = (swiper: any) => {
    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);
  };

  return (
    <motion.div 
      className="relative max-w-8xl mx-auto px-10 py-12"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="flex items-center justify-between mb-10">
        <motion.h2 
          className="text-2xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 drop-shadow-lg"
        >
          {title}
        </motion.h2>
      </div>
      <motion.div>
        <Swiper
          modules={[Navigation, Autoplay, EffectFade]}
          spaceBetween={30}
          slidesPerView={1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          effect={'fade'}
          fadeEffect={{ crossFade: true }}
          speed={1000}
          className="w-full rounded-xl overflow-hidden"
        >
          {multiGridData.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {slide.map((item) => (
                  <motion.div 
                    key={item.id} 
                    className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group"
                    whileHover={{ y: -10 }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="lg:w-60 lg:h-32 w-32 h-32  object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      <AnimatePresence>
                        {hoveredItem === item.id && (
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <motion.button 
                              className="bg-teal-500/90 hover:bg-teal-400 text-white rounded-full p-4 shadow-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaPlay size={20} />
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <div className="bottom-0 left-0 right-0 p-4 text-white">
                      <motion.h3 
                        className="text-xl font-bold mb-1"
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {item.name}
                      </motion.h3>
                      <motion.p 
                        className="text-sm text-gray-300"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {item.descriptions}
                      </motion.p>
                      <motion.div 
                        className="flex gap-2 mt-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <span className="bg-teal-500/80 text-xs px-2 py-1 rounded">HD</span>
                        <span className="bg-purple-500/80 text-xs px-2 py-1 rounded">4K</span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    
      <div className='flex justify-center mt-10 gap-5'>
        <motion.button 
          onClick={() => swiperRef.current?.slidePrev()}
          className="z-10 bg-black/80 hover:bg-teal-500 border-gray-400/40  p-3 rounded-full shadow-lg transition-all border"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(20, 184, 166, 0.8)" }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronLeft className="text-white text-xl" />
        </motion.button>
        <motion.a 
          href="#" 
          className="text-teal-400 font-medium flex items-center gap-1 border-gray-400/40  hover:text-white transition-colors border px-10 rounded-2xl"
          whileHover={{ scale: 1.05 }}
        >
          View All
        </motion.a>
        <motion.button 
          onClick={() => swiperRef.current?.slideNext()}
          className="z-10 bg-black/80 hover:bg-teal-500 border border-gray-400/40 p-3 rounded-full shadow-lg transition-all"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(20, 184, 166, 0.8)" }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronRight className="text-white text-xl" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MultiItemSlider;