import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";  
import { useEffect, useState } from "react";
import { FaGem } from "react-icons/fa";

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isScroll, setIsScroll] = useState(false);

    console.log(isScroll);
    const handleScroll = () => {
        const isScrollFromTop = window.scrollY > 0;
        setIsScroll(isScrollFromTop);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    return (
        <div className={`flex justify-between p-4 z-50 fixed top-0 left-0 right-0 items-center w-full ${isScroll ? " bg-gradient-to-b from-black/20 backdrop-blur-lg border-b border-white" : ""}`}>
            <div className="flex items-center">
                <span className="lg:text-4xl sm: text-3xl font-bold text-white">
                    <span className="text-[#E50914]">ER</span> Flix
                </span>
                <span className="text-[#E50914] lg:text-4xl sm: text-3xl font-extrabold">🎬</span>
            </div>
            <div className="lg:flex items-center gap-8 text-white font-semibold sm: hidden">
                <div 
                    className="flex gap-2 items-center hover:text-red-500 relative cursor-pointer"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <span>Demand</span>
                    <motion.div
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FontAwesomeIcon icon={!isDropdownOpen ? faAngleDown : faAngleUp} />
                    </motion.div>
                    {isDropdownOpen && (
                        <motion.div
                            className="absolute top-full left-0 mt-3 w-48 bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg"
                            initial={{ opacity: 0, scale: 0.9, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {["Option 1", "Option 2", "Option 3"].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="p-3 hover:bg-gray-800 cursor-pointer flex items-center"
                                    whileHover={{ scale: 1.05, x: 8 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {item}
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
                <div className="flex gap-2 items-center">
                    <span>Podcast</span>
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
                <div className="flex gap-2 items-center">
                    <span>Tv Series</span>
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
            </div>
            <div className="items-center flex">
              <button className="relative flex items-center gap-2 bg-[#E50914] cursor-pointer p-2 rounded-xl text-white font-bold lg:px-12 lg:text-lg px-5 text-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(229,9,20,0.7)]">
                 <FaGem className="text-white lg:text-xl sm: text-lg" />
                 Donate
               </button>
            </div>
        </div>
    );
}
