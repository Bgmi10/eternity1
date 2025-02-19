import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilm, FaTv, FaPodcast, FaMusic } from "react-icons/fa";
import { FaRadio } from "react-icons/fa6";
import { cn } from "../lib/utils";

export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      if (scrollDelta > 10 && isVisible) {
        setIsVisible(false);
      } else if (scrollDelta < -10 && !isVisible) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isVisible]);

  const menuItems = [
    { icon: <FaFilm size={25} />, color: "from-red-600 to-orange-600" },
    { icon: <FaTv size={25} />, color: "from-blue-600 to-cyan-600" },
    { icon: <FaPodcast size={25} />, color: "from-purple-600 to-pink-600" },
    { icon: <FaRadio size={25} />, color: "from-green-600 to-emerald-600" },
    { icon: <FaMusic size={25} />, color: "from-yellow-600 to-amber-600" }
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ type: "spring", stiffness: 250, damping: 30 }}
      className={cn(
        "fixed z-50 bottom-0 w-full sm:hidden",
        "py-3 px-5 bg-black border-t border-white/10",
        "shadow-lg shadow-black/50"
      )}
    >
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            className={cn(
              "relative flex flex-col items-center w-16 py-2 rounded-xl",
              "active:opacity-70 touch-none transition-transform duration-200"
            )}
            onClick={() => setActiveTab(index)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={
                activeTab === index
                  ? {
                      y: -6,
                      scale: 1.15,
                      transition: { type: "spring", stiffness: 500, damping: 20 }
                    }
                  : { y: 0, scale: 1 }
              }
              className="relative"
            >
              <span
                className={cn(
                  "text-lg relative z-10 transition-colors duration-300",
                  activeTab === index ? "text-white" : "text-gray-400"
                )}
              >
                {item.icon}
              </span>

              <AnimatePresence>
                {activeTab === index && (
                  <motion.div
                    className={cn(
                      "absolute -inset-3 rounded-full blur-md -z-10 opacity-25",
                      item.color
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4, scale: 1.1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
