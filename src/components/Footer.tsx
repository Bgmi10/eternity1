import { motion } from "framer-motion";
import SocialIcons from "./SocialIcons";

export default function Footer() {
    return (
        <div className="bg-black mt-40 mb-10">
            <motion.div 
                className="max-w-[1440px] mx-auto px-5 lg:px-20 flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                viewport={{ once: true }}
            >
                {/* Connect with us section */}
                <div className="w-full text-center mb-16">
                    <span className="text-white font-bold text-[28px] lg:text-[27px] tracking-[4px] inline-block">
                        Connect with us
                    </span>
                </div>

                {/* Social Icons */}
                <motion.div 
                    className="w-full text-center mb-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex gap-5 justify-center">
                        <SocialIcons />
                    </div>
                </motion.div>

                {/* Divider */}
                <div className="w-full h-px bg-[#555555] mb-16"></div>

                {/* Footer Links Container */}
                <motion.div 
                    className="w-full grid sm: grid-cols-2 lg:grid-cols-none sm: flex-wrap lg:flex lg:flex-row gap-10 lg:gap-32 mb-16 lg:justify-start sm: justify-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col items-start lg:items-start lg:order-first order-last">
                        <span className="text-[#33C3A5] font-medium text-[16px] mb-4 font-['Asap_Condensed'] tracking-[0.01rem]">
                            Our Apps
                        </span>
                        <img src="https://tv.eternityready.com/gp.png" alt="Play Store" 
                            className="w-32 lg:w-40 rounded-md border cursor-pointer" />
                        <img src="https://tv.eternityready.com/app-store.png" alt="App Store" 
                            className="w-32 lg:w-40 rounded-md border cursor-pointer mt-3" />
                    </div>

                    {/* Useful Links */}
                    <div className="flex flex-col items-start">
                        <span className="text-[#33C3A5] font-medium text-[16px] mb-4 font-['Asap_Condensed'] tracking-[0.01rem]">
                            Useful Links
                        </span>
                        <div className="flex flex-col gap-3">
                            {["Radio Schedule", "Ways to Listen", "Donate"].map((item) => (
                                <span key={item} className="text-white font-normal font-['Asap_Condensed'] tracking-[0.01rem] hover:text-[#33C3A5] transition-colors cursor-pointer">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Our Brands */}
                    <div className="flex flex-col items-start">
                        <span className="text-[#33C3A5] font-medium text-[16px] mb-4 font-['Asap_Condensed'] tracking-[0.01rem]">
                            Our Brands
                        </span>
                        <div className="flex flex-col gap-3">
                            {["Corporate", "Eternity Ready TV", "Rapture Ready TV"].map((item) => (
                                <span key={item} className="text-white font-normal font-['Asap_Condensed'] tracking-[0.01rem] hover:text-[#33C3A5] transition-colors cursor-pointer">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* About */}
                    <div className="flex flex-col items-start">
                        <span className="text-[#33C3A5] font-medium text-[16px] mb-4 font-['Asap_Condensed'] tracking-[0.01rem]">
                            About
                        </span>
                        <div className="flex flex-col gap-3">
                            {["Team & Culture", "About Us", "Our Media Kit"].map((item) => (
                                <span key={item} className="text-white font-normal font-['Asap_Condensed'] tracking-[0.01rem] hover:text-[#33C3A5] transition-colors cursor-pointer">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Help */}
                    <div className="flex flex-col items-start">
                        <span className="text-[#33C3A5] font-medium text-[16px] mb-4 font-['Asap_Condensed'] tracking-[0.01rem]">
                            Help
                        </span>
                        <div className="flex flex-col gap-3">
                            {["Terms of use", "Privacy & Legal", "Contact & Help"].map((item) => (
                                <span key={item} className="text-white font-normal font-['Asap_Condensed'] tracking-[0.01rem] hover:text-[#33C3A5] transition-colors cursor-pointer">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Logo */}
                <motion.div 
                    className="mb-5"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <span className="text-white font-bold text-[22px] flex items-center gap-1 tracking-[-2px]">
                        ETERNITY <span className="text-[#E53935] font-bold tracking-[-2px]">READY</span>
                    </span>
                </motion.div>

                {/* Copyright */}
                <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <span className="text-[#777777] text-xs lg:text-[13px] font-['Asap_Condensed'] tracking-[0.01rem]">
                        © 2012-2025 Eternity Ready LLC, All Rights Reserved.
                    </span>
                </motion.div>
            </motion.div>
        </div>
    );
}