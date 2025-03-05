  import { motion } from "framer-motion";
  import { 
    ChevronRight, ChevronLeft, Play, Info, Heart, Star, 
    MonitorSmartphone, Radio, Headphones, Music, 
  Tv
  } from "lucide-react";

  export default function Home() {
    // Animation variants
    const fadeIn = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    };

    return (
      <div className="relative min-h-screen bg-gradient-to-b from-black to-gray-800 overflow-hidden mt-20">
        {/* Floating red particles background effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-red-500 rounded-full opacity-70"
              style={{ width: `${Math.random() * 8 + 4}px`, height: `${Math.random() * 8 + 4}px` }}
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`, 
                opacity: Math.random() * 0.5 + 0.3
              }}
              animate={{ 
                y: ["0%", "100%"],
                opacity: [0.7, 0.2, 0.7] 
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <main>
          <section className="relative pt-12 pb-24">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="absolute">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0"></div>
               <video src="https://images-tv.adobe.com/mpcv3/1041/28228a8c-adc2-47a8-89ab-bc4323132f0d_1738103371.1280x720at2000_h264.mp4#_autoplay" autoPlay title="YouTube video player" loop></video>
               
              </div>
              <div className="flex flex-col lg:flex-row items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="lg:w-1/2 text-center lg:text-left z-10 mb-12 lg:mb-0"
                >
                  <span className="inline-block bg-red-600 text-white px-4 py-1 text-sm font-bold rounded-full mb-4">100% FREE</span>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-4">
                      <span className="block">Welcome to</span>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600 drop-shadow-[0_5px_15px_rgba(239,68,68,0.4)]">
                        Eternity Ready
                      </span>
                    </h1>
                    <motion.div 
                      className="h-1 bg-gradient-to-r from-red-600 to-transparent w-32 mt-2 mb-6 mx-auto lg:mx-0"
                      initial={{ width: 0 }}
                      animate={{ width: "8rem" }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
                  >
                    Grow in your faith through inspiring family-friendly content that encourages hope and helps you on your spiritual journey.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(239,68,68,0.6)" }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-md text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                    >
                      <Play size={20} />
                      Start Watching
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-transparent border-2 border-gray-500 hover:border-white rounded-md text-white font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Info size={20} />
                      Learn More
                    </motion.button>
                  </motion.div>
                  
                  <div className="text-gray-400 text-sm">
                    <p>Available on:</p>
                    <div className="flex flex-wrap gap-3 mt-2 justify-center lg:justify-start">
                      <span className="bg-gray-800 px-3 py-1 rounded-full">Roku</span>
                      <span className="bg-gray-800 px-3 py-1 rounded-full">Android TV</span>
                      <span className="bg-gray-800 px-3 py-1 rounded-full">Mobile</span>
                      <span className="bg-gray-800 px-3 py-1 rounded-full">Alexa</span>
                    </div>
                  </div>
                </motion.div>

                {/* Right showcase section */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="lg:w-1/2 relative"
                >
                  <div className="relative group perspective">
                    {/* Main featured movie poster */}
                    <motion.div
                      initial={{ rotateY: 10 }}
                      whileHover={{ rotateY: 0 }}
                      className="relative rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 z-20"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                      <img
                        src="https://m.media-amazon.com/images/G/31/AmazonVideo/2019/MLP._SX1440_CR575,0,865,675_QL80_AC_FP_.jpg"
                        alt="Featured Content"
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute bottom-0 left-0 p-6 z-20">
                        <div className="text-red-500 font-bold mb-1">FEATURED</div>
                        <h3 className="text-white text-2xl font-bold">Faith Journey</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="bg-red-600 text-white px-2 py-1 text-xs rounded">NEW</span>
                          <span className="text-gray-300 text-sm">Family • Faith</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="bg-red-600/80 hover:bg-red-600 rounded-full p-4 transition transform hover:scale-110">
                          <Play size={24} fill="white" />
                        </button>
                      </div>
                    </motion.div>

                    {/* Secondary posters */}
                    <motion.div
                      initial={{ x: -20, opacity: 0.5 }}
                      whileHover={{ x: -40, opacity: 1 }}
                      className="absolute top-12 -left-16 w-48 rounded-lg overflow-hidden shadow-xl transform rotate-[-8deg] hidden md:block opacity-80 hover:opacity-100 transition-all duration-300"
                    >
                      <img
                        src="https://m.media-amazon.com/images/G/31/AmazonVideo/2019/MLP._SX1440_CR575,0,865,675_QL80_AC_FP_.jpg"
                        alt="Content Preview"
                        className="w-full h-auto"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ x: -20, opacity: 0.5 }}
                      whileHover={{ x: -40, opacity: 1 }}
                      className="absolute top-12 -right-20 w-48 rounded-lg overflow-hidden shadow-xl transform rotate-[-8deg] hidden md:block opacity-80 hover:opacity-100 transition-all duration-300"
                    >
                      <img
                        src="https://m.media-amazon.com/images/G/31/AmazonVideo/2019/MLP._SX1440_CR575,0,865,675_QL80_AC_FP_.jpg"
                        alt="Content Preview"
                        className="w-full h-auto"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ x: 20, opacity: 0.5 }}
                      whileHover={{ x: 40, opacity: 1 }}
                      className="absolute top-24 -right-16 w-48 rounded-lg overflow-hidden shadow-xl transform rotate-[8deg] hidden md:block opacity-80 hover:opacity-100 transition-all duration-300"
                    >
                      <img
                        src="/api/placeholder/240/360"
                        alt="Content Preview"
                        className="w-full h-auto"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Who We Are Section */}
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Who We Are</h2>
                <div className="h-1 w-24 bg-red-500 mx-auto mb-8"></div>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Eternity Ready exists to help people become spiritually prepared through family-friendly content 
                  that encourages, disciples, and helps everyone grow in their faith.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div 
                  className="bg-gradient-to-b from-black to-gray-950 rounded-lg p-8 text-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart size={32} className="text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Family Friendly</h3>
                  <p className="text-gray-300">
                    Content that's safe and appropriate for the whole family, with values you can trust.
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-b from-black to-gray-950 rounded-lg p-8 text-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star size={32} className="text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">100% Free</h3>
                  <p className="text-gray-300">
                    All of our content is completely free - no subscriptions, no hidden fees, ever.
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-b from-black to-gray-950 rounded-lg p-8 text-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MonitorSmartphone size={32} className="text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Multi-Platform</h3>
                  <p className="text-gray-300">
                    Available on Roku, Alexa, Android TV, and mobile devices to watch wherever you are.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Trending Section */}
          <section className="py-16 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <div className="flex items-center mb-8 gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Trending This Week</h2>
                  <div className="h-px bg-gradient-to-r from-red-500 to-transparent flex-grow ml-4"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {[1, 2, 3, 4].map((item) => (
                    <motion.div
                      key={item}
                      whileHover={{ y: -10, scale: 1.03 }}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeIn}
                      transition={{ duration: 0.5, delay: item * 0.1 }}
                      className="rounded-lg overflow-hidden shadow-lg relative cursor-pointer group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
                      <img
                        src={`https://m.media-amazon.com/images/G/31/AmazonVideo/2019/MLP._SX1440_CR575,0,865,675_QL80_AC_FP_.jpg${380 + item * 5}`}
                        alt={`Trending Content ${item}`}
                        className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 p-4 text-white z-20">
                        <h3 className="font-bold text-sm md:text-base">Spiritual Growth Series</h3>
                        <div className="flex items-center gap-1 text-xs mt-1">
                          <span className="text-yellow-400">★★★★☆</span>
                          <span className="text-gray-300">4.2</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <button className="bg-red-600/80 hover:bg-red-600 rounded-full p-3 transition">
                          <Play size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

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

          {/* Featured Content Slider */}
          <section className="py-16 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Featured Content</h2>
                <div className="flex gap-2">
                  <button className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(item => (
                  <motion.div
                    key={`featured-${item}`}
                    className="bg-gradient-to-b from-black to-gray-950 rounded-lg overflow-hidden shadow-lg"
                    whileHover={{ y: -8 }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative">
                      <img 
                        src={`https://eternityready.net/assets/images/channels/6.webp`} 
                        alt={`Featured Content ${item}`} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">FEATURED</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-xl mb-2 text-white">Featured Title {item}</h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        Inspiring content that strengthens your walk with God and builds your faith through engaging storytelling.
                      </p>
                      <button className="text-red-500 font-medium flex items-center gap-1 hover:underline">
                        Watch Now <ChevronRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* New Releases Section */}
          <section className="py-16 bg-gradient-to-b from-black to-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white">New Releases</h2>
                <a href="#" className="text-red-500 font-medium flex items-center gap-1 hover:underline">
                  View All <ChevronRight size={16} />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map(item => (
                  <motion.div
                    key={`new-${item}`}
                    className="group cursor-pointer"
                    whileHover={{ y: -5, scale: 1.03 }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    transition={{ duration: 0.5, delay: item * 0.1 }}
                  >
                    <div className="relative rounded-lg overflow-hidden mb-2">
                      <img 
                        src={`https://occ-0-2484-3662.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABZ_2Oe56td6wW0vne1Bl2ga1DPRBDq4vv7Pv1agFoze8pgvObkK2ne6k7Mp5d6OdEHzAxzCqIHmwYE8ahZh1bOS4G9fg70WouSk.jpg?r=d42`} 
                        alt={`New Release ${item}`} 
                        className="w-full aspect-[2/3] object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">NEW</span>
                      </div>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button className="bg-red-600 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform">
                          <Play size={20} />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-medium text-sm line-clamp-1 text-white">New Release Title {item}</h3>
                    <p className="text-gray-400 text-xs">Episode {item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Popular Content Section */}
          <section className="py-16 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Popular Content</h2>
                <a href="#" className="text-red-500 font-medium flex items-center gap-1 hover:underline">
                  View All <ChevronRight size={16} />
                </a>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map(item => (
                  <motion.div
                    key={`popular-${item}`}
                    className="flex bg-gradient-to-r from-black to-gray-950 rounded-lg overflow-hidden shadow-lg h-48"
                    whileHover={{ scale: 1.02 }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-2/5">
                      <img 
                        src={`https://occ-0-2484-3662.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABUwmI40Z_JO28Rs9x7kntlYu8yOb7JWRpD6YFmPZlghd8sEOPwRlnoZVyCZVuOZdz7ki8MXhdjwx9vR513yLYX8zdOjkCwXy43-X3H7yxiFwdlr-8Oh-UvNfgxJxsT9blqqA.jpg?r=c75`} 
                        alt={`Popular Content ${item}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-3/5 p-4 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">TOP RATED</span>
                        <div className="flex items-center text-yellow-500 text-sm">
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                        </div>
                      </div>
                      <h3 className="font-bold text-xl mb-2 text-white">Popular Title {item}</h3>
                      <p className="text-gray-300 text-sm mb-4 flex-grow line-clamp-2">
                        Our most-watched content that has inspired thousands in their spiritual journey.
                      </p>
                      <button className="bg-red-600 text-white py-2 px-4 rounded-md font-medium text-sm hover:bg-red-700 transition flex items-center justify-center gap-2">
                        <Play size={16} />
                        Watch Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                {[1, 2, 3, 4].map(item => (
                  <motion.div
                    key={`popular-small-${item}`}
                    className="group cursor-pointer"
                    whileHover={{ y: -5 }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    transition={{ duration: 0.5, delay: item * 0.1 }}
                  >
                    <div className="relative rounded-lg overflow-hidden mb-2">
                      <img 
                        src={`https://occ-0-2484-3662.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABamcESGNpOWZAADhfYxdfsT6sudg6yLftXVEhU7PX1dzW0613NjT0d815fB3zYzYR1a0zU8Wr9YqnJ2uSPb0h4urG-0gcfOr06VmRG6SXbjugAQHPlQ-u0j0HPODZy3eoTvY.jpg?r=012`} 
                        alt={`Popular Content ${item}`} 
                        className="w-full "
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                        <div className="flex items-center text-yellow-500 text-xs">
                          <Star size={12} fill="currentColor" />
                          <Star size={12} fill="currentColor" />
                          <Star size={12} fill="currentColor" />
                          <Star size={12} fill="currentColor" />
                          <Star size={12} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <h3 className="font-medium text-sm line-clamp-1 text-white">Popular Title {item + 2}</h3>
                    <p className="text-gray-400 text-xs">Family • Faith</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-center mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How Eternity Ready Impacts Lives</h2>
                <div className="h-1 w-24 bg-red-500 mx-auto mb-8"></div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map(item => (
                  <motion.div 
                    key={`testimonial-${item}`}
                    className="bg-gradient-to-b from-black to-gray-950 rounded-lg p-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    transition={{ duration: 0.8, delay: item * 0.2 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{item}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white">User Name {item}</h4>
                        <p className="text-gray-400 text-sm">Family of {item + 1}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 italic">
                      "Eternity Ready has been a blessing to our family. The content has helped us 
                      grow closer to God and to each other through shared viewing experiences."
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* <Favirote /> */}
          </section>
      
          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-red-900 to-red-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Start Your Journey?</h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Join thousands of families experiencing faith-building content completely free.
                </p>
                <button className="bg-white text-red-700 px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-100 transition">
                  Start Watching Now
                </button>
                <p className="mt-4 text-white/80">No signup required. 100% free. Always.</p>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
      </div>
    );
  }