import React, { useState, useEffect } from "react";
import FundraisingProgress from './components/Progres';
import Title from "./components/Title";
import VideoPlayer from './components/VideoMobile/VideoPlayer';
import Icons from './components/VideoMobile/Icons';
import { images } from './constants/carouselData';
import styles from './style/Header.module.css';
import useDeviceType from './components/hooks/useDeviceType';
import NavBarCrowdfundingMobile from './components/mobile/NavBarCrowdfundingMobile';
import NavBarCrowdfunding from './components/NavBarCrowdfunding';

const HeaderCrowdfundingMobile = () => {
    const currentData = images[0];
    const isMobile = useDeviceType();
    const [activeSection, setActiveSection] = useState('overview');
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [style, setStyle] = useState({
        marginTop: '-7vh',
        paddingBottom: '7vh',
    });

    useEffect(() => {
        if (window.location.hash) {
            setActiveSection(window.location.hash.substring(1));
        }

        const handleHashChange = () => {
            setActiveSection(window.location.hash.substring(1));
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    useEffect(() => {
        const updateStyle = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth > 410) {
                setStyle({
                    marginTop: '-4vh',
                    paddingBottom: '4vh',
                });
            } else {
                setStyle({
                    marginTop: '-8vh',
                    paddingBottom: '8vh',
                });
            }
        };

        updateStyle(); // Initialize on mount
        window.addEventListener('resize', updateStyle);

        return () => {
            window.removeEventListener('resize', updateStyle);
        };
    }, []);

    const handleScreenClick = () => {
        setIsVideoVisible(true);
        setIsMuted(true); // Mutăm inițial pentru a permite autoplay
        document.body.classList.add('overflow-hidden'); // Previne scroll-ul în timpul redării video
    };

    const handleClose = () => {
        setIsVideoVisible(false);
        document.body.classList.remove('overflow-hidden');
    };

    return (
        <div className={`headerMobile flex flex-col bg-black ${styles.headerCrowdfunding}`}>
            <div 
                className="relative" 
                style={{ 
                    height: 'calc(100vh - 15vh)', 
                    minHeight: '0',
                }}
            >
                <div className={`${styles.bgMobile}`} style={{ height: '100%', overflow: 'hidden' }}>
                    <div
                        style={{
                            height: '100%',
                            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 25%), url(${currentData.imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            WebkitBackgroundClip: 'padding-box',
                            backgroundClip: 'padding-box',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        {/* Buton de Play pentru versiunea mobilă */}
                        <button 
                            onClick={handleScreenClick} 
                            className="absolute inset-0 flex items-center justify-center z-20 bg-transparent"
                        >
                            <img src="/imgs/pause.svg" alt="Play Video" className="w-[50px] h-[50px]" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Afișare VideoPlayer dacă isVideoVisible este true */}
            {isVideoVisible && (
                <VideoPlayer 
                    videoSrc="/video/IMG_1003.mp4"  // Înlocuiește cu calea către video-ul tău
                    onClose={handleClose}
                    isMuted={isMuted}
                    autoPlay={true} // Forțăm autoplay când este vizibil
                />
            )}

            {/* Container pentru conținut și fundal blur */}
            <div 
                className="bg-black flex flex-col justify-start px-5 relative" 
                style={{ 
                    height: '20vh', 
                    minHeight: '0', 
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        filter: 'blur(40px)',
                        WebkitFilter: 'blur(40px)',
                        zIndex: 1,
                        background: 'linear-gradient(to top left, rgba(40, 40, 40, 0.4), rgba(0, 0, 0, 0))',
                        backgroundRepeat: 'no-repeat',
                        pointerEvents: 'none',
                    }}
                ></div>

                <div 
                    className="max-w-screen-lg w-full flex flex-col gap-4 mb-2 relative z-10"
                    style={{
                        ...style,
                        fontSize: 'calc(1rem + 0.7vw)',
                    }}
                >
                    <Title title={currentData.title} description={currentData.description} />
                    <FundraisingProgress data={currentData} />
                </div>
            </div>

            {/* Icons pentru controlul sunetului */}
            <Icons 
                isMuted={isMuted} 
                setIsMuted={setIsMuted} 
                handleScreenClick={handleScreenClick}
            />

            {/* NavBar pentru mobil sau desktop */}
            <div className="my-6">
                {isMobile ? <NavBarCrowdfundingMobile setActiveSection={setActiveSection} /> : <NavBarCrowdfunding setActiveSection={setActiveSection} />}
            </div>
        </div>
    );
};

export default HeaderCrowdfundingMobile;
