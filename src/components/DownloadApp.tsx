// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// const movieData = [
//   {
//     id: 1,
//     title: 'John Wick 4',
//     image: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/7I6VUdPj6tQECNHdviJkUHD2u89.jpg',
//     rating: '8.2',
//     year: '2023',
//     duration: '169 min',
//     description: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, he must face off against a new enemy with powerful alliances.'
//   },
//   {
//     id: 2,
//     title: 'Resurrection',
//     image: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/lntyt4OVDbcxA1l7LtwITbrD3FI.jpg',
//     rating: '7.5',
//     year: '2024',
//     duration: '142 min',
//     description: 'A thrilling journey through darkness and light.'
//   },
//   {
//     id: 3,
//     title: 'Dune',
//     image: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg',
//     rating: '8.7',
//     year: '2024',
//     duration: '156 min',
//     description: 'The saga continues in this epic sci-fi adventure.'
//   },
//   {
//     id: 4,
//     title: 'The Jungle Book',
//     image: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/8oYykF1Qhrb8fC2qZqD71EzRywg.jpg',
//     rating: '7.9',
//     year: '2024',
//     duration: '125 min',
//     description: 'A reimagined classic brings new adventure to the jungle.'
//   }
// ];

// const personalMediaData = [
//   {
//     id: 101,
//     title: 'Podcast: Tech Today',
//     image: '/assets/radio/1.webp',
//     type: 'Podcast',
//     added: '2 days ago'
//   },
//   {
//     id: 102,
//     title: 'FM Station: Music Mix',
//     image: '/assets/radio/2.webp',
//     type: 'FM',
//     added: '1 week ago'
//   },
//   {
//     id: 103,
//     title: 'Documentary Series',
//     image: '/assets/radio/3.webp',
//     type: 'Free',
//     added: '3 weeks ago'
//   }
// ];

// export default function StreamingApp() {
//   const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
//   const [trendingMoviesPosition, setTrendingMoviesPosition] = useState(0);
//   const [showPersonalMedia, setShowPersonalMedia] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   // Toggle between trending movies and podcasts/FM content every 8 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setShowPersonalMedia(prev => !prev);
//     }, 8000);
//     return () => clearInterval(interval);
//   }, []);

//   // Rotate featured movie every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentMovieIndex((prev) => (prev + 1) % movieData.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // Scroll trending movies every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTrendingMoviesPosition((prev) => {
//         if (prev <= -400) return 0;
//         return prev - 100;
//       });
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const currentMovie = movieData[currentMovieIndex];

//   return (
//     <div className="py-20 w-full bg-gradient-to-b from-black to-black relative overflow-hidden">
//       {/* Animated background particles for added visual interest */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 bg-red-500 rounded-full opacity-20"
//             initial={{ 
//               x: Math.random() * 100 + "%", 
//               y: Math.random() * 100 + "%",
//               opacity: 0.1 + Math.random() * 0.3
//             }}
//             animate={{ 
//               y: [null, Math.random() * 100 + "%"],
//               opacity: [null, 0]
//             }}
//             transition={{ 
//               duration: 5 + Math.random() * 10,
//               repeat: Infinity,
//               ease: "linear"
//             }}
//           />
//         ))}
//       </div>
      
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Enhanced headline and description with animation */}
//         <motion.div 
//           className="text-center mb-12"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//         >
//           <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
//             <span className="text-red-500">Free entertainment</span> for everyone.
//           </h2>
//           <p className="text-gray-300 max-w-3xl mx-auto text-lg">
//             Enjoy free access to movies, podcasts, and FM radio stations on any device.
//             <span className="text-white font-semibold"> No subscriptions needed.</span> Just download and enjoy.
//           </p>
//         </motion.div>

//         <div className="flex flex-col md:flex-row items-center gap-8">
//           {/* TV Screen Container with more realistic TV styling */}
//           <motion.div 
//             className="relative w-full md:w-2/3"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {/* TV Stand */}
//             <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-32 h-8 bg-gradient-to-b from-gray-700 to-gray-900 rounded-t-sm"></div>
//             <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 w-48 h-4 bg-gray-800 rounded-sm"></div>
            
//             {/* TV Frame */}
//             <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
//               {/* TV Bezel */}
//               <div className="absolute inset-0 rounded-xl border-[16px] border-gray-900 shadow-inner z-20 pointer-events-none">
//                 <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-700 rounded-full flex items-center justify-center">
//                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
//                 </div>
//               </div>
              
//               {/* TV Screen Reflection Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10 pointer-events-none"></div>
              
