import { motion } from "framer-motion"
import { FaInfo } from "react-icons/fa"

export default function EternityReady() {

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center bg-black text-white overflow-hidden">
      <div className="relative z-10 mx-auto px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          ARE YOU ETERNITY READY?
        </motion.h1>

        <motion.div
          className="text-2xl md:text-4xl text-gray-200 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          If not, discover how!
        </motion.div>
        <div className="justify-center flex">
        <button className="relative flex items-center gap-2 bg-[#E50914] cursor-pointer p-2 rounded-xl text-white font-bold px-12 text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(229,9,20,0.7)]">
           <FaInfo className="text-white text-xl" />
           Learn More
         </button>
       </div>
      </div>

      {/* Backdrop gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-80" />

      {/* Animated backdrop image */}
      <motion.img
        src="http://moviespot.fun/static/media/poster.67e95f05e76a8cebf7e2.jpeg"
        alt="Cinematic backdrop"
        className="absolute inset-0 w-full h-1/2 object-cover object-center top-[160px]"
        
      />
    </div>
  )
}

