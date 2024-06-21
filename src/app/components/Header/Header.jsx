'use client'
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Button from './components/Button';
import Icons from './components/Icons';

export default function Header() {
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const getVideoSource = () => {
    if (typeof window !== 'undefined') {
      if (window.matchMedia("(max-width: 768px)").matches) {
        // Sursa video pentru telefoane
        return "/video/mobile.MP4";
      } else {
        // Sursa video pentru laptopuri și tablete
        return "/video/video.MP4";
      }
    }
    return "";
  };

  return (
    <div className="relative h-screen text-white">
      {showVideo ? (
        <div className="absolute inset-0 w-full h-full">
          <video ref={videoRef} autoPlay muted={isMuted} loop playsInline className="w-full h-full object-cover">
            <source src={getVideoSource()} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/imgs/background.svg')` }}
        ></div>
      )}
      <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent"></div>
      <div className="relative z-10 h-full">
        <Navbar />
        <div className="max-w-screen-2xl mx-auto h-full flex flex-col text-white max-2xl:p-4">
          <div className="flex-grow flex flex-col justify-end max-2xl:p-2">
            <div className="flex justify-between mb-10 max-lg:flex-col max-lg:justify-center">
              <div className="flex gap-3 items-center max-lg:flex-col max-lg:justify-center">
                <Button />
                <div className="space-y-2">
                  <p className="text-xl max-lg:text-lg max-md:text-sm max-lg:text-center">
                    In an ideal city without money, people fight real human problems. Your support makes the series possible.
                  </p>
                  <div className="flex items-center gap-4 text-[#979797] max-lg:flex-col max-lg:space-y-[-10px]">
                    <h3 className="text-lg max-md:text-base">Drama Sci-Fi 2024</h3>
                    <div className="flex gap-2">
                      <Image src="/imgs/sony.svg" width={64} height={1} alt="sony" className="max-lg:w-14" />
                      <Image src="/imgs/netflix.svg" width={64} height={1} alt="netflix" className="max-lg:w-14" />
                    </div>
                  </div>
                </div>
              </div>
              <Icons isMuted={isMuted} toggleMute={toggleMute} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
