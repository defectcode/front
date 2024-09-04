import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ videoSrc, onClose }) => {
    const videoRef = useRef(null);

    const isMobile = () => {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    };

    useEffect(() => {
        const handleResize = () => {
            const isLandscape = window.innerWidth > window.innerHeight;
            if (document.fullscreenElement || videoRef.current.webkitDisplayingFullscreen) {
                if (isLandscape) {
                    videoRef.current.style.width = '100vw';
                    videoRef.current.style.height = '100vh';
                } else {
                    videoRef.current.style.width = '100%';
                    videoRef.current.style.height = 'auto';
                }
            }
        };

        const handleFullScreenChange = () => {
            if (!document.fullscreenElement && !videoRef.current.webkitDisplayingFullscreen) {
                // Ieșire din full-screen, revenim la setările inițiale
                videoRef.current.style.width = '100%';
                videoRef.current.style.height = 'auto';
            }
        };

        // Adăugăm event listeners
        window.addEventListener('resize', handleResize);
        document.addEventListener('fullscreenchange', handleFullScreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullScreenChange);

        // Inițializează stilurile video-ului în funcție de dimensiuni
        handleResize();

        return () => {
            // Eliminăm event listeners
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);

            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        };
    }, []);

    const enterFullScreen = () => {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
            videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.webkitEnterFullscreen) {
            // Pentru iOS Safari
            videoRef.current.webkitEnterFullscreen();
        }
    };

    // Intră automat în full-screen când video-ul e gata de redare
    const handleLoadedData = () => {
        if (isMobile()) {
            enterFullScreen();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999]">
            <div className="relative max-w-full max-h-full flex items-center justify-center">
                <video
                    ref={videoRef}
                    src={videoSrc}
                    controls
                    autoPlay
                    playsInline
                    muted
                    onLoadedData={handleLoadedData}  // Adăugat pentru a detecta când video-ul e gata
                    onClick={enterFullScreen}
                    className="max-w-full max-h-full object-contain"
                />
            </div>
        </div>
    );
};

export default VideoPlayer;
