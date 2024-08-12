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
    let rawProgressPercentage = (raisedAmount / goalAmount) * 100 || 0;

    // Handle percentage display:
    // - Show decimals between 0 and 1%
    // - Round down for values below 1.5%
    // - Round up for values 1.6% and above
    let progressPercentage;
    if (rawProgressPercentage > 0 && rawProgressPercentage < 1) {
        progressPercentage = rawProgressPercentage.toFixed(1);  // Show one decimal place between 0 and 1%
    } else if (rawProgressPercentage >= 1 && rawProgressPercentage < 1.6) {
        progressPercentage = Math.floor(rawProgressPercentage); // Round down for values below 1.6%
    } else {
        progressPercentage = Math.ceil(rawProgressPercentage);  // Round up for 1.6% and above
    }

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
                <span className="text-[20px] lg:text-2xl font-ekmukta font-bold text-[#FFFFFF]">${data.raisedAmount}</span>
                <span className="text-md block font-avenir text-[#C1C1C1]">{data.stageLabel} <span className="text-[#FFFFFF] font-semibold font-ekMukta">{data.stageNumber}</span></span>
            </div>
            <div className="relative w-auto lg:w-[380px]">
                <div className="h-1 bg-[#6F6F6F] rounded-full w-full lg:w-[346px]">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-[#E50815] via-[#E50815] to-white"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <div
                    className="absolute top-0 -translate-y-1/2 transform mt-[2px] ml-[1px] lg:ml-0"
                    style={{ left: `calc(${progressPercentage}% - ${isMobile ? '3px' : '0px'})` }}
                >
                    <div className={`w-[6px] h-[6px] lg:w-[10px] lg:h-[10px] rounded-full bg-white ${isMobile ? '' : '-ml-1'}`}></div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-2 lg:mt-4">
                <div className="flex flex-col">
                    <span className="font-semibold text-[15px] lg:text-[20px]">
                        <span className='font-semibold font-ekMukta text-[15px]'>
                            {progressPercentage}<span className='text-[13px] font-ekMukta'>%</span>&nbsp;
                        </span>
                        <span className="text-[#C1C1C1] font-ekmukta text-[15px]">
                            raised of ${data.goalAmount} goal
                        </span>
                    </span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold font-ekMukta text-[16px] lg:text-[20px] mr-1">
                        {data.supportersCount}
                    </span>
                    <span className="flex items-center text-[#C1C1C1] font-ekMukta text-[15px]">
                        {data.supportersLabel}
                    </span>
                </div>
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
