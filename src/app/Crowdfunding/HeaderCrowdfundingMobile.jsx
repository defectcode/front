import React, { useState, useEffect, useRef } from "react";
import FundraisingProgress from './components/Progres';
import Title from './components/Title';
import VideoPlayer from './components/VideoMobile/VideoPlayer';
import Icons from './components/VideoMobile/Icons';
import { images } from './constants/carouselData';
import styles from './style/Header.module.css';  // Importăm stilurile din modulul CSS
import ButonShere from '../../app/Crowdfunding/components/mobile/ButonShere';



const HeaderCrowdfundingMobile = () => {
    const currentData = images[0];
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const containerRef = useRef(null);

    const handleScreenClick = () => {
        setIsVideoVisible(true);
        document.body.classList.add('overflow-hidden');
    };

    const handleClose = () => {
        setIsVideoVisible(false);
        document.body.classList.remove('overflow-hidden');
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const updateHeight = () => {
            const viewportHeight = window.innerHeight;
            document.documentElement.style.setProperty('--viewport-height', `${viewportHeight}px`);
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`${styles.header} relative w-auto text-white font-ekMukta overflow-hidden`}
        >
            {/* Fundalul absolut, ocupă întregul ecran */}
            <div
                className={`absolute inset-0 w-full h-full bg-center bg-white bg-no-repeat max-md:w-auto ${isVideoVisible ? 'bg-opacity-50 blur-sm' : ''}`}
                style={{
                    backgroundImage: `url('/imgs/Crowdfunding/Header.webp')`,
                    backgroundSize: 'cover',  // Asigură că imaginea acoperă tot ecranul, fără margini goale
                    backgroundPosition: 'center',  // Imaginea este centrată
                    // aspectRatio: '9 / 16'
                }}
            ></div>
            {/* Gradient aplicat deasupra conținutului, ocupă 40% din înălțime */}
            <div
                className={`${styles.gradient} absolute w-full h-[272px] bottom-0 z-20 pointer-events-none`}
                style={{
                    // background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))',
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 57%, rgba(0, 0, 0, 0) 100%'

                }}
            ></div>

            {/* Conținutul componentei */}
            <div className={`${styles.contentWrapper} relative z-30 h-full flex flex-col justify-end px-5 pb-5`}>
                <Title title={currentData.title} description={currentData.description} />
                <FundraisingProgress data={currentData} />
            </div>

            {/* Butonul de Play */}
            {!isVideoVisible && (
                <button
                    onClick={handleScreenClick}
                    className={`${styles.playButton} absolute flex items-center justify-center z-40 bg-transparent`}
                    style={{
                        top: '34.42%', 
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <img src="/imgs/pause.svg" alt="Play Video" className="w-[50px] h-[50px]" />
                </button>
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
            <ButonShere/>
        </div>
    );
};

export default HeaderCrowdfundingMobile;
