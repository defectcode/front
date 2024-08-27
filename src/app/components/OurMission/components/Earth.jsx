'use client'
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Earth = () => {
    const { ref, inView, entry } = useInView();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div 
            className={`relative ${isMobile ? 'h-[100px] bg-black' : 'h-[500px]'} w-full`} 
            ref={ref}
            style={{ backgroundImage: isMobile ? 'none' : "url('/imgs/OurMission/Earth.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <motion.div 
                className={`absolute ${isMobile ? 'static flex flex-col items-center justify-center h-full' : 'right-0 left-0 p-5 flex flex-col items-end lg:mb-10'}`}
            >
                <motion.h1
                    className={`lg:text-[165px] text-[32px] text-white lg:mb-[64px] mb-0 ${isMobile ? 'text-center' : 'mr-[170px]'}`}
                    style={{ fontFamily: 'Robotom, sans-serif', fontWeight: 400 }}
                >
                    Our Mission
                </motion.h1>
                {!isMobile && (
                    <div className={`border border-[#212627] w-full mb-[40px]`}></div>
                )}
                <motion.p
                    className={`lg:text-[16px] text-[14px] lg:w-[233px] w-full text-white ${isMobile ? 'text-center px-[50px]' : 'mr-[170px]'}`}
                    style={{ fontFamily: "'Ek Mukta', sans-serif', fontWeight: 400" }}
                >
                    Uniting different cultures for a better future with love, harmony and innovation
                </motion.p>
            </motion.div>
        </div>
    );
}

export default Earth;
