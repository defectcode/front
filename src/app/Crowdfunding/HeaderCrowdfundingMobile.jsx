import React, { useState, useEffect, useRef } from "react";
import FundraisingProgress from './components/Progres';
import Title from './components/Title';
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
    const [gradientStart, setGradientStart] = useState(0);
    const containerRef = useRef(null);  // Referință pentru componentă

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
        // Măsoară înălțimea componentei și calculează 61.76%
        if (containerRef.current) {
            const height = containerRef.current.offsetHeight;
            const startGradient = height * 0.6176; // Calculează 61.76% din înălțime
            setGradientStart(startGradient);
        }
    }, [containerRef]);

    const handleScreenClick = () => {
        setIsVideoVisible(true);
        document.body.classList.add('overflow-hidden'); // Previne scroll-ul în timpul redării video
    };

    const handleClose = () => {
        setIsVideoVisible(false);
        document.body.classList.remove('overflow-hidden');
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    };

    return (
        <div ref={containerRef} className={`headerMobile flex flex-col bg-black ${styles.bgMobileHeader} ${isVideoVisible ? 'hidden' : ''}`}>
            <div 
                className="relative" 
                style={{ 
                    width: '100%',  // Lățimea 100% din containerul părinte
                    aspectRatio: '9 / 16',  // Setează proporția 9:16 pentru a păstra corect raportul
                    overflow: 'hidden', // Ascunde orice conținut care depășește proporția
                    position: 'relative'  // Important pentru poziționarea corectă a butonului
                }}
            >
                <div 
                    className={`${styles.bgMobileHeader}`} 
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        backgroundImage: `url(${currentData.imageUrl})`, 
                        backgroundSize: 'cover', // Păstrează proporțiile imaginii 
                        backgroundPosition: 'center', // Centrează imaginea
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',  // Necesită pentru poziționarea butonului relativ la această imagine
                    }} 
                >
                    <div 
                        className="max-w-screen-lg w-full flex flex-col gap-4 mb-10 relative z-10 px-5"
                        style={{
                            fontSize: 'calc(1rem + 0.7vw)',
                            // top: '69%', // Poziționare la 69% de la începutul componentei
                            top: `calc(69% + 20px)`, // Poziționează la 40px de jos, 70px fiind aproximativ înălțimea conținutului

                            transform: 'translateY(0)' // Eliminăm orice transformări suplimentare
                        }}
                    >
                        <Title title={currentData.title} description={currentData.description} />
                        <FundraisingProgress data={currentData} />
                    </div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        top: `${gradientStart}px`,  // Gradientul începe după 61.76% din înălțimea componentei
                        backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)',
                    }}
                />
                {/* Buton de Play pentru versiunea mobilă */}
                <button 
                    onClick={handleScreenClick} 
                    className="absolute flex items-center justify-center z-20 bg-transparent"
                    style={{
                        top: '34.42%', // Amplasare la 34.42% din înălțimea imaginii de fundal
                        left: '50%', // Centrează butonul pe orizontală
                        transform: 'translate(-50%, -50%)', // Ajustare pentru centrare pe orizontală și verticală
                    }}
                >
                    <img src="/imgs/pause.svg" alt="Play Video" className="w-[50px] h-[50px]" />
                </button>

                </div>
            </div>

            {/* Afișare VideoPlayer dacă isVideoVisible este true */}
            {isVideoVisible && (
                <VideoPlayer 
                    videoSrc="https://www.dropbox.com/scl/fi/bqxswhnitds5u6pqcd9wq/Video.mp4?rlkey=v3rni8n6k9xj05ydyxq9f10xk&st=zpz57pts&raw=1"                      
                    onClose={handleClose}
                />
            )}

            {/* Container pentru conținut și fundal blur */}
            <div 
                className="bg-black flex flex-col justify-start px-5 relative" 
                style={{ 
                    height: '0px', 
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
                
            </div>

            {/* Icons pentru controlul sunetului */}
            <Icons handleScreenClick={handleScreenClick} />
        </div>
    );
};

export default HeaderCrowdfundingMobile;
