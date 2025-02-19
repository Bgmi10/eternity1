import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilm, FaTv, FaPodcast, FaMusic } from "react-icons/fa";
import { FaRadio } from "react-icons/fa6";
import { cn } from "../lib/utils";

export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(lastScrollY > currentScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { icon: <FaFilm size={22} />, color: "from-red-500 to-orange-500" },
    { icon: <FaTv size={22} />, color: "from-blue-500 to-cyan-500" },
    { icon: <FaPodcast size={22} />, color: "from-purple-500 to-pink-500" },
    { icon: <FaRadio size={22} />, color: "from-green-500 to-emerald-500" },
    { icon: <FaMusic size={22} />, color: "from-yellow-500 to-amber-500" },
  ];

  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: isVisible ? 0 : 80 }}
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
      className={cn(
        "fixed z-50 bottom-4 left-1/2 transform -translate-x-1/2",
        "w-[90%] max-w-md bg-gradient-to-t from-black/90 to-red-500 backdrop-blur-2xl",
        "rounded-3xl shadow-2xl shadow-black/50",
        "px-6 py-3 flex justify-around items-center"
      )}
    >
      {menuItems.map((item, index) => (
        <motion.button
          key={index}
          className={cn(
            "relative flex flex-col items-center w-14 h-14",
            "rounded-full transition-transform duration-300"
          )}
          onClick={() => setActiveTab(index)}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={
              activeTab === index
                ? {
                    y: -8,
                    scale: 1.2,
                    transition: { type: "spring", stiffness: 400, damping: 20 }
                  }
                : { y: 0, scale: 1 }
            }
            className="relative flex justify-center items-center w-full h-full"
          >
            <span
              className={cn(
                "relative z-10 text-xl transition-colors duration-300",
                activeTab === index ? "text-white" : "text-gray-400"
              )}
            >
              {item.icon}
            </span>

            <AnimatePresence>
              {activeTab === index && (
                <motion.div
                  className={cn(
                    "absolute inset-0 rounded-full blur-xl -z-10 opacity-20",
                    item.color
                  )}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.5, scale: 1.2 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.button>
      ))}
    </motion.div>
  );
}
