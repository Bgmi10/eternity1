import { useState } from "react";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // New X logo from react-icons v6

const SocialIcons = () => {
  const [ishoverx, setIsHoverX] = useState(false);

  return (
    <div className="flex space-x-8 flex-wrap justify-center gap-5">
      <div className="flex items-center gap-3 hover:bg-white p-1 hover:px-10 rounded-4xl transition-all duration-900 cursor-pointer">
        <div className="w-5 h-5 flex items-center justify-center rounded-full"> 
          <FaFacebook className="text-xl" fill="#576EEE"/> 
        </div>
        <span className="text-[#576EEE] font-bold text-xl">Facebook</span>
      </div>
      <div className="flex gap-3 items-center hover:bg-white p-1 rounded-4xl transition-all duration-900 hover:px-10 cursor-pointer"  onMouseEnter={() => setIsHoverX(true)} onMouseLeave={() => setIsHoverX(false)}>
        <div className="w-5 h-5 flex items-center justify-center rounded-full">
          <FaXTwitter className={`${ishoverx ? "text-black" : "text-white"} text-xl`} />
        </div>
        <span className="font-bold text-blue-400 font-oswald text-xl">x.com</span>
      </div>
      <div className="flex items-center gap-3 hover:bg-white p-1 rounded-4xl transition-all duration-900 hover:px-10 cursor-pointer">
        <div className="w-5 h-5 flex items-center justify-center rounded-full">
          <FaYoutube className="text-red-600 text-2xl" />
        </div>
        <span className="text-red-600 font-bold font-asap text-xl">Youtube</span>
      </div>
      <div className="flex items-center gap-3 hover:bg-white p-1 rounded-4xl transition-all duration-900 hover:px-10 cursor-pointer">  
        <div className="w-5 h-5 flex items-center justify-center">
          <FaInstagram className="text-2xl text-[#F8079a]" />
        </div>
        <span className="text-[#F8079a] font-bold font-oswald text-xl">Instagram</span>
      </div>
    </div>
  );
};

export default SocialIcons;
