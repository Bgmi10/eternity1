import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Menu } from "lucide-react";
import MobileDrawer from "./MobileDrawer";

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isScroll, setIsScroll] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const drawerRef = useRef(null);

    const handleScroll = () => {
        const isScrollFromTop = window.scrollY > 0;
        setIsScroll(isScrollFromTop);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMenuClick = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            //@ts-ignore
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div className={`flex justify-between lg:p-3 sm: p-3 z-50 fixed top-0 left-0 right-0 items-center transition-all duration-300 ${isScroll ? "shadow-[0_10px_10px_rgba(0,0,0,0.3),0_8px_12px_6px_rgba(0,0,0,0.15)] backdrop-blur-3xl rounded-tl-[-100px] rounded-bl-xl rounded-br-xl" : ""}`}>
                <div className="flex items-center">
                    <div className="lg:text-2xl sm:text-xl font-semibold text-white gap-1 flex">
                        <img src="https://eternityready.com/templates/apollo/img/logo1USE-THIS.png" className="sm: w-[132px] lg:w-[]" alt="Logo" />
                    </div>
                </div>
                <div className="lg:flex items-center gap-8 text-white font-semibold sm: hidden">
                    <div
                        className="flex gap-2 items-center hover:text-red-500 relative cursor-pointer"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <span>Demand</span>
                        <motion.div transition={{ type: "spring", stiffness: 300 }}>
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
                <div className="gap-2 items-center flex">
                    <button className="relative flex items-center gap-2 bg-gradient-to-b from-red-500 to-red-600 cursor-pointer p-1 rounded-lg text-white font-semibold  lg:py-1 lg:px-6 lg:text-lg px-5 text-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(229,9,20,0.7)]">
                        Donate
                    </button>
                    <div className="">
                        <Menu className="text-white cursor-pointer" strokeWidth={3} size={35} onClick={handleMenuClick} />
                    </div>
                </div>
            </div>
           <MobileDrawer isMenuOpen={isMenuOpen} drawerRef={drawerRef} handleMenuClick={handleMenuClick} />
        </>
    );
}