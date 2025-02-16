import { motion } from "framer-motion";
import SocialIcons from "./SocialIcons";

export default function Footer() {
    const text = "ETERNITY READY".split("");

    return (
        <div className="bg-black mt-40 mb-10 px-5 lg:px-20">
            <motion.div 
                className="flex justify-center flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                viewport={{ once: true }}
            >
                <span className="text-white font-bold text-[33px] lg:text-[27px] tracking-widest">
                    Connect with us
                </span>
                <motion.div 
                    className="text-white flex gap-5 mt-8 lg:mt-14 justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <SocialIcons />
                </motion.div>
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent mt-16 lg:mt-20"></div>
                <motion.div 
                    className="flex flex-wrap justify-center mt-5 gap-10 lg:gap-32 text-center lg:text-left"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col gap-3 order-last lg:order-first">
                        <span className="text-teal-400 font-medium block">Our Apps</span>
                        <img src="https://tv.eternityready.com/gp.png" alt="Play Store" className="w-32 lg:w-40 rounded-md border hover:scale-110 transition-transform duration-300" />
                        <img src="https://tv.eternityready.com/app-store.png" alt="App Store" className="w-32 lg:w-40 rounded-md border hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex flex-col gap-3 text-start">
                        <span className="text-teal-400 font-medium">Useful Links</span>
                        <span className="font-normal text-white">Radio Schedule</span>
                        <span className="font-normal text-white">Ways to Listen</span>
                        <span className="font-normal text-white">Donate</span>
                    </div>
                    <div className="flex flex-col gap-3 text-start">
                        <span className="text-teal-400 font-medium">Our Brands</span>
                        <span className="font-normal text-white">Corporate</span>
                        <span className="font-normal text-white">Eternity Ready TV</span>
                        <span className="font-normal text-white">Rapture Ready TV</span>
                    </div>
                    <div className="flex flex-col gap-3 text-start">
                        <span className="text-teal-400 font-medium">About</span>
                        <span className="font-normal text-white">Team & Culture</span>
                        <span className="font-normal text-white">About Us</span>
                        <span className="font-normal text-white">Our Media Kit</span>
                    </div>
                    <div className="flex flex-col gap-3 text-start">
                        <span className="text-teal-400 font-medium">Help</span>
                        <span className="font-normal text-white">Terms of use</span>
                        <span className="font-normal text-white">Privacy & Legal</span>
                        <span className="font-normal text-white">Contact & Help</span>
                    </div>
                </motion.div>
                <motion.div 
                    className="flex justify-center mt-14 relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <motion.span className="text-2xl font-bold flex">
                        {text.map((char, index) => (
                            <motion.span
                                key={index}
                                className={`relative transition-transform duration-300 ${
                                    char === " " ? "w-2" : ""
                                } ${index >= 9 ? "text-red-500" : "text-white"}`}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.02, ease: "easeOut" }}
                                whileHover={{
                                    y: [0, -10, 10, 0],
                                    rotate: [0, 5, -5, 0],
                                    transition: { duration: 0.4, repeat: Infinity, repeatType: "reverse" }
                                }}
                                viewport={{ once: true }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.span>
                </motion.div>
                <motion.div 
                    className="justify-center flex mt-5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <span className="text-[#666666] lg:text-sm sm: text-xs font-medium">
                        © 2012-2025 Eternity Ready LLC, All Rights Reserved.
                    </span>
                </motion.div>
            </motion.div>
        </div>
    );
}
