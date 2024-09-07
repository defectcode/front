'use client'
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Support from './components/Support';
import Modal from './components/Modal';
import SupportForm from './components/Payment/SupportForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSupportInNavbar, setShowSupportInNavbar] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowSupportInNavbar(true);
      } else {
        setShowSupportInNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="header relative w-auto text-white font-ekMukta overflow-hidden">
      <div
        ref={headerRef}
        className={`bg-image ${isModalOpen ? 'bg-opacity-50 blur-sm' : ''}`}
      ></div>
      <div className={`absolute bottom-0 w-full h-3/6 bg-gradient-to-t from-black/70 via-black/70 to-transparent ${isModalOpen ? 'bg-opacity-50 blur-sm' : ''}`}></div>
      <div className={`relative z-10 h-full overflow-auto ${isModalOpen ? 'blur-sm' : ''}`}>
        <Navbar openModal={openModal} />
        <div className="max-w-[1200px] w-auto mx-auto h-full flex flex-col text-white max-2xl:p-4 max-md:p-0">
          <div className="flex-grow flex flex-col justify-end header-content max-md:p-0">
            <div className="content-wrapper">
              <div className={`flex flex-col md:flex-row justify-between max-lg:flex-col max-lg:justify-center customStyles`}>
                <div className="flex flex-col mb-10 max-md:mb-0 items-center md:flex-row gap-3 max-md:gap-0 max-lg:flex-col max-lg:justify-center">
                  <div className="md:hidden flex flex-col items-center justify-center mt-8">
                    <Image src="/imgs/Plogo.svg" alt='logo' className='w-[188px] h-[44px] max-md:mb-4' width={188} height={1} />
                    <h3 className="text-lg max-md:text-[14px] text-[#979797] font-avenir-roman max-md:mb-4">
                      Drama <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#979797', borderRadius: '50%', margin: '0 5px', verticalAlign: 'middle' }}></span> Sci-Fi
                    </h3>
                  </div>
                  <div className="desktop-support-button md:flex md:items-center md:px-2 max-md:mb-4 font-avenirHeavy max-md:hidden">
                    <Support onClick={openModal} />
                  </div>
                  <div className="md:flex md:flex-col md:items-start">
                    <p className="text-[16px] max-lg:text-lg max-md:text-[15px] max-[390px]:text-[14px] max-md:leading-5 max-lg:text-start max-md:text-center max-md:mb-4 text-[#CDCDCD] mx-0 max-md:mx-2 font-ekMukta tracking-neg-3percent">
                      In an ideal city without money, people face real human problems. Your support makes the series possible.
                    </p>
                    <div className="mobile-support-button md:hidden flex justify-center max-md:mb-4">
                      <Support onClick={openModal} />
                    </div>
                    <div className="flex items-center gap-5 max-lg:gap-1 text-[#979797] max-lg:flex-col max-md:space-y-0 max-md:mb-4">
                      <h3 className="text-lg max-md:text-base hidden md:block font-avenir-roman">Drama • Sci-Fi • 2024</h3>
                      <div className="flex gap-4 max-md:gap-1 max-lg:mr-16 max-md:mr-0">
                        <Image src="/imgs/sony.svg" width={64} height={1} alt="sony" className="w-[46px] h-auto max-md:w-10 max-sm:w-[30px] max-sm:h-[7px]" />
                        <Image src="/imgs/netflix.svg" width={64} height={1} alt="netflix" className="w-[46px] h-auto max-md:w-10 max-sm:w-[30px] max-sm:h-[7px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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