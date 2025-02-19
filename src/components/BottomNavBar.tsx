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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isVisible]);

  const menuItems = [
    { name: "", icon: <FaFilm />, color: "from-red-600 to-orange-600" },
    { name: "", icon: <FaTv />, color: "from-blue-600 to-cyan-600" },
    { name: "", icon: <FaPodcast />, color: "from-purple-600 to-pink-600" },
    { name: "", icon: <FaRadio />, color: "from-green-600 to-emerald-600" },
    { name: "", icon: <FaMusic />, color: "from-yellow-600 to-amber-600" }
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed z-50 bottom-0 w-full sm:hidden",
        "py-2 px-4",
        "bg-black/90 backdrop-blur-xl",
        "border-t border-white/10",
        "shadow-lg shadow-black/50"
      )}
    >
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            className={cn(
              "relative flex flex-col items-center",
              "w-16 py-2 rounded-xl",
              "active:opacity-70 touch-none",
              "transition-transform duration-200"
            )}
            onClick={() => setActiveTab(index)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {activeTab === index && (
                <motion.div
                  className={cn(
                    "absolute inset-0 rounded-xl opacity-20",
                    "bg-gradient-to-t",
                    item.color
                  )}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                />
              )}
            </AnimatePresence>

            <motion.div
              animate={activeTab === index ? {
                y: -2,
                scale: 1.1,
                transition: { type: "spring", stiffness: 400, damping: 15 }
              } : {
                y: 0,
                scale: 1
              }}
              className="relative"
            >
              <span className={cn(
                "text-lg relative z-10",
                "transition-colors duration-200",
                activeTab === index 
                  ? "text-white" 
                  : "text-white/40"
              )}>
                {item.icon}
              </span>

              {activeTab === index && (
                <motion.div
                  className={cn(
                    "absolute -inset-3 rounded-full blur-md -z-10",
                    "bg-gradient-to-t",
                    item.color,
                    "opacity-20"
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          </motion.button>
        ))}
      </div>

      <motion.div 
        className="absolute bottom-0 h-0.5 w-full left-0"
        style={{
          background: `linear-gradient(to right, 
            transparent 0%, 
            ${activeTab === 0 ? '#ef4444' : 
              activeTab === 1 ? '#0284c7' : 
              activeTab === 2 ? '#a855f7' : 
              activeTab === 3 ? '#059669' : 
              '#eab308'} 50%, 
            transparent 100%
          )`
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 0.5, scaleX: 1 }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
}