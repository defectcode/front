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
            className={`relative h-[150px] w-full flex flex-col items-center justify-center ${isMobile ? 'bg-black' : ''}`}
            ref={ref}
            style={{
                backgroundImage: isMobile ? 'none' : "none",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <motion.div 
                className="flex flex-col items-center justify-center text-center"
            >
                <motion.h1
                    className="text-[36px] text-white mb-2 lg:mb-4"
                    style={{ fontFamily: 'Robotom, sans-serif', fontWeight: 400 }}
                >
                    Our Mission
                </motion.h1>
                <motion.p
                    className="lg:text-[16px] lg:w-[320px] w-full text-white px-4"
                    style={{ fontFamily: "'Ek Mukta', sans-serif", fontWeight: 400 }}
                >
                    Uniting different cultures for a better future with love, harmony and innovation
                </motion.p>
            </motion.div>
        </div>
    );
}

export default Earth;
