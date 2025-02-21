import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function MobileDrawer({ isMenuOpen, drawerRef, handleMenuClick }: { isMenuOpen: boolean, drawerRef: any, handleMenuClick: () => void}) {
    return(
        <div>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        ref={drawerRef}
                        className="z-50 fixed top-0 left-0 w-full h-full backdrop-blur-2xl flex justify-end"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="w-[300px] h-full bg-gradient-to-b from-black shadow-lg shadow-black/50"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <div className="p-6 text-white">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-bold">Menu</h2>
                                    <button
                                        onClick={handleMenuClick}
                                        className="p-2 hover:bg-gray-800 rounded-full transition-all duration-200"
                                    >
                                        <FontAwesomeIcon icon={faClose} className="text-white text-2xl" />
                                    </button>
                                </div>
                                <ul className="space-y-4">
                                    {["Movies", "Podcast", "Tv Series", "Demand"].map((item, index) => (
                                        <motion.li
                                            key={index}
                                            className="text-lg hover:text-white cursor-pointer p-3 rounded-lg hover:bg-gray-800 transition-all duration-200"
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            {item}
                                            {item === "Demand" && (
                                               <span
                                                 className="absolute rounded-sm text-xs px-2 font-bold bg-gradient-to-r from-red-500 via-red-600 to-white"
                                                 style={{
                                                   backgroundSize: '150% 100%',
                                                   backgroundPosition: '0% 0%',
                                                   animation: 'shine 2.5s ease-in-out infinite',
                                                   textShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
                                                 }}
                                               >
                                                 new
                                               </span>
                                            )}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
