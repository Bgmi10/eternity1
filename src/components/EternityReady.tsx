import { FaInfo } from "react-icons/fa";

export default function EternityReady() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-black via-[#141414] to-[#220000] text-white px-6">
      {/* Title Section */}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide uppercase mb-4 mt-72">
        Are You Eternity Ready?
      </h1>
      <p className="text-lg md:text-xl font-medium text-gray-300 mb-6">
        If not, discover how!
      </p>

      {/* Button */}
      <button className="relative flex items-center gap-3 bg-[#E50914] px-8 py-3 text-lg font-bold uppercase rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-[0_0_25px_rgba(229,9,20,0.7)]">
        <FaInfo className="text-white text-2xl" />
        Learn More
      </button>
    </div>
  );
}
