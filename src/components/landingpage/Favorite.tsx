import { motion } from "framer-motion";
import MoviePreview3D from "./MoviePreview3D";

export default function Favorite() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-5 py-16 max-w-7xl mx-2 mb-80 bg-black">
      {/* Left Side: Text Content */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mb-12 md:mb-0">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-[#E50914] text-5xl lg:text-7xl font-extrabold tracking-tight">
            EternityReady
          </h1>
          
          {/* Decorative Line */}
          <div className="w-full max-w-md relative my-4">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-px" />
          </div>
        </motion.div>
        
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <h2 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl mb-2">
            Forever Free.
          </h2>
          <h2 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl">
            For Everyone.
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <p className="text-gray-300 font-medium text-lg md:text-xl max-w-xl leading-relaxed">
            Experience entertainment without barriers. <span className="text-[#E50914] font-semibold">No subscriptions. No restrictions.</span> Just unlimited access to all the content you love, anytime and anywhere.
          </p>
          
          <motion.button
            className="mt-8 bg-[#E50914] hover:bg-[#F40D17] text-white font-semibold py-3 px-8 rounded-md text-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
      
      {/* Right Side: Marquee/3D Preview */}
      <div className="w-full md:w-1/2 h-[450px] flex items-center justify-center rounded-lg overflow-hidden shadow-2xl">
        <MoviePreview3D />
      </div>
    </div>
  );
}