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
            className={`relative h-[120px] w-full flex flex-col items-center justify-center ${isMobile ? 'bg-black' : ''}`}
            ref={ref}
            style={{
                backgroundImage: isMobile ? 'none' : "none",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <motion.div 
                className="flex flex-col items-center justify-center text-center mt-3 md:mt-0"
            >
                <motion.h1
                    className="text-[24px] lg:text-[36px] text-white mb-[18px] lg:mb-4"
                    style={{ fontFamily: 'Robotom, sans-serif', fontWeight: 600, lineHeight: '105%' }}
                >
                    Our Mission
                </motion.h1>
                <motion.p
                    className="text-[16px] lg:w-[320px] w-full text-white px-4 mt-[-10px] md:mt-0 font-ekmukta-extralight" style={{lineHeight: '120%'}}
                    // style={{ fontFamily: "'Ek Mukta', sans-serif"}}
                >
                    Uniting different cultures for a better future with love, harmony and innovation
                </motion.p>
            </motion.div>
        </div>
    );
}

export default Earth;
