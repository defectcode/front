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
    const containerRef = useRef(null); // Referință pentru container
    const titleRef = useRef(null); // Referință pentru componenta Title
    const [buttonTop, setButtonTop] = useState(0); // Poziționare inițială

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
        const updateButtonPosition = () => {
            if (containerRef.current && titleRef.current) {
                // Obține poziția începutului site-ului și a componentei Title
                const containerTop = containerRef.current.getBoundingClientRect().top;
                const titleTop = titleRef.current.getBoundingClientRect().top;

                // Calculăm distanța dintre începutul paginii și componenta Title
                const totalHeight = titleTop - containerTop;

                // Setăm butonul la mijlocul acelei distanțe
                setButtonTop(totalHeight / 2);
            }
        };

        updateButtonPosition();
        window.addEventListener('resize', updateButtonPosition);

        return () => {
            window.removeEventListener('resize', updateButtonPosition);
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
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>

            {/* Gradient aplicat deasupra conținutului, ocupă 40% din înălțime */}
            <div
                className={`${styles.gradient} absolute w-full h-[272px] bottom-0 z-20 pointer-events-none`}
                style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 57%, rgba(0, 0, 0, 0) 100%)',
                }}
            ></div>

            {/* Conținutul componentei */}
            <div className={`${styles.contentWrapper} relative z-30 h-full flex flex-col justify-end px-5 pb-5`}>
                {/* Referință la componenta Title */}
                <Title ref={titleRef} title={currentData.title} description={currentData.description} />
                <FundraisingProgress data={currentData} />
            </div>

            {/* Butonul de Play, poziționat dinamic */}
            {!isVideoVisible && (
                <button
                    onClick={handleScreenClick}
                    className={`${styles.playButton} absolute flex items-center justify-center z-40 bg-transparent`}
                    style={{
                        top: `${buttonTop}px`, // Poziție calculată dinamic
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
            <ButonShere />
        </div>
    );
};

export default HeaderCrowdfundingMobile;
