import { motion } from "framer-motion";
import { Play, Star, ChevronRight } from "lucide-react";
import { fadeIn } from "../../utils/style";

export default function PopularContent({ title }: { title: string }) {
    return(
        <div className="mb-10">
          <section className="py-6 bg-black">
            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-9">
              <div className="flex items-center justify-between mb-10">
              <h2 className="text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 drop-shadow-lg">
              {title}
              </h2>
                <a href="#" className="text-teal-500 font-medium flex items-center gap-1">
                  View All <ChevronRight size={16} />
                </a>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map(item => (
                  <motion.div
                    key={`popular-${item}`}
                    className="flex bg-gradient-to-r from-black to-gray-400/20 rounded-lg overflow-hidden shadow-lg h-48"
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
                          
                          {[1,2,3,4,5].map((_) => (
                            <Star size={12} fill="currentColor" />
                          ))}
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
        </div>
    )
}