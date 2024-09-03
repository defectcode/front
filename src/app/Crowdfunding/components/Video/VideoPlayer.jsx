// VideoPlayer.jsx
import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId, onClose, isMuted }) => {
    const playerRef = useRef(null);

    const onReady = (event) => {
        const player = event.target;
        playerRef.current = player;

        const iframe = player.getIframe();
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen().catch(err => {
                console.log("Error attempting to enable full-screen mode: ", err.message);
            });
        } else if (iframe.mozRequestFullScreen) {
            iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }

        player.playVideo();
    };

    const onStateChange = (event) => {
        const playerState = event.data;
        if (playerState === YouTube.PlayerState.ENDED) {
            onClose(); // Închide fereastra când videoclipul se termină
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        };
    }, [onClose]);

    const handleToggleMute = () => {
        if (playerRef.current) {
            const player = playerRef.current;
            if (player.isMuted()) {
                player.unMute();
            } else {
                player.mute();
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
            <button onClick={onClose} className="absolute top-4 right-4 text-white text-3xl">
                &times;
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
                <YouTube
                    videoId={videoId}
                    className="w-full h-full"
                    opts={{
                        playerVars: {
                            autoplay: 1,
                            mute: isMuted ? 1 : 0,
                        },
                    }}
                    onReady={onReady}
                    onStateChange={onStateChange}  // Adăugăm evenimentul onStateChange
                />
            </div>
            <button onClick={handleToggleMute} className="absolute bottom-4 left-4 text-white">
                {isMuted ? 'Unmute' : 'Mute'}
            </button>
        </div>
    );
};

export default VideoPlayer;
