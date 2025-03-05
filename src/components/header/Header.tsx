import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import MobileDrawer from "./MobileDrawer";
import { useNavigate } from "react-router-dom";
import { 
    Film, 
    Tv, 
    Podcast,
    Search, 
    Menu,
    Home
  } from 'lucide-react';

export default function Header() {
    const [isScroll, setIsScroll] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const drawerRef = useRef(null);
    const [currentTab, setCurrentTab] = useState("home");
    const navigate = useNavigate();
    //@ts-ignore
    const [hoveredSection, setHoveredSection] = useState<string | null>(null)

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

    const navSections = [
        {
            id: "home",
            label: "Home",
            icon: Home,
            route: "/",
        },
        { 
          id: 'movies', 
          label: 'Movies', 
          icon: Film,
          route: '/movies'
        },
        { 
          id: 'series', 
          label: 'TV Series', 
          icon: Tv,
          route: '/series'
        },
        { 
          id: 'podcast', 
          label: 'Podcast', 
          icon: Podcast,
          route: '/podcast'
        }
      ];
    

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
        <motion.header 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScroll 
              ? 'bg-black/60 backdrop-blur-xl shadow-2xl' 
              : 'bg-transparent'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl lg:mx-auto px-2 py-3 flex justify-between items-center">
            {/* Logo */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img 
                src="https://eternityready.com/templates/apollo/img/logo1USE-THIS.png" 
                alt="Entertainment Hub Logo" 
                className="lg:w-40 w-32 ml-2"
              />
            </motion.div>
    
            {/* Navigation */}
            <nav className="lg:flex items-center space-x-8 hidden">
              {navSections.map((section) => (
                <motion.div 
                  key={section.id}
                  className="relative group"
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <motion.button
                    onClick={() => {
                      setCurrentTab(section.id);
                      navigate(section.route);
                    }}
                    className={`
                      flex items-center gap-2 text-white font-semibold 
                      transition-all duration-300 
                      ${currentTab === section.id 
                        ? 'text-red-500 scale-105' 
                        : 'hover:text-red-500'}
                    `}
                  >
                    <section.icon 
                      className={`
                        ${currentTab === section.id 
                          ? 'text-red-500' 
                          : 'text-white group-hover:text-red-500'}
                      `} 
                      size={24} 
                    />
                    {section.label}
                  </motion.button>
                </motion.div>
              ))}
            </nav>
            <div className="flex items-center sm: gap-2">
              <motion.button 
                className="text-white hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <Search size={24} />
              </motion.button>
              
             
              <motion.button 
                className="bg-red-600 text-white lg:px-4 lg:py-2 px-3 py-1 rounded-3xl lg:rounded-full 
                  flex items-center gap-2 hover:bg-red-700 transition-all cursor-pointer font-semibold"
                onClick={() => navigate('/account')}
              >
               Donate Now
              </motion.button>
                <Menu onClick={handleMenuClick} className="text-white cursor-pointer"/>
              <MobileDrawer drawerRef={drawerRef}  handleMenuClick={handleMenuClick} isMenuOpen={isMenuOpen}  />
            </div>
          </div>
        </motion.header>
      );
    }