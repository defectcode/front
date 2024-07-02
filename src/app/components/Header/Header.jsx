'use client'
import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Support from './components/Support';
import Modal from './components/Modal';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const SupportForm = dynamic(() => import('./components/Payment/SupportForm'), { loading: () => <p>Loading...</p> });

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const backgroundRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && window.innerWidth <= 1024) { // lg size or smaller
        const viewportHeight = window.innerHeight;
        document.documentElement.style.setProperty('--viewport-height', `${viewportHeight}px`);
      } else {
        document.documentElement.style.removeProperty('--viewport-height');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={`relative ${isClient && window.innerWidth <= 1024 ? 'h-[var(--viewport-height)]' : 'h-screen'} w-auto text-white font-ekMukta overflow-hidden`}>
      <div
        ref={backgroundRef}
        className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat max-md:w-auto ${isModalOpen ? 'bg-opacity-50 blur-sm' : ''} md:bg-[url('/imgs/background.svg')] bg-[url('/imgs/mobile.svg')]`}
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <div className={`absolute bottom-0 w-full h-4/6 bg-gradient-to-t from-black/75 via-black/75 to-transparent ${isModalOpen ? 'bg-opacity-50 blur-sm' : ''}`}></div>
      <div className="relative z-10 h-full overflow-auto">
        <Navbar />
        <div className="max-w-screen-2xl mx-auto h-full flex flex-col text-white max-2xl:p-4">
          <div className="flex-grow flex flex-col justify-end max-2xl:p-2">
            <div className={`flex flex-col md:flex-row justify-between max-lg:flex-col max-lg:justify-center`}>
              <div className="flex flex-col items-center md:flex-row gap-3 max-lg:flex-col max-lg:justify-center">
                <div className="md:hidden flex flex-col items-center justify-center mt-8">
                  <Image src="/imgs/logo.svg" alt='logo' className='w-48 h-auto max-md:mb-5' width={128} height={128} loading="lazy" />
                  <h3 className="text-lg max-md:text-sm text-[#C1C1C1] max-md:mb-4 font-avenirRoman">Drama Sci-Fi</h3>
                </div>
                <div className="md:flex md:items-center md:px-2 max-md:mb-4 mb-11 font-avenirHeavy">  {/* Added lg:mb-11 for larger screens */}
                  <Support onClick={openModal} />
                </div>
                <div className="space-y-2 md:flex md:flex-col md:items-start mb-10 max-md:mb-0">
                  <p className="text-xl max-lg:text-lg max-md:text-[14px] max-sm:text-- max-md:leading-5 max-lg:text-center max-md:mb-4 text-[#CDCDCD] mx-2 font-ekMukta tracking-neg-3percent">
                    Într-un oraș ideal fără bani, oamenii se confruntă cu probleme umane reale. Sprijinul tău face posibilă seria.
                  </p>
                  <div className="flex items-center gap-5 text-[#979797] max-lg:flex-col max-lg:space-y-[-10px]">
                    <h3 className="text-lg max-md:text-base hidden md:block ml-2 max-md:ml-0 font-avenirRoman">Drama Sci-Fi 2024</h3>
                    <div className="flex gap-5 max-md:gap-2">
                      <Image src="/imgs/sony.svg" width={64} height={1} alt="sony" className="max-lg:w-12 max-md:w-10 max-sm:w-9 max-md:mt-4" loading="lazy" />
                      <Image src="/imgs/netflix.svg" width={64} height={1} alt="netflix" className="max-lg:w-12 max-md:w-10 max-sm:w-9 max-md:mt-4" loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>
              {/* <Icons /> */}
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
