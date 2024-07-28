'use client'
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

const Earth = () => {
    const { ref, inView, entry } = useInView();
    const [fixed, setFixed] = useState(false);
    const controls = useAnimation();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isMobile) return; 

        const handleScroll = () => {
            if (entry) {
                const isFixed = window.scrollY > entry.boundingClientRect.top + window.innerHeight - 100;
                setFixed(isFixed);
                if (isFixed) {
                    controls.start({
                        y: -360,
                        transition: { duration: 1.5, ease: "easeInOut" }
                    });
                } else {
                    controls.start({
                        y: 0,
                        transition: { duration: 3, ease: "easeInOut" }
                    });
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [entry, controls, isMobile]);

    return (
        <div 
            className={`relative h-screen w-auto lg:w-full ${isMobile ? 'h-[150px] bg-black' : 'h-screen ourMissionBackground'}`} 
            ref={ref}
            style={{ backgroundImage: isMobile ? 'none' : "url('/imgs/OurMission/Earth.png')" }}
        >
            <motion.div 
                className={`absolute ${isMobile ? 'static flex flex-col items-center justify-center h-full' : 'bottom-[174px] right-0 left-0 p-5 flex flex-col items-end lg:mb-10'}`}
                animate={isMobile ? {} : controls}
            >
                <motion.h1
                    className={`lg:text-[165px] text-[32px] text-white lg:mb-[64px] mb-0 ${isMobile ? 'text-center' : 'mr-[170px]'}`}
                    style={{ fontFamily: 'Robotom, sans-serif', fontWeight: 400 }}
                >
                    Our Mission
                </motion.h1>
                {!isMobile && (
                    <div className={`border border-[#212627] w-full mb-[40px] ${fixed ? '-mt-20' : ''}`}></div>
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
