import React, { useState, useEffect, useRef } from "react";
import FundraisingProgress from './components/Progres';
import Title from './components/Title';
import VideoPlayer from './components/VideoMobile/VideoPlayer';
import Icons from './components/VideoMobile/Icons';
import { images } from './constants/carouselData';
import styles from './style/Header.module.css';

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

    return (
        <div ref={containerRef} className={`headerMobile flex flex-col bg-black ${styles.bgMobileHeader}`}>
            {!isVideoVisible && (
                <div 
                    className="relative" 
                    style={{ 
                        width: '100vw',
                        aspectRatio: '9 / 16',
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    <div 
                        className={`${styles.bgMobileHeader}`} 
                        style={{ 
                            width: '100%', 
                            height: '100%',
                            backgroundImage: `url(${currentData.imageUrl})`, 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            position: 'relative',
                        }} 
                    >
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
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100vw',
                                top: '50vh',
                                backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0) 100%)',
                                zIndex: 5,
                            }}
                        />
                        <button 
                            onClick={handleScreenClick} 
                            className="absolute flex items-center justify-center z-20 bg-transparent"
                            style={{
                                top: '34.42vh',
                                left: '50vw',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <img src="/imgs/pause.svg" alt="Play Video" className="w-[50px] h-[50px]" />
                        </button>
                    </div>
                </div>
            )}

            {isVideoVisible && (
                <VideoPlayer 
                    videoSrc="https://www.dropbox.com/scl/fi/bqxswhnitds5u6pqcd9wq/Video.mp4?rlkey=v3rni8n6k9xj05ydyxq9f10xk&st=zpz57pts&raw=1"                      
                    onClose={handleClose}
                />
            )}

            <Icons handleScreenClick={handleScreenClick} />
        </div>
    );
};

export default HeaderCrowdfundingMobile;
