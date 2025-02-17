import { FaInfo } from "react-icons/fa";

export default function EternityReady() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-black via-[#141414] to-[#black] text-white px-6">
      {/* Title Section */}
      <div className="h-[40rem] w-ful flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-3xl lg:text-7xl font-bold text-center text-white relative z-20">
        ARE YOU ETERNITY READY ?
      </h1>
      <div className="w-[40rem] h-40 relative">
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-white to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-px w-1/4" />
        <div className="absolute inset-0 w-full h-full  [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        <div className="mt-5">
          <h1 className="text-lg md:text-4xl font-bold text-white mb-6">
             If not, discover how!
          </h1> 
        </div>
        <div className="justify-center flex">
           <button className="relative flex items-center gap-3 bg-[#E50914] px-8 py-3 text-lg font-bold uppercase rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-[0_0_25px_rgba(229,9,20,0.7)]">
             <FaInfo className="text-white text-2xl" />
              Learn More
           </button>
        </div>
      </div>
    </div>
    </div>
  );
}



// import { motion } from "framer-motion"
// import { FaInfo } from "react-icons/fa"

// export default function EternityReady() {

//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center text-center bg-black text-white overflow-hidden">
//       <div className="relative z-10 mx-auto px-4">
//         <motion.h1
//           className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-white"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           ARE YOU ETERNITY READY?
//         </motion.h1>

//         <motion.div
//           className="text-2xl md:text-4xl text-gray-200 mb-8"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
//         >
//           If not, discover how!
//         </motion.div>
//         <div className="justify-center flex">
//         <button className="relative flex items-center gap-2 bg-[#E50914] cursor-pointer p-2 rounded-xl text-white font-bold px-12 text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(229,9,20,0.7)]">
//            <FaInfo className="text-white text-xl" />
//            Learn More
//          </button>
//        </div>
//       </div>

//       {/* Backdrop gradient */}
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-80" />

//       {/* Animated backdrop image */}
//       <motion.img
//         src="http://moviespot.fun/static/media/poster.67e95f05e76a8cebf7e2.jpeg"
//         alt="Cinematic backdrop"
//         className="absolute inset-0 w-full h-1/2 object-cover object-center top-[160px]"
        
//       />
//     </div>
//   )
// }

