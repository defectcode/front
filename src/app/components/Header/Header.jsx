'use client'
import React, { useEffect, useState } from 'react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative h-screen w-auto text-white">
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat max-md:w-auto ${isModalOpen ? 'bg-opacity-50 blur-sm' : ''} md:bg-[url('/imgs/background.svg')] bg-[url('/imgs/mobile.svg')]`}
      ></div>
      <div className={`absolute bottom-0 w-full h-4/6 bg-gradient-to-t from-black/60 via-black/60 to-transparent ${isModalOpen ? 'bg-opacity-50 blur-sm' : ''}`}></div>
      <div className="relative z-10 h-full">
        <Navbar />
        <div className="max-w-screen-2xl mx-auto h-full flex flex-col text-white max-2xl:p-4">
          <div className="flex-grow flex flex-col justify-end max-2xl:p-2">
            <div className="flex flex-col md:flex-row justify-between mb-10 max-lg:flex-col max-lg:justify-center">
              <div className="flex flex-col items-center md:flex-row gap-3 max-lg:flex-col max-lg:justify-center max-md:-mb-12">
                <div className="md:hidden flex flex-col items-center justify-center mt-8">
                  <Image src="/imgs/logo.svg" alt='logo' className='w-48 h-auto mb-3' width={128} height={128} />
                  <h3 className="text-lg max-md:text-sm text-[#C1C1C1] max-md:mb-1">Drama Sci-Fi</h3>
                </div>
                <div className="md:flex md:items-center md:px-2 max-md:mb-3">
                  <Support onClick={openModal} />
                </div>
                <div className="space-y-2 md:flex md:flex-col md:items-start">
                  <p className="text-xl max-lg:text-lg max-md:text-[12px] max-md:leading-5 max-lg:text-center max-md:mb-3 text-white">
                    In an ideal city without money, people fight real human problems. Your support makes the series possible.
                  </p>
                  <div className="flex items-center gap-5 text-[#979797] max-lg:flex-col max-lg:space-y-[-10px]">
                    <h3 className="text-lg max-md:text-base hidden md:block">Drama Sci-Fi 2024</h3>
                    <div className="flex gap-5 max-md:gap-2">
                      <Image src="/imgs/sony.svg" width={64} height={1} alt="sony" className="max-lg:w-12 max-md:w-10 max-sm:w-8 max-md:mt-4" />
                      <Image src="/imgs/netflix.svg" width={64} height={1} alt="netflix" className="max-lg:w-12 max-md:w-10 max-sm:w-8 max-md:mt-4" />
                    </div>
                  </div>
                </div>
              </div>
              <Icons />
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