//               {/* TV Screen Content */}
//               <div className="absolute inset-0 overflow-hidden">
//                 {/* Featured Movie Background */}
//                 <motion.div 
//                   className="absolute inset-0 bg-cover bg-center" 
//                   style={{ backgroundImage: `url(${currentMovie.image})` }}
//                   initial={{ scale: 1.1 }}
//                   animate={{ scale: 1 }}
//                   transition={{ duration: 5 }}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
//                 </motion.div>
                
//                 {/* App UI Elements */}
//                 <div className="absolute inset-0 flex flex-col p-8 text-white">
//                   {/* Header */}
//                   <div className="flex justify-between items-center mb-4">
//                     <img src="https://eternityready.com/templates/apollo/img/logo1USE-THIS.png" className="w-24" alt="StreamVid Logo" />
//                     <div className="flex space-x-4">
//                       <span>MOVIES</span>
//                       <span>PODCASTS</span>
//                       <span>FM RADIO</span>
//                       <motion.span 
//                         className="text-red-500 font-bold"
//                         animate={{ opacity: [1, 0.5, 1] }}
//                         transition={{ duration: 2, repeat: Infinity }}
//                       >
//                         FREE
//                       </motion.span>
//                     </div>
//                   </div>
                  
//                   {/* Movie Info */}
//                   <div className="mt-8 max-w-md">
//                     <h2 className="text-4xl font-bold mb-2">{currentMovie.title}</h2>
//                     <div className="flex items-center space-x-2 mb-4">
//                       <span className="text-yellow-500">★ {currentMovie.rating}</span>
//                       <span>|</span>
//                       <span>{currentMovie.year}</span>
//                       <span>|</span>
//                       <span>{currentMovie.duration}</span>
//                     </div>
//                     <p className="text-gray-300 mb-6 line-clamp-1">{currentMovie.description}</p>
//                     <div className="flex space-x-4">
//                       <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md font-bold">Watch Free</button>
//                       <button className="border border-white px-6 py-2 rounded-md font-bold">Save</button>
//                     </div>
//                   </div>
                  
//                   {/* Content Tabs - Animate between trending and personal */}
//                   <div className="mt-auto">
//                     <div className="flex justify-between items-center mb-3">
//                       <motion.h3 
//                         className="text-xl font-bold"
//                         animate={{ opacity: showPersonalMedia ? 0.5 : 1 }}
//                       >
//                         {showPersonalMedia ? "Free Movies" : "Free Movies"}
//                       </motion.h3>
//                       <motion.h3 
//                         className="text-xl font-bold"
//                         animate={{ opacity: showPersonalMedia ? 1 : 0.5 }}
//                       >
//                         {showPersonalMedia ? "Podcasts & FM" : "Podcasts & FM"}
//                       </motion.h3>
//                     </div>
                    
//                     {/* Conditional content based on tab */}
//                     <div className="relative h-32 overflow-hidden">
//                       {/* Trending Movies */}
//                       <motion.div 
//                         className="absolute inset-0 flex space-x-4"
//                         animate={{ 
//                           x: trendingMoviesPosition,
//                           opacity: showPersonalMedia ? 0 : 1,
//                           y: showPersonalMedia ? 20 : 0 
//                         }}
//                         transition={{ 
//                           x: { ease: "easeInOut", duration: 0.8 },
//                           opacity: { duration: 0.5 },
//                           y: { duration: 0.5 }
//                         }}
//                       >
//                         {movieData.map(movie => (
//                           <div key={movie.id} className="flex-shrink-0 w-40 rounded overflow-hidden shadow-lg">
//                             <img src={movie.image} alt={movie.title} className="w-full h-24 object-cover" />
//                             <div className="p-2 bg-gray-800 text-xs">
//                               {movie.title}
//                             </div>
//                           </div>
//                         ))}
//                         {/* Duplicate the first few movies to create a seamless loop */}
//                         {movieData.slice(0, 3).map(movie => (
//                           <div key={`duplicate-${movie.id}`} className="flex-shrink-0 w-40 rounded overflow-hidden shadow-lg">
//                             <img src={movie.image} alt={movie.title} className="w-full h-24 object-cover" />
//                             <div className="p-2 bg-gray-800 text-xs">
//                               {movie.title}
//                             </div>
//                           </div>
//                         ))}
//                       </motion.div>
                      
