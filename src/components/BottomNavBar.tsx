import { motion } from "framer-motion";
import { FaFilm, FaTv, FaPodcast, FaMusic } from "react-icons/fa";
import { FaRadio } from "react-icons/fa6";

export default function BottomNavBar() {
  const menuItems = [
    { name: "", icon: <FaFilm /> },
    { name: "", icon: <FaTv /> },
    { name: "", icon: <FaPodcast /> },
    { name: "", icon: <FaRadio /> },
    { name: "", icon: <FaMusic />}
  ];

  return (
    <motion.div
      className="fixed z-50 bottom-0 w-full lg:hidden text-white p-3 border-t backdrop-blur-lg bg-black/70 flex justify-between items-center"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {menuItems.map((item, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center text-sm cursor-pointer "
          whileHover={{ scale: 1.1, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="text-lg">{item.icon}</span>
          <span className="mt-1">{item.name}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
