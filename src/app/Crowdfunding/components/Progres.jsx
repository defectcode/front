import React, { useState, useEffect } from 'react';
import Support from './Support';
import Modal from '/src/app/components/Header/components/Modal.jsx';
import SupportForm from '/src/app/components/Header/components/Payment/SupportForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const FundraisingProgress = ({ data }) => {
    const raisedAmount = parseInt(data.raisedAmount.replace(/,/g, ''), 10);
    const goalAmount = parseInt(data.goalAmount.replace(/,/g, ''), 10);
    const progressPercentage = (raisedAmount / goalAmount) * 100 || 0;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="text-white">
            <div className="flex justify-between mb-2 lg:mb-4 w-full lg:w-[346px]">
                <span className="text-[16px] lg:text-2xl font-avenir-roman text-[#FFFFFF]">{data.subtitle}</span>
                <span className="text-md block font-avenir text-[#C1C1C1]">{data.stageLabel} <span className="text-[#FFFFFF] font-extrabold">{data.stageNumber}</span></span>
            </div>
            <div className="relative w-auto lg:w-[380px]">
                <div className="h-1 bg-[#6F6F6F] rounded-full w-full lg:w-[346px] lg:ml-0">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-[#E50815] via-[#E50815] to-white"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <div
                    className="absolute top-0 -translate-y-1/2 transform mt-[2px] ml-[1px] lg:ml-0"  // Ajustăm ml-0 pentru desktop
                    style={{ left: `calc(${progressPercentage}% - ${isMobile ? '3px' : '0px'})` }}  // Ajustăm pentru desktop la 0px
                >
                    <div className={`w-[6px] h-[6px] lg:w-[10px] lg:h-[10px] rounded-full bg-white border-2 shadow-circle ${isMobile ? '' : '-ml-1'}`}></div>
                </div>
            </div>
            <div className="flex flex-row sm:gap-1 mt-1 lg:mt-3 items-center sm:items-start">
                {isMobile  ? 
                <div className="flex flex-row flex-wrap sm:gap-1 mt-1 lg:mt-3 items-center sm:items-start">
                    <span className="font-semibold text-[20px]">${data.raisedAmount} <span className="text-[#C1C1C1] font-ekmukta text-[15px]">raised of ${data.goalAmount} goal</span></span>
                    <span className="w-[6px] h-[6px] rounded-full bg-[#C1C1C1] mx-[6px]"></span>
                    <span className="font-semibold text-[20px] mr-2">{data.supportersCount}</span>
                    <span className="flex items-center text-[#C1C1C1] font-ekMukta text-[15px]">
                        {data.supportersLabel}
                    </span>
                </div>
                : 
                <div className="flex flex-row sm:gap-1 mt-1 lg:mt-3 items-center sm:items-start">
                    <span className="font-semibold text-[20px]">${data.raisedAmount} <span className="text-[#C1C1C1] font-ekmukta text-[14px]">raised of ${data.goalAmount} goal</span></span>
                    <span className="flex items-center gap-[6px] mt-1 sm:mt-0">
                        <span className="w-[6px] h-[6px] rounded-full bg-[#C1C1C1] mx-1"></span>
                        <span className="font-semibold text-[20px]">{data.supportersCount}</span>
                        <span className="flex items-center text-[#C1C1C1] font-ekMukta font-semibold text-[14px]">
                            {data.supportersLabel}
                    </span>
                    </span>
                </div>

                }
            </div>
            <div className="hidden md:block mt-2 lg:mt-5">
                <Support onClick={openModal}/>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Elements stripe={stripePromise}>
                    <SupportForm />
                </Elements>
            </Modal>
        </div>
    );
}

export default FundraisingProgress;
