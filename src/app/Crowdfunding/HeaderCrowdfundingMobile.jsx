import React, { useState, useEffect } from "react";
import FundraisingProgress from './components/Progres';
import Title from "./components/Title";
import { images } from './constants/carouselData';
import styles from './style/Header.module.css';

const HeaderCrowdfundingMobile = () => {
    const currentData = images[0];
    const [isFirstVisit, setIsFirstVisit] = useState(true);
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setViewportHeight(window.innerHeight);
            setViewportWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setIsFirstVisit(false);
    }, []); // Se va rula doar la prima montare a componentei

    const imageHeight = isFirstVisit ? `min(${viewportHeight * 0.7}px, 70vh)` : '60vh'; 
    const bgHeight = isFirstVisit ? `min(${viewportHeight * 0.3}px, 30vh)` : '40vh';

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
                        zIndex: 1,
                        background: 'linear-gradient(to top left, rgba(40, 40, 40, 0.4), rgba(0, 0, 0, 0))',
                        WebkitFilter: 'blur(40px)',  
                    }}
                ></div>

                <div className="max-w-screen-lg w-full flex flex-col gap-4 sm:gap-8 lg:px-[50px] mb-2 relative z-10"
                    style={{
                        marginTop: '-5vh',
                        paddingBottom: '5vh',
                        fontSize: 'calc(1rem + 0.5vw)', 
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
