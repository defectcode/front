'use client';
import React, { useState, useEffect, useRef } from "react";
import FundraisingProgress from './components/Progres';
import Title from "./components/Title";
import { images } from './constants/carouselData';
import styles from './style/Header.module.css';

const HeaderCrowdfundingMobile = () => {
    const currentData = images[0];
    const [isMobile, setIsMobile] = useState(window.innerWidth < 380);
    const headerRef = useRef(null);
    const [showSupportInNavbar, setShowSupportInNavbar] = useState(false);
    const [imageHeight, setImageHeight] = useState('70%');
    const [bgHeight, setBgHeight] = useState('30%');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 430 && window.innerWidth > 400) {
                setImageHeight('70%');
                setBgHeight('30%');
            } else if (window.innerWidth <= 380) {
                setImageHeight('70%');
                setBgHeight('30%');
            } else {
                setImageHeight('70%');
                setBgHeight('30%');
            }
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowSupportInNavbar(true);
            } else {
                setShowSupportInNavbar(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const headerPosition = headerRef.current?.getBoundingClientRect().top;
            if (headerPosition && headerPosition < 100) {
                setShowSupportInNavbar(true);
            } else {
                setShowSupportInNavbar(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={headerRef} className={`header headerCrowdfunding flex flex-col bg-black`}>
            <div
                className={`${isMobile ? styles.bgMobile : styles.bgDesktop} relative`}
                style={{ height: imageHeight }}
            >
                <div
                    style={{
                        height: '100%',
                        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 20%), url(${currentData.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                </div>
            </div>

            <div
                className="flex-grow bg-black flex flex-col justify-start px-5 relative"
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        filter: 'blur(40px)',
                        zIndex: 1,
                        background: 'linear-gradient(to top left, rgba(40, 40, 40, 0.4), rgba(0, 0, 0, 0))'
                    }}
                ></div>

                <div
                    className="max-w-screen-lg w-full flex flex-col gap-4 sm:gap-8 lg:px-[50px] relative z-10"
                    style={{
                        marginTop: '-50px',  // Mută conținutul în sus
                        paddingBottom: '50px'  // Ajustează spațiul după cum este necesar
                    }}
                >
                    <Title title={currentData.title} description={currentData.description} />
                    <FundraisingProgress data={currentData} />
                </div>
            </div>
        </div>
    );
}

export default HeaderCrowdfundingMobile;
