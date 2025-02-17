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
          <h1 className="text-lg md:text-4xl font-bold text-gray-300 mb-6">
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
