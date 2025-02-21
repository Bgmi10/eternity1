import { useState } from "react";  
import { motion } from "framer-motion";  
import { FaFilm, FaTv, FaPodcast, FaMusic } from "react-icons/fa"; 
import { FaRadio } from "react-icons/fa6";  
import { cn } from "../lib/utils";  

export default function BottomNavBar() {      
    const [activeTab, setActiveTab] = useState(0);              

    const menuItems = [
        { name: "Movies", icon: <FaFilm size={24} /> },            
        { name: "Series", icon: <FaTv size={24} /> },            
        { name: "Podcast", icon: <FaPodcast size={24} /> },            
        { name: "Radio", icon: <FaRadio size={24} /> },            
        { name: "Music", icon: <FaMusic size={24} /> }
    ];             

    return (                  
        <motion.div
            initial={{ y: 100 }} 
            animate={{ y: 0 }} 
            transition={{ type: "spring", stiffness: 300, damping: 30 }} 
            className={cn(
                "fixed z-50 bottom-0 w-full sm:hidden", 
                "py-3 px-4 bg-black",
                "border-t border-white/10", 
                "shadow-lg shadow-black/50"
            )}
        >
            <div className="flex justify-between items-center max-w-lg mx-auto">
                {menuItems.map((item, index) => (
                    <motion.button 
                        key={index} 
                        className={cn(
                            "relative flex flex-col items-center gap-1", 
                            "w-16 py-2 rounded-lg", 
                            "active:opacity-80", 
                            "transition-all duration-200"
                        )}
                        onClick={() => setActiveTab(index)}
                        whileTap={{ scale: 0.9 }}
                    >
                        <motion.div
                            animate={
                                activeTab === index 
                                    ? { y: -6, scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 15 }} 
                                    : { y: 0, scale: 1 }
                            }
                            className={`${activeTab === index ? "" : ""} relative flex flex-col items-center`}
                        >
                            <span className={cn(
                                "text-xl relative z-10",
                                activeTab === index ? "text-white" : "text-gray-500"
                            )}>
                                {item.icon}
                            </span>
                            <span className={cn(
                                "text-xs font-medium",
                                activeTab === index ? "text-white " : "text-gray-400"
                            )}>
                                {item.name}
                            </span>
                        </motion.div>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );                            
}
