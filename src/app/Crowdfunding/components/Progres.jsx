import React, { useState } from 'react';
import Support from './Support';
import { IoIosArrowForward } from "react-icons/io";
import Modal from '/src/app/components/Header/components/Modal.jsx';
import SupportForm from '/src/app/components/Header/components/Payment/SupportForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const FundraisingProgress = ({ data }) => {
    const progressPercentage = (data.raisedAmount / data.goalAmount) * 100 || 0;
    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div className="text-white ">
            <div className="flex justify-between mb-2 lg:mb-4 w-full lg:w-[346px]">
                <span className="text-2xl font-avenir-roman text-[#FFFFFF]">{data.subtitle}</span>
                <span className="text-xl block mt-1 font-avenir text-[#C1C1C1]">{data.stageLabel} <span className="text-[#FFFFFF]">{data.stageNumber}</span></span>
            </div>
            <div className="relative w-[380px] max-md:w-full">
                <div className="h-1 bg-gray-600 rounded-full w-full lg:w-[346px]">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-[#E50815] via-[#E50815] to-white"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <div
                    className="absolute top-0 -translate-y-1/2 transform mt-[2px]"
                    style={{ left: `${progressPercentage}%` }}
                >
                    <div className={`w-[6px] h-[6px] lg:-ml-1 rounded-full bg-white border-2`}></div>
                </div>
            </div>
            <div className="flex flex-row sm:gap-1 mt-1 lg:mt-3 items-center sm:items-start">
                <span className="font-semibold text-[20px]">${data.raisedAmount} <span className="text-[#C1C1C1] font-ekmukta text-[14px]">raised of ${data.goalAmount} goal</span></span>
                <span className="flex items-center gap-[6px] mt-1 sm:mt-0">
                    <span className="w-[6px] h-[6px] rounded-full bg-[#C1C1C1] mx-1"></span>
                    <span className="font-semibold text-[20px]">{data.supportersCount}</span>
                    <span className="flex items-center text-[#E50815] font-ekMukta text-[14px]">
                        {data.supportersLabel}
                        <IoIosArrowForward className="w-[25px] h-[20px] ml-1 inline-block sm:hidden" />
                    </span>
                </span>
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