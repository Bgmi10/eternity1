import { motion } from "framer-motion";
import { Radio, Headphones, Music, Tv } from "lucide-react";
import { fadeIn } from "../../utils/style";

export default function DiscoverContent() {  
 

    return(
        <div>
           {/* Content Categories Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-center mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Discover Content</h2>
                <div className="h-1 w-24 bg-red-500 mx-auto mb-8"></div>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Explore our diverse range of faith-building content across multiple formats
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <motion.div 
                  className="relative overflow-hidden rounded-lg group cursor-pointer"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  whileHover={{ y: -10 }}
                >{
                  
                }
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-black/30 z-10"></div>
                  <img src="https://m.media-amazon.com/images/G/31/AmazonVideo/2019/MLP._SX1440_CR575,0,865,675_QL80_AC_FP_.jpg" alt="Christian TV" className="w-full h-60 object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute bottom-0 left-0 p-6 z-20">
                    <div className="flex items-center gap-3 mb-2">
                      <Tv size={24} className="text-red-500" />
                      <h3 className="text-xl font-bold text-white">Christian TV</h3>
                    </div>
                    <p className="text-gray-300 text-sm">Faith-based shows & series</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="relative overflow-hidden rounded-lg group cursor-pointer"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-black/30 z-10"></div>
                  <img src="https://eternityready.net/assets/images/channels/3.webp" alt="Radio Stations" className="w-full h-60 object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute bottom-0 left-0 p-6 z-20">
                    <div className="flex items-center gap-3 mb-2">
                      <Radio size={24} className="text-red-500" />
                      <h3 className="text-xl font-bold text-white">Radio Stations</h3>
                    </div>
                    <p className="text-gray-300 text-sm">24/7 inspiration & worship</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="relative overflow-hidden rounded-lg group cursor-pointer"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-black/30 z-10"></div>
                  <img src="https://eternityready.net/assets/images/channels/6.webp" alt="Podcasts" className="w-full h-60 object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute bottom-0 left-0 p-6 z-20">
                    <div className="flex items-center gap-3 mb-2">
                      <Headphones size={24} className="text-red-500" />
                      <h3 className="text-xl font-bold text-white">Podcasts</h3>
                    </div>
                    <p className="text-gray-300 text-sm">Discussions & teachings</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="relative overflow-hidden rounded-lg group cursor-pointer"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-black/30 z-10"></div>
                  <img src="https://eternityready.net/assets/images/channels/2.webp" alt="Movies & Music" className="w-full h-60 object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute bottom-0 left-0 p-6 z-20">
                    <div className="flex items-center gap-3 mb-2">
                      <Music size={24} className="text-red-500" />
                      <h3 className="text-xl font-bold text-white">Movies & Music</h3>
                    </div>
                    <p className="text-gray-300 text-sm">Films & music videos</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
    )
}