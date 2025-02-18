import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilm, FaTv, FaPodcast, FaMusic } from "react-icons/fa";
import { FaRadio } from "react-icons/fa6";
import { cn } from "../lib/utils";

export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState(0);

  const menuItems = [
    { name: "Movies", icon: <FaFilm />, label: "Explore Movies" },
    { name: "TV Shows", icon: <FaTv />, label: "Browse TV Shows" },
    { name: "Podcasts", icon: <FaPodcast />, label: "Listen to Podcasts" },
    { name: "Radio", icon: <FaRadio />, label: "Live Radio" },
    { name: "Music", icon: <FaMusic />, label: "Discover Music" }
  ];

  return (
    <motion.div
      className={cn(
        "fixed z-50 bottom-0 w-full lg:hidden",
        "py-2 px-4 border-t border-white/10",
        "backdrop-blur-xl bg-black/80"
      )}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center">
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              className={cn(
                "relative flex flex-col items-center",
                "w-16 py-2 rounded-xl",
                "transition-colors duration-200",
                activeTab === index ? "text-white" : "text-white/50"
              )}
              onClick={() => setActiveTab(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {activeTab === index && (
                  <motion.div
                    className={cn(
                      "absolute inset-0 rounded-xl",
                      "bg-gradient-to-t from-white/10 to-white/5",
                      "border border-white/20",
                      "-z-10"
                    )}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>

              <motion.div
                className="relative"
                initial={false}
                animate={activeTab === index ? {
                  y: -4,
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 300 }
                } : {
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <span className="text-xl relative z-10">{item.icon}</span>
                
                {/* Active Indicator Glow */}
                {activeTab === index && (
                  <motion.div
                    className="absolute -inset-2 bg-white/10 rounded-full blur-md -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>

              <motion.span 
                className="text-xs mt-1 font-medium opacity-0 absolute -bottom-6"
                animate={{ 
                  opacity: activeTab === index ? 1 : 0,
                  y: activeTab === index ? 0 : 5
                }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.span>

              {/* Tooltip */}
              <div className={cn(
                "absolute -top-10 left-1/2 -translate-x-1/2",
                "px-3 py-1.5 rounded-lg",
                "bg-black/90 backdrop-blur-sm",
                "text-white text-xs whitespace-nowrap",
                "opacity-0 group-hover:opacity-100",
                "transition-opacity duration-200",
                "pointer-events-none",
                "border border-white/10"
              )}>
                {item.label}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-b border-r border-white/10" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Progress Indicator */}
        <motion.div 
          className="h-0.5 bg-gradient-to-r from-white/0 via-white to-white/0 mt-2"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: 1, 
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
          }}
        />
      </div>
    </motion.div>
  );
}