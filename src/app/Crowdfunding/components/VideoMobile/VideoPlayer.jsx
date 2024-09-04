import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ videoSrc, onClose, isMuted, autoPlay }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        
        if (autoPlay) {
            video.play();
        }

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                onClose();
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, [onClose, autoPlay]);

    const handlePlayAndFullscreen = () => {
        const video = videoRef.current;
        video.muted = isMuted;
        video.play();

        if (video.requestFullscreen) {
            video.requestFullscreen().catch((error) => console.log(error));
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen().catch((error) => console.log(error));
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen().catch((error) => console.log(error));
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen().catch((error) => console.log(error));
        }
    };

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black z-[10000]"
            onClick={handlePlayAndFullscreen}
            style={{ width: '100vw', height: '100vh' }}
        >
            <button 
                onClick={(e) => { e.stopPropagation(); onClose(); }} 
                className="absolute top-4 right-4 text-white text-3xl z-[10001]"
            >
                &times;
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
                <video
                    ref={videoRef}
                    src={videoSrc}
                    className="absolute inset-0 w-full h-full"
                    controls
                    playsInline
                    style={{ objectFit: 'cover' }}
                />
            </div>
        </div>
    );
};

export default VideoPlayer;
