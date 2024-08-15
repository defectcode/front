import React, { useState, useEffect } from "react";
import FundraisingProgress from './components/Progres';
import Title from "./components/Title";
import { images } from './constants/carouselData';
import styles from './style/Header.module.css';
import { useViewport } from '../Crowdfunding/components/hooks/useViewport';  // Importăm hook-ul personalizat

const HeaderCrowdfundingMobile = () => {
    const currentData = images[0];
    const [isFirstVisit, setIsFirstVisit] = useState(true);
    const { height: viewportHeight, width: viewportWidth } = useViewport(); // Folosim hook-ul pentru dimensiunile ecranului

    useEffect(() => {
        setIsFirstVisit(false);
    }, []); // Se va rula doar la prima montare a componentei

    // Înălțimea imaginii și fundalului bazată pe dimensiunile ecranului și breakpoints pentru telefoane
    const imageHeight = isFirstVisit 
        ? viewportWidth < 360
            ? `min(${viewportHeight * 0.6}px, 80vh)` // Telefoane mici
            : viewportWidth < 768
                ? `min(${viewportHeight * 0.7}px, 80vh)` // Telefoane medii
                : `min(${viewportHeight * 0.75}px, 85vh)` // Telefoane mari
        : '60vh';

    const bgHeight = isFirstVisit 
        ? viewportWidth < 360
            ? `min(${viewportHeight * 0.4}px, 20vh)` 
            : viewportWidth < 768
                ? `min(${viewportHeight * 0.3}px, 20vh)` 
                : `min(${viewportHeight * 0.25}px, 15vh)`
        : '40vh';

    return (
        <div className={`header flex flex-col bg-black ${styles.headerCrowdfunding}`}>
            <div className="relative" style={{ height: imageHeight }}>
                <div className={`${styles.bgMobile}`} style={{ height: '100%' }}>
                    <div
                        style={{
                            height: '100%',
                            backgroundImage: `-webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0))), url(${currentData.imageUrl})`,
                            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 20%), url(${currentData.imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            WebkitBackgroundClip: 'padding-box',
                            backgroundClip: 'padding-box',
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
                        background: '-webkit-gradient(linear, left top, right bottom, color-stop(0.4, rgba(40, 40, 40, 0.4)), color-stop(1, rgba(0, 0, 0, 0)))',
                        background: 'linear-gradient(to top left, rgba(40, 40, 40, 0.4), rgba(0, 0, 0, 0))',
                    }}
                ></div>

                <div className="max-w-screen-lg w-full flex flex-col gap-4 mb-2 relative z-10"
                    style={{
                        marginTop: '-5vh',
                        paddingBottom: '5vh',
                        fontSize: viewportWidth < 360 ? 'calc(0.5rem + 0.5vw)' : 'calc(0.6rem + 0.5vw)', // Font size adjusts based on screen size
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
