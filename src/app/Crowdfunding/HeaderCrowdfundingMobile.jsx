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
        if (window.innerWidth <= 440 && window.innerWidth > 400) {
          setImageHeight('60%');
          setBgHeight('40%');
        } else if(window.innerWidth <= 380){
          setImageHeight('60%');
          setBgHeight('30%');
        } else{
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

    return (
        <div ref={headerRef} className={`header headerCrowdfunding flex flex-col bg-black`}>
            <div className="relative" style={{ height: imageHeight }}>
                <div className={`${isMobile ? styles.bgMobile : styles.bgDesktop}`} style={{ height: '100%' }}>
                    <div className={`${styles.gradientOverlay} absolute bottom-0 left-0 right-0`} style={{ height: '5%' }}></div>
                </div>
            </div>
            <div className="flex-grow bg-black flex flex-col justify-start px-5" style={{ height: bgHeight }}>
                <div className="max-w-screen-lg w-full flex flex-col gap-4 sm:gap-8  lg:px-[50px] mb-2 z-0">
                    <Title title={currentData.title} description={currentData.description} />
                    <FundraisingProgress data={currentData} />
                </div>
            </div>
        </div>
    );
}

export default HeaderCrowdfundingMobile;
