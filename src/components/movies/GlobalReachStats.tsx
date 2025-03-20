import { motion } from "framer-motion";

export default function GlobalReachStats() {
  return (
    <div className="py-24 bg-gradient-to-b ">
      <div className="container mx-auto px-4">
        
        {/* Section header with refined typography */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Global <span className="text-red-600">Impact</span>
          </h2>
          <div className="w-24 h-1.5 bg-red-600 mx-auto mb-8"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Delivering premium entertainment to millions of viewers across the globe, powered by innovation and excellence.
          </p>
        </div>
        
        {/* Stats row with refined cards and hover animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Countries stat */}
          <div className="rounded-xl p-8 shadow-2xl border-l-1 border-gray-400/50 transform transition-all bg-gradient-to-r from-gray-400/20 via-black">
          <motion.div
          className="flex items-center justify-center mb-6 mx-auto"
        >
          <img 
            src="/assets/globe.png" 
            className="w-16 h-16 filter drop-shadow-[0_0_12px_rgba(96,165,250,0.6)]" // Glow effect
            style={{ background: 'transparent', border: 'none' }}
          />
         </motion.div>
            <h3 className="text-5xl font-bold text-white mb-4 text-center">175+</h3>
            <p className="text-gray-300 font-semibold text-center">Countries</p>
            <p className="text-sm text-gray-400 mt-2 text-center">Global availability across continents</p>
          </div>
          
          {/* Households stat */}
          <div className="rounded-xl p-8  shadow-2xl border-l-1 border-gray-400/50 transform transition-all bg-gradient-to-r from-gray-400/20 via-black">
          <motion.div
          className="flex items-center justify-center mb-6 mx-auto"
        >
          <img 
            src="https://img.icons8.com/?size=80&id=FnNWhMlkjUOa&format=png" 
            className="w-16 h-16 filter drop-shadow-[0_0_12px_rgba(96,165,250,0.6)]" 
            // Glow effect
            style={{ background: 'transparent', border: 'none' }}
          />
         </motion.div>
            <h3 className="text-5xl font-bold text-white mb-4 text-center">83M+</h3>
            <p className="text-gray-300 font-semibold text-center">Households</p>
            <p className="text-sm text-gray-400 mt-2 text-center">Trusted by families worldwide</p>
          </div>
          
          {/* Content stat */}
          <div className="rounded-xl p-8 border-l-1 border-gray-400/50 shadow-2xl transform transition-all bg-gradient-to-r from-gray-400/20 via-black">
          <motion.div
          className="flex items-center justify-center mb-6 mx-auto"
        >
          <img 
            src="https://img.icons8.com/?size=80&id=tM2vH3oofz73&format=png" 
            className="w-16 h-16 filter drop-shadow-[0_0_12px_rgba(96,165,250,0.6)]" // Glow effect
            style={{ background: 'transparent', border: 'none' }}
          />
         </motion.div>
            <h3 className="text-5xl font-bold text-white mb-4 text-center">2.3K+</h3>
            <p className="text-gray-300 font-semibold text-center">TV Shows & Movies</p>
            <p className="text-sm text-gray-400 mt-2 text-center">Extensive library of premium content</p>
          </div>
        </div>
        
        {/* Optional achievement banner with gradient animation */}
        <div className="mt-16 bg-gradient-to-r from-gray-400/20 via-black to-gray-400/20 p-6 rounded-lg max-w-4xl mx-auto text-center">
          <p className="text-white text-lg"> Join us on this inspiring journey where faith meets the future of streaming.</p>
        </div>
      </div>
    </div>
  );
}