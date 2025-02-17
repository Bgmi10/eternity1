import { motion } from "framer-motion";
import SocialIcons from "./SocialIcons";

export default function Footer() {
    return (
        <div className="bg-black mt-10">
            <motion.div 
                className="mx-auto px-5 lg:px-20 flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                viewport={{ once: true }}
            >
                {/* Connect with us section */}
                <div className="w-full text-center mb-8">
                    <span className="text-white font-bold text-[28px] lg:text-[27px] tracking-[4px] inline-block">
                        Connect with us
                    </span>
                </div>

                {/* Social Icons */}
                <motion.div 
                    className="w-full text-center mb-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div className="justify-center">
                        <SocialIcons />
                    </div>
                </motion.div>

                {/* Divider */}
                <div className="w-4/5 h-px bg-[#555555] lg:mb-10 sm: mb-4"></div>

                {/* Footer Links Container */}
                <motion.div 
                    className="w-full grid sm:grid-cols-2 lg:grid-cols-none sm:flex-wrap lg:flex lg:flex-row gap-10 lg:gap-20 sm: mb-4 lg:mb-12 lg:justify-center sm:justify-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col items-center sm:col-span-2 lg:col-span-1 lg:items-start">
                        <span className="text-[#33C3A5] font-bold text-xl mb-4 tracking-[0.01rem]">
                            Our Apps
                        </span>
                        <img src="https://tv.eternityready.com/gp.png" alt="Play Store" 
                            className="w-48 rounded-md border cursor-pointer" />
                        <img src="https://tv.eternityready.com/app-store.png" alt="App Store" 
                            className="w-48 rounded-md border cursor-pointer mt-3" />
                    </div>

                    {/* Useful Links */}
                   <div className="sm: grid sm: grid-cols-2 gap-10 lg:flex lg:gap-20"> 
                    <div className="flex flex-col items-start">
                        <span className="text-[#33C3A5] font-bold text-xl mb-4 tracking-[0.01rem]">
                            Useful Links
                        </span>
                        <div className="flex flex-col gap-3">
                            {["Radio Schedule", "Ways to Listen", "Donate"].map((item) => (
                                <span key={item} className="text-white font-normal tracking-[0.01rem] hover:text-[#33C3A5] transition-colors cursor-pointer">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Our Brands */}
                    <div className="flex flex-col items-start">
                        <span className="text-[#33C3A5] font-bold text-xl mb-4 tracking-[0.01rem]">
                            Our Brands
                        </span>
                        <div className="flex flex-col gap-3">
                            {["Corporate", "Eternity Ready TV", "Rapture Ready TV"].map((item) => (
                                <span key={item} className="text-white font-normal tracking-[0.01rem] hover:text-[#33C3A5] transition-colors cursor-pointer">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* About */}
                    <div className="flex flex-col items-start">
                        <span className="text-[#33C3A5] font-bold text-xl mb-4 tracking-[0.01rem]">
                            About
                        </span>
                        <div className="flex flex-col gap-3">
                            {["Team & Culture", "About Us", "Our Media Kit"].map((item) => (
                                <span key={item} className="text-white font-normal tracking-[0.01rem] hover:text-[#33C3A5] transition-colors cursor-pointer">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Help */}
                    <div className="flex flex-col items-start">
                        <span className="text-[#33C3A5] font-bold text-xl mb-4 tracking-[0.01rem]">
                            Help
                        </span>
                        <div className="flex flex-col gap-3">
                            {["Terms of use", "Privacy & Legal", "Contact & Help"].map((item) => (
                                <span key={item} className="text-white font-normal tracking-[0.01rem] hover:text-[#33C3A5] transition-colors cursor-pointer">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                    </div>
                </motion.div>
                <div className="lg:w-[calc(110%+2rem)] sm: w-[calc(100%+2rem)] h-px bg-[#555555] mb-2"></div>
                <motion.div 
                    className="mb-4 flex lg:flex-row justify-between sm: flex-col lg:gap-52 sm: gap-2 items-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <img src="https://eternityready.com/templates/apollo/img/logo1USE-THIS.png" className="w-52"/>
                    <span className="text-gray-200 sm: text-[13px] lg:text-[15px] tracking-[0.01rem] sm: text-center mt-1">
                        © 2012-2025 Eternity Ready LLC, All Rights Reserved.
                    </span>
                </motion.div>
            </motion.div>
        </div>
    );
}