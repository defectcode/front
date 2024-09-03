import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId, onClose, isMuted }) => {
    const playerRef = useRef(null);
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    const onReady = (event) => {
        const player = event.target;
        playerRef.current = player;

        // Mutează playerul pentru a respecta regulile de redare automată
        player.mute();
        // Setează calitatea maximă
        player.setPlaybackQuality('highres');
        // Redă videoclipul imediat după ce este gata
        player.playVideo();

        // Intră în modul full screen după ce videoclipul începe redarea
        const iframe = player.getIframe();
        if (iframe) {
            setTimeout(() => {
                const enterFullScreen = () => {
                    if (iframe.requestFullscreen) {
                        iframe.requestFullscreen().catch(err => {
                            console.log("Error attempting to enable full-screen mode: ", err.message);
                        });
                    } else if (iframe.mozRequestFullScreen) { /* Firefox */
                        iframe.mozRequestFullScreen();
                    } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                        iframe.webkitRequestFullscreen();
                    } else if (iframe.msRequestFullscreen) { /* IE/Edge */
                        iframe.msRequestFullscreen();
                    }
                };
                enterFullScreen();
            }, 100); // Mică întârziere pentru a asigura redarea inițială
        }
    };

    const onEnd = () => {
        // Închide playerul atunci când videoclipul se termină
        onClose();
    };

    useEffect(() => {
        const lockOrientation = () => {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape-primary').catch((error) => console.log(error));
            } else if (window.screen.lockOrientation) {
                window.screen.lockOrientation('landscape-primary');
            } else if (window.screen.mozLockOrientation) {
                window.screen.mozLockOrientation('landscape-primary');
            } else if (window.screen.msLockOrientation) {
                window.screen.msLockOrientation('landscape-primary');
            }
        };

        const unlockOrientation = () => {
            if (screen.orientation && screen.orientation.unlock) {
                screen.orientation.unlock();
            }
        };

        // Blocăm orientarea în peisaj pe dispozitivele mobile la intrarea în full screen
        const handleFullscreenChange = () => {
            if (document.fullscreenElement || document.webkitFullscreenElement) {
                lockOrientation();
            } else {
                onClose();
                unlockOrientation();
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

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
            unlockOrientation();
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-[10000]">
            <button onClick={onClose} className="absolute top-4 right-4 text-white text-3xl">
                &times;
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
                <YouTube
                    videoId={videoId}
                    className="w-full h-full"
                    opts={{
                        playerVars: {
                            autoplay: 1, // Redare automată activată
                            mute: 1, // Mutează playerul pentru a permite redarea automată
                            origin: origin,
                        },
                    }}
                    onReady={onReady}
                    onEnd={onEnd}  // Închide playerul când videoclipul se termină
                />
            </div>
        </div>
    );
};

export default VideoPlayer;
