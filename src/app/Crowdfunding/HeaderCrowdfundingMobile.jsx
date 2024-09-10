import React, { useState, useEffect, useRef } from "react";
import FundraisingProgress from './components/Progres';
import Title from './components/Title';
import VideoPlayer from './components/VideoMobile/VideoPlayer';
import Icons from './components/VideoMobile/Icons';
import { images } from './constants/carouselData';
import styles from './style/Header.module.css';

const HeaderCrowdfundingMobile = () => {
    const currentData = images[0];  // Folosim primul element din lista de imagini
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const containerRef = useRef(null);  // Referință pentru componentă

    const handleScreenClick = () => {
        setIsVideoVisible(true); // Afișăm video player-ul
        document.body.classList.add('overflow-hidden'); // Previne scroll-ul în timpul redării video
    };

    const handleClose = () => {
        setIsVideoVisible(false); // Închidem video player-ul
        document.body.classList.remove('overflow-hidden'); // Permitem scroll-ul din nou
        if (document.fullscreenElement) {
            document.exitFullscreen(); // Iesim din modul fullscreen dacă este activ
        }
    };

    return (
        <div ref={containerRef} className={`headerMobile flex flex-col bg-black ${styles.bgMobileHeader}`}>
            {!isVideoVisible && (
                <div 
                    className="relative" 
                    style={{ 
                        width: '100vw',  // Lățimea 100% din containerul părinte
                        aspectRatio: '9 / 16',  // Setează proporția 9:16 pentru a păstra corect raportul
                        overflow: 'hidden', // Ascunde orice conținut care depășește proporția
                        position: 'relative',  // Important pentru poziționarea corectă a butonului
                    }}
                >
                    <div 
                        className={`${styles.bgMobileHeader}`} 
                        style={{ 
                            width: '100vw', 
                            height: '100vh',  // Folosim dynamic viewport height pentru a evita variațiile
                            backgroundImage: `url(${currentData.imageUrl})`, 
                            backgroundSize: 'cover', // Păstrează proporțiile imaginii 
                            backgroundPosition: 'center', // Centrează imaginea
                            backgroundRepeat: 'no-repeat',
                            position: 'relative',  // Necesită pentru poziționarea butonului relativ la această imagine
                        }} 
                    >
                        {/* Conținutul componentei Header */}
                        <div 
                            className={`${styles.headerContent} max-w-screen-lg w-full flex flex-col gap-4 relative z-10 px-5`}
                            style={{
                                fontSize: 'calc(1rem + 0.7vw)',
                                position: 'absolute',
                                left: '0',
                                width: '100%',
                                textAlign: 'center',
                                transform: 'translateY(0)',
                            }}
                        >
                            <Title title={currentData.title} description={currentData.description} />
                            <FundraisingProgress data={currentData} />
                        </div>

                        {/* Gradient aplicat doar pe această componentă */}
                        <div
                            className="-mb-10"
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100vw',
                                top: '50vh', // Începem gradientul de la această înălțime
                                backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0) 100%)',
                                zIndex: 5, // Ridică gradientul deasupra fundalului
                            }}
                        />

                        {/* Buton de Play pentru versiunea mobilă */}
                        <button 
                            onClick={handleScreenClick} 
                            className="absolute flex items-center justify-center z-20 bg-transparent"
                            style={{
                                top: '34.42vh', // Amplasare la 34.42% din înălțimea imaginii de fundal
                                left: '50vw', // Centrează butonul pe orizontală
                                transform: 'translate(-50%, -50%)', // Ajustare pentru centrare pe orizontală și verticală
                            }}
                        >
                            <img src="/imgs/pause.svg" alt="Play Video" className="w-[50px] h-[50px]" />
                        </button>
                    </div>
                </div>
            )}

            {/* Afișare VideoPlayer dacă isVideoVisible este true */}
            {isVideoVisible && (
                <VideoPlayer 
                    videoSrc="https://www.dropbox.com/scl/fi/bqxswhnitds5u6pqcd9wq/Video.mp4?rlkey=v3rni8n6k9xj05ydyxq9f10xk&st=zpz57pts&raw=1"                      
                    onClose={handleClose}
                />
            )}

            {/* Icons pentru controlul sunetului */}
            <Icons handleScreenClick={handleScreenClick} />
        </div>
    );
};

export default HeaderCrowdfundingMobile;