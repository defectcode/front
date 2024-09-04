import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId, onClose, isMuted, autoPlay }) => {
    const playerRef = useRef(null);
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    const setQualityToHigh = (player) => {
        player.setPlaybackQuality('highres');
    };

    const handlePlayAndFullscreen = (player) => {
        if (player) {
            player.mute(); // Mute inițial pentru a permite autoplay pe iOS
            player.playVideo(); // Redare automată

            // Intră în full-screen după ce playerul este gata
            const iframe = player.getIframe();
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen().catch((error) => console.log(error));
            } else if (iframe.webkitRequestFullscreen) {
                iframe.webkitRequestFullscreen().catch((error) => console.log(error)); // Suport pentru Safari
            } else if (iframe.mozRequestFullScreen) {
                iframe.mozRequestFullScreen().catch((error) => console.log(error)); // Suport pentru Firefox
            } else if (iframe.msRequestFullscreen) {
                iframe.msRequestFullscreen().catch((error) => console.log(error)); // Suport pentru IE/Edge
            }
        }
    };

    const onReady = (event) => {
        const player = event.target;
        playerRef.current = player;

        // Setează calitatea maximă disponibilă
        setQualityToHigh(player);

        // Forțează calitatea înaltă la intervale de 2 secunde
        const intervalId = setInterval(() => {
            setQualityToHigh(player);
        }, 2000);

        playerRef.current = { ...playerRef.current, intervalId };

        if (autoPlay) {
            handlePlayAndFullscreen(player); // Declanșează redarea și full-screen imediat după ce playerul este gata
        }
    };

    const onStateChange = (event) => {
        const player = event.target;

        if (event.data === 1) { // Videoclipul începe să fie redat
            setQualityToHigh(player);

            // Dezactivează mute dacă nu este mut
            if (!isMuted) {
                player.unMute();
            }
        }
    };

    const onEnd = () => {
        clearInterval(playerRef.current.intervalId);
        onClose();
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                onClose();
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
            clearInterval(playerRef.current?.intervalId);
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black z-[10000]"
            onClick={() => handlePlayAndFullscreen(playerRef.current)} // Asigură că fullscreen este declanșat la clic
            style={{ width: '100vw', height: '100vh' }} // Asigură că ocupă tot ecranul
        >
            <button 
                onClick={(e) => { e.stopPropagation(); onClose(); }} 
                className="absolute top-4 right-4 text-white text-3xl z-[10001]"
                style={{ zIndex: 10001 }}
            >
                &times;
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
                <YouTube
                    videoId={videoId}
                    className="absolute inset-0 w-full h-full" // Asigură că ocupă tot ecranul
                    opts={{
                        playerVars: {
                            autoplay: 1, // Setează autoplay pe baza propului
                            mute: 1, // Mut inițial pentru compatibilitate cu iOS
                            playsinline: 0, // Forțează full-screen pe iOS
                            origin: origin,
                            vq: 'highres',
                        },
                    }}
                    onReady={onReady}
                    onStateChange={onStateChange}
                    onEnd={onEnd}
                    allow="autoplay; encrypted-media; fullscreen"
                />
            </div>
        </div>
    );
};

export default VideoPlayer;
