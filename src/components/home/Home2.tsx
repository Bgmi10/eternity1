import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Play, Info, Heart, Star, MonitorSmartphone } from "lucide-react";
import DiscoverContent from "../movies/DiscoverContent";
import PopularContent from "../movies/PopularContent";

export default function HomePage() {
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white overflow-x-hidden">
   
      <main>
        {/* Hero Section */}
        <section className="relative">
          {/* Hero Background with Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
          
          {/* Hero Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.8 }}
                >
                  <span className="inline-block bg-red-600 text-white px-4 py-1 text-sm font-bold rounded-full mb-4">100% FREE</span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    Grow In Faith Through <span className="text-red-500">Inspiring Content</span>
                  </h1>
                  <p className="text-lg text-gray-300 mb-8 max-w-xl">
                    Eternity Ready offers family-friendly content to encourage hope and help you grow in your faith journey.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
                    <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md font-bold flex items-center justify-center gap-2 transition">
                      <Play size={20} />
                      Start Watching
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-md font-bold flex items-center justify-center gap-2 transition">
                      <Info size={20} />
                      Learn More
                    </button>
                  </div>
                  
                  <div className="text-gray-400 text-sm">
                    <p>Available on:</p>
                    <div className="flex flex-wrap gap-3 mt-2 justify-center md:justify-start">
                      <span className="bg-gray-800 px-3 py-1 rounded-full">Roku</span>
                      <span className="bg-gray-800 px-3 py-1 rounded-full">Android TV</span>
                      <span className="bg-gray-800 px-3 py-1 rounded-full">Mobile</span>
                      <span className="bg-gray-800 px-3 py-1 rounded-full">Alexa</span>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative">
                  <img 
                    src="https://m.media-amazon.com/images/G/31/AmazonVideo/2019/MLP._SX1440_CR575,0,865,675_QL80_AC_FP_.jpg" 
                    alt="Featured Content" 
                    className="rounded-lg shadow-2xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-red-600/80 hover:bg-red-600 rounded-full p-4 transition transform hover:scale-110">
                      <Play size={24} fill="white" />
                    </button>
                  </div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Are</h2>
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
                <h3 className="text-xl font-bold mb-2">Family Friendly</h3>
                <p className="text-gray-300">
                  Content that's safe and appropriate for the whole family, with values you can trust.
                </p>
              </motion.div>

              <motion.div 
                className="bg-gray-800 rounded-lg p-8 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star size={32} className="text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">100% Free</h3>
                <p className="text-gray-300">
                  All of our content is completely free - no subscriptions, no hidden fees, ever.
                </p>
              </motion.div>

              <motion.div 
                className="bg-gray-800 rounded-lg p-8 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MonitorSmartphone size={32} className="text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Multi-Platform</h3>
                <p className="text-gray-300">
                  Available on Roku, Alexa, Android TV, and mobile devices to watch wherever you are.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <DiscoverContent />

        {/* Featured Content Slider */}
        <section id="featured" className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Featured Content</h2>
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
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                  whileHover={{ y: -8 }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    <img 
                      src={`/api/placeholder/500/${280 + item * 10}`} 
                      alt={`Featured Content ${item}`} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">FEATURED</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-2">Featured Title {item}</h3>
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
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">New Releases</h2>
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
                      src={`/api/placeholder/300/${400 + item * 10}`} 
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
                  <h3 className="font-medium text-sm line-clamp-1">New Release Title {item}</h3>
                  <p className="text-gray-400 text-xs">Episode {item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
      <PopularContent title="Popular Content" />

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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Eternity Ready Impacts Lives</h2>
              <div className="h-1 w-24 bg-red-500 mx-auto mb-8"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(item => (
                <motion.div 
                  key={`testimonial-${item}`}
                  className="bg-gray-800 rounded-lg p-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.8, delay: item * 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold">{item}</span>
                    </div>
                    <div>
                      <h4 className="font-bold">User Name {item}</h4>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
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
  );
}