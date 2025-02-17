import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // New X logo from react-icons v6

const SocialIcons = () => {
  return (
    <div className="flex space-x-8 flex-wrap justify-center gap-5">
      {/* Facebook */}
      <div className="flex items-center gap-3 hover:bg-white p-1 hover:px-10 rounded-4xl transition-all duration-900 cursor-pointer">
        <div className="w-4 h-4 flex items-center justify-center rounded-full"> 
          <FaFacebook className="text-xl" fill="#576EEE"/> 
        </div>
        <span className="text-[#576EEE] font-bold">Facebook</span>
      </div>

      {/* Twitter X */}
      <div className="flex gap-3 items-center hover:bg-white p-1 rounded-4xl transition-all duration-900 hover:px-10 cursor-pointer">
        <div className="w-4 h-4 flex items-center justify-center rounded-full">
          <FaXTwitter className="text-[#1DBBFF] text-xl" />
        </div>
        <span className="font-bold text-blue-400 font-oswald">X.com</span>
      </div>

      {/* YouTube */}
      <div className="flex items-center gap-3 hover:bg-white p-1 rounded-4xl transition-all duration-900 hover:px-10 cursor-pointer">
        <div className="w-4 h-4 flex items-center justify-center rounded-full">
          <FaYoutube className="text-red-600 text-2xl" />
        </div>
        <span className="text-red-600 font-bold font-asap">Youtube</span>
      </div>

      {/* Instagram */}
      <div className="flex items-center gap-3 hover:bg-white p-1 rounded-4xl transition-all duration-900 hover:px-10 cursor-pointer">  
        <div className="w-4 h-4 flex items-center justify-center">
          <FaInstagram className="text-2xl text-[#F8079a]" />
        </div>
        <span className="text-[#F8079a] font-bold font-oswald">Instagram</span>
      </div>
    </div>
  );
};

export default SocialIcons;
