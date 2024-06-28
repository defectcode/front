'use client'
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Support from './components/Support';
import Icons from './components/Icons';
import Modal from './components/Modal';
import SupportForm from './components/Payment/SupportForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Header() {
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 3000); 
    
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
        return "/video/mobile.MP4";
      } else {
        return "/video/video.MP4";
      }
    }
    return "";
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative h-screen text-white">
      {showVideo ? (
        <div className={`absolute inset-0 w-full h-full ${isModalOpen ? 'bg-opacity-50 blur-sm' : ''}`}>
          <video ref={videoRef} autoPlay muted={isMuted} loop playsInline className="w-full h-full object-cover">
            <source src={getVideoSource()} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div
          className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat ${isModalOpen ? 'bg-opacity-50 blur-sm' : ''} md:bg-[url('/imgs/background.svg')] bg-[url('/imgs/mobile.svg')]`}
        ></div>
      )}
      <div className={`absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent ${isModalOpen ? 'bg-opacity-50 blur-sm' : ''}`}></div>
      <div className="relative z-10 h-full">
        <Navbar />
        <div className="max-w-screen-2xl mx-auto h-full flex flex-col text-white max-2xl:p-4">
          <div className="flex-grow flex flex-col justify-end max-2xl:p-2">
            <div className="flex justify-between mb-10 max-lg:flex-col max-lg:justify-center">
              <div className="flex gap-3 items-center max-lg:flex-col max-lg:justify-center">
                <Support onClick={openModal} />
                <div className="space-y-2">
                  <p className="text-xl max-lg:text-lg max-md:text-sm max-lg:text-center">
                    Într-un oraș ideal fără bani, oamenii luptă cu probleme reale umane. Sprijinul tău face posibilă seria.
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Elements stripe={stripePromise}>
          <SupportForm />
        </Elements>
      </Modal>
    </div>
  );
}