//                       {/* Podcasts & FM Radio */}
//                       <motion.div 
//                         className="absolute inset-0 flex space-x-4"
//                         animate={{ 
//                           opacity: showPersonalMedia ? 1 : 0,
//                           y: showPersonalMedia ? 0 : 20 
//                         }}
//                         transition={{ duration: 0.5 }}
//                       >
//                         {personalMediaData.map(media => (
//                           <div key={media.id} className="flex-shrink-0 w-40 rounded overflow-hidden shadow-lg relative">
//                             <img src={media.image} alt={media.title} className="w-full h-24 object-cover" />
//                             <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
//                               {media.type}
//                             </div>
//                             <div className="p-2 bg-gray-800 text-xs">
//                               <div className="font-semibold">{media.title}</div>
//                               <div className="text-gray-400 text-xs">Added {media.added}</div>
//                             </div>
//                           </div>
//                         ))}
//                       </motion.div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
          
//           {/* Mobile Device - ADJUSTED HEIGHT FOR VIEWPORT */}
//           <motion.div 
//             className="relative w-1/3 md:w-1/4 mt-12 md:mt-0"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             {/* Phone Frame - REDUCED HEIGHT */}
//             <div className="relative aspect-[9/16] bg-black rounded-[2rem] overflow-hidden shadow-2xl border-[8px] border-gray-800">
//               {/* Phone Notch */}
//               <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-4 bg-black rounded-b-xl z-20 flex justify-center items-end pb-1">
//                 <div className="w-6 h-1 bg-gray-600 rounded-full"></div>
//               </div>
              
//               {/* Phone Content */}
//               <div className="absolute inset-0 overflow-hidden">
//                 <motion.div 
//                   className="absolute inset-0 bg-cover bg-center" 
//                   style={{ backgroundImage: `url(${currentMovie.image})` }}
//                   initial={{ scale: 1.1 }}
//                   animate={{ scale: 1 }}
//                   transition={{ duration: 5 }}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
//                 </motion.div>
                
//                 <div className="absolute inset-0 flex flex-col p-3 text-white">
//                   <img src="https://eternityready.com/templates/apollo/img/logo1USE-THIS.png" className="w-22 mb-4 mt-2" alt="StreamVid Mobile Logo" />
                  
//                   {/* iOS-like interface - enhanced */}
//                   <div className="bg-black/40 backdrop-blur-lg rounded-xl p-3 border border-white/10">
//                     <div className="flex items-center mb-1">
//                       <motion.div 
//                         className="w-2 h-2 bg-red-500 rounded-full mr-1"
//                         animate={{ opacity: [1, 0.4, 1] }}
//                         transition={{ duration: 1.5, repeat: Infinity }}
//                       ></motion.div>
//                       <span className="text-xs text-red-500 font-semibold">FREE</span>
//                     </div>
                    
//                     <h2 className="text-sm font-bold mb-1">{currentMovie.title}</h2>
//                     <div className="flex items-center space-x-1 mb-2 text-xs">
//                       <span className="text-yellow-500">★ {currentMovie.rating}</span>
//                       <span>|</span>
//                       <span>{currentMovie.year}</span>
//                     </div>
                    
//                     <div className="flex justify-between mb-2">
//                       <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full text-xs font-bold w-16 flex items-center justify-center">
//                         <svg className="w-2 h-2 mr-1" viewBox="0 0 24 24" fill="currentColor">
//                           <path d="M8 5v14l11-7z"></path>
//                         </svg>
//                         Watch
//                       </button>
//                       <button className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full text-xs font-bold w-16 flex items-center justify-center">
//                         <svg className="w-2 h-2 mr-1" viewBox="0 0 24 24" fill="currentColor">
//                           <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
//                         </svg>
//                         Save
//                       </button>
//                     </div>
//                   </div>
                  
//                   {/* Media Categories */}
//                   <div className="mt-2 bg-black/40 backdrop-blur-lg rounded-xl p-3 border border-white/10">
//                     <div className="flex items-center justify-between mb-2">
//                       <h3 className="text-xs font-bold">Popular Content</h3>
//                       <span className="text-xs text-red-500">See All</span>
//                     </div>
                    
//                     <div className="space-y-2">
//                       {personalMediaData.slice(0, 2).map(media => (
//                         <div key={`phone-${media.id}`} className="flex items-center space-x-2">
//                           <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
//                             <img src={media.image} alt={media.title} className="w-full h-full object-cover" />
//                           </div>
//                           <div className="flex-1">
//                             <div className="text-xs font-semibold">{media.title}</div>
//                             <div className="text-gray-400 text-xs">{media.type}</div>
//                           </div>
//                           <button className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
//                             <svg className="w-2 h-2" viewBox="0 0 24 24" fill="currentColor">
//                               <path d="M8 5v14l11-7z"></path>
//                             </svg>
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
                  
