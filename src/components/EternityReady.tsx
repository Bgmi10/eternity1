import { FaInfo } from "react-icons/fa";
import { motion } from "framer-motion";

export default function EternityReady() {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-black text-white px-6 overflow-hidden">
      {/* Title Section */}
      <div className="h-[40rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md relative">
        {/* Title */}
        <motion.h1
          className="md:text-7xl text-3xl lg:text-7xl font-bold text-white mb-6 relative z-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          ARE YOU ETERNITY READY?
        </motion.h1>

        {/* Decorative Line */}
        <div className="w-[40rem]  relative mb-5">
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-white to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-px w-1/4" />
          <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>

        {/* Subtitle */}
        <motion.h1
          className="text-lg md:text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          If not, discover how!
        </motion.h1>

        {/* Learn More Button */}
        <div className="flex justify-center">
          <button className="relative flex items-center gap-3 bg-[#E50914] px-8 py-3 text-lg font-bold uppercase rounded-lg transition-all duration-300 cursor-pointer hover:shadow-[0_0_25px_rgba(229,9,20,0.7)]">
            <FaInfo className="text-white text-2xl" />
            Learn More
          </button>
        </div>
      </div>
      
    </div>
  );
}
