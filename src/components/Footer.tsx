import { motion } from "framer-motion";
import SocialIcons from "./SocialIcons";

export default function Footer() {

    return (
        <div className="bg-black mt-40 mb-10 px-5 lg:px-20">
            <motion.div 
                className="flex justify-center flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                viewport={{ once: true }}
            >
                <span className="text-white font-bold text-[28px] lg:text-[27px] tracking-widest" style={{letterSpacing: "4px"}}>
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
                <div className="w-full h-[1px] bg-[#555555] mt-16 lg:mt-20 mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"></div>
                <motion.div 
                    className="justify-start flex flex-wrap mt-14 gap-10 lg:gap-[114px] ml-16 text-center lg:text-left w-full"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col gap-3 order-last lg:order-first lg:text-start sm: text-center ml-16">
                        <span className="text-[#33C3A5] font-medium block text-[16px]"
    style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>Our Apps</span>
                        <img src="https://tv.eternityready.com/gp.png" alt="Play Store" className="w-32 lg:w-40 rounded-md border cursor-pointer" />
                        <img src="https://tv.eternityready.com/app-store.png" alt="App Store" className="w-32 lg:w-40 rounded-md border cursor-pointer mt-3" />
                    </div>
                    <div className="flex flex-col gap-3 text-start">
                        <span className="text-[#33C3A5] font-asap"style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>Useful Links</span>
                        <span className="font-normal text-white" style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>Radio Schedule</span>
                        <span className="font-normal text-white" style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>Ways to Listen</span>
                        <span className="font-normal text-white" style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>Donate</span>
                    </div>
                    <div className="flex flex-col gap-3 text-start">
                        <span className="text-[#33C3A5] font-medium" style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>Our Brands</span>
                        <span className="font-normal text-white"style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>Corporate</span>
                        <span className="font-normal text-white" style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>Eternity Ready TV</span>
                        <span className="font-normal text-white"style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>Rapture Ready TV</span>
                    </div>
                    <div className="flex flex-col gap-3 text-start">
                        <span className="text-[#33C3A5] font-medium" style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>About</span>
                        <span className="font-normal text-white" style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>Team & Culture</span>
                        <span className="font-normal text-white" style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>About Us</span>
                        <span className="font-normal text-white" style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>Our Media Kit</span>
                    </div>
                    <div className="flex flex-col gap-3 text-start">
                        <span className="text-[#33C3A5] font-medium" style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>Help</span>
                        <span className="font-normal text-white" style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>Terms of use</span>
                        <span className="font-normal text-white" style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>Privacy & Legal</span>
                        <span className="font-normal text-white" style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>Contact & Help</span>
                    </div>
                </motion.div>
                <motion.div 
                    className="flex justify-center mt-14 relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
                    viewport={{ once: true }}
                >
                   <span className="text-white font-bold text-[22px] gap-1 flex" style={{ letterSpacing: "-2px"}}>ETERNITY <span className="text-[#E53935] font-bold" style={{ letterSpacing: "-2px"}}>READY</span></span>
                </motion.div>
                <motion.div 
                    className="justify-center flex mt-5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <span className="text-[#777777] lg:text-[13px] sm: text-xs" style={{ fontFamily: "Asap Condensed", letterSpacing: "0.01rem" }}>
                        © 2012-2025 Eternity Ready LLC, All Rights Reserved.
                    </span>
                </motion.div>
            </motion.div>
        </div>
    );
}
