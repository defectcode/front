import React, { useState, useEffect } from "react";
import FundraisingProgress from './components/Progres';
import Title from "./components/Title";
import { images } from './constants/carouselData';
import styles from './style/Header.module.css';
import { useViewport } from '../Crowdfunding/components/hooks/useViewport'; 

const HeaderCrowdfundingMobile = () => {
    const currentData = images[0];
    const [isFirstVisit, setIsFirstVisit] = useState(true);
    const { height: viewportHeight, width: viewportWidth } = useViewport(); 

    useEffect(() => {
        setIsFirstVisit(false);
    }, []); // Se va rula doar la prima montare a componentei

    // Înălțimea imaginii și fundalului bazată pe dimensiunile ecranului și breakpoints pentru telefoane
    const imageHeight = isFirstVisit 
        ? (viewportWidth <= 500
            ? `min(${viewportHeight * 0.6}px, 65vh)` // Telefoane mici
            : viewportWidth < 768
                ? `min(${viewportHeight * 0.7}px, 75vh)` // Telefoane medii
                : `min(${viewportHeight * 0.75}px, 85vh)`) // Telefoane mari
        : (viewportWidth <= 380 ? '63vh' : (viewportWidth <= 440 && viewportWidth >= 416 ? '70' : '65'));

    const bgHeight = isFirstVisit 
        ? (viewportWidth <= 500
            ? `min(${viewportHeight * 0.3}px, 35vh)` 
            : viewportWidth < 768
                ? `min(${viewportHeight * 0.3}px, 25vh)` 
                : `min(${viewportHeight * 0.25}px, 15vh)`)
        : (viewportWidth <= 380 ? '25vh' : (viewportWidth <= 430 && viewportWidth >= 416 ? '30' : '35')) ;

    return (
        <div className={`header flex flex-col bg-black ${styles.headerCrowdfunding}`}>
            <div className="relative" style={{ height: imageHeight }}>
                <div className={`${styles.bgMobile}`} style={{ height: '100%' }}>
                    <div
                        style={{
                            height: '100%',
                            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 20%), url(${currentData.imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            WebkitBackgroundClip: 'padding-box',
                            backgroundClip: 'padding-box',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>
                </div>
            </div>

            <div className="flex-grow bg-black flex flex-col justify-start px-5 relative" style={{ height: bgHeight }}>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        filter: 'blur(40px)',
                        WebkitFilter: 'blur(40px)',  // Prefix pentru Safari
                        zIndex: 1,
                        background: 'linear-gradient(to top left, rgba(40, 40, 40, 0.4), rgba(0, 0, 0, 0))',
                        backgroundRepeat: 'no-repeat',
                    }}
                ></div>

                <div className="max-w-screen-lg w-full flex flex-col gap-4 mb-2 relative z-10"
                    style={{
                        marginTop: '-7vh',
                        paddingBottom: '7vh',
                        fontSize: viewportWidth < 360 ? 'calc(0.8rem + 0.5vw)' : 'calc(1rem + 0.5vw)', // Font size adjusts based on screen size
                    }}
                >
                    <Title title={currentData.title} description={currentData.description} />
                    <FundraisingProgress data={currentData} />
                </div>
            </div>
        </div>
    );
};

export default HeaderCrowdfundingMobile;
