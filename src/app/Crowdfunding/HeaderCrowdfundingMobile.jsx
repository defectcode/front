import React, { useState, useEffect, useRef } from "react";
import FundraisingProgress from './components/Progres';
import Title from "./components/Title";
import { images } from './constants/carouselData';
import styles from './style/Header.module.css';

const HeaderCrowdfundingMobile = () => {
    const currentData = images[0];
    const [isMobile, setIsMobile] = useState(false);
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const headerRef = useRef(null);
    const [showSupportInNavbar, setShowSupportInNavbar] = useState(false);


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

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    return (
        <div ref={headerRef} className={`header headerCrowdfunding flex flex-col`}>
            <div className="relative" style={{ height: '70%' }}>
                <div className={`${isMobile ? styles.bgMobile : styles.bgDesktop}`} style={{ height: '100%' }}>
                    <div className={`${styles.gradientOverlay} absolute bottom-0 left-0 right-0`} style={{ height: '5%' }}></div>
                </div>
            </div>
            <div className="flex-grow bg-black flex flex-col justify-start px-5" style={{ height: '30%' }}>
                <div className="max-w-screen-lg w-full flex flex-col gap-4 sm:gap-8  lg:px-[50px] mb-2 z-0">
                    <Title title={currentData.title} description={currentData.description} />
                    <FundraisingProgress data={currentData} />
                </div>
            </div>
        </div>
    );
}

export default HeaderCrowdfundingMobile;