//                   {/* Bottom Tab Bar */}
//                   <div className="mt-auto mb-2">
//                     <div className="bg-black/60 backdrop-blur-md rounded-xl p-1 flex justify-around">
//                       <div className="text-center text-red-500">
//                         <svg className="w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="currentColor">
//                           <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
//                         </svg>
//                         <span className="text-xs">Home</span>
//                       </div>
//                       <div className="text-center text-white/60">
//                         <svg className="w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="currentColor">
//                           <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path>
//                           <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path>
//                         </svg>
//                         <span className="text-xs">FM</span>
//                       </div>
//                       <div className="text-center text-white/60">
//                         <svg className="w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="currentColor">
//                           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
//                         </svg>
//                         <span className="text-xs">More</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Download Badge */}
//             <motion.div 
//               className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
//               initial={{ y: 10, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.8, duration: 0.5 }}
//               onHoverStart={() => setIsHovered(true)}
//               onHoverEnd={() => setIsHovered(false)}
//             >
//               <motion.button 
//                 className="bg-red-600 text-white font-bold py-2 px-6 rounded-full shadow-xl flex items-center relative overflow-hidden"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {/* Background pulse animation on hover */}
//                 {isHovered && (
//                   <motion.div 
//                     className="absolute inset-0 bg-red-500"
//                     initial={{ scale: 0, opacity: 0.7 }}
//                     animate={{ scale: 2, opacity: 0 }}
//                     transition={{ duration: 1, repeat: Infinity }}
//                   />
//                 )}
                
//                 <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
//                 </svg>
//                 <span className="relative z-10 text-sm">GET APP</span>
//               </motion.button>
//             </motion.div>
//           </motion.div>
//         </div>
        
//         {/* Features list */}
//         <motion.div 
//           className="flex flex-wrap justify-center mt-16 gap-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.7 }}
//         >
//           {[
//             { icon: "🎬", title: "Free Movies", text: "New titles added weekly" },
//             { icon: "🎙️", title: "Podcasts", text: "Thousands of free episodes" },
//             { icon: "📻", title: "FM Radio", text: "Stream local & global stations" },
//             { icon: "⚡", title: "No Ads", text: "Enjoy uninterrupted streaming" }
//           ].map((feature, i) => (
//             <div key={i} className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-gray-800 w-64 text-center">
//               <div className="text-3xl mb-2">{feature.icon}</div>
//               <h3 className="text-white font-bold mb-1">{feature.title}</h3>
//               <p className="text-gray-400 text-sm">{feature.text}</p>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// }

export default function DownloadApp() {
  return (
    <div className="py-8 mt-10 mb-52 bg-gradient-to-t from-gray-400/20 via-black to-black text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left side - Image */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <img 
            src="/assets/downloadapp.webp" 
            alt="GoodVue on multiple devices" 
            className="w-full max-w-xl"
          />
        </div>
        
        {/* Right side - Content */}
        <div className="lg:w-1/2 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Available for you to enjoy on <span className="text-red-600">any device.</span>
            </h2>
            
            <p className="text-lg text-gray-300">
              The Eternity Ready is accessible on your favorite device, anywhere, anytime!
              Stream your favorite content seamlessly across all platforms.
            </p>
          </div>
          
          {/* Device icons */}
          <div className="flex flex-wrap justify-start gap-6">
          <div className="flex flex-col items-center ">
             <img src="https://img.icons8.com/?size=48&id=txrCBRXRoE2b&format=png" />
              <span className="text-sm">Roku tv</span>
            </div>
            <div className="flex flex-col items-center">
             <img src="https://img.icons8.com/?size=48&id=nKPTBtE1Kt27&format=png" />
              <span className="text-sm">Smart Tv</span>
            </div>
            
            <div className="flex flex-col items-center">
              <img src="https://img.icons8.com/?size=48&id=IV1Fcbm30EBb&format=png" />
              <span className="text-sm">Fire Tv</span>
            </div>
          </div>
          
          {/* Download buttons */}
          <div className="space-y-2">
            <p className="font-medium text-gray-300">
              Download now on your preferred platform
            </p>
            <div className="flex flex-wrap">
              <a href="#android" className="flex items-center py-3 rounded-lg transition-colors">
                <img src="https://eternityready.net/assets/images/app.webp" className="w-32" />
              </a>
              <a href="#ios" className="flex items-center py-3 px-3 rounded-lg transition-colors">
                <img src="https://eternityready.net/assets/images/google.webp" className="w-32" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}