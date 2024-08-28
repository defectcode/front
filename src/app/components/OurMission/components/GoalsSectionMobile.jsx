import React, { useState } from 'react';
import Support from './Support';
import Modal from '/src/app/components/Header/components/Modal.jsx';
import SupportForm from '/src/app/components/Header/components/Payment/SupportForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { goals } from '../constants/goals';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const GoalsSectionMobile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-black text-white pt-6 px-4 flex flex-col items-center">
            {goals.map((goal) => (
                <div
                    key={goal.id}
                    className="relative w-full max-w-sm mx-auto bg-[#0D0D0D] rounded-lg overflow-hidden mb-5 flex flex-col justify-end"
                    style={{
                        backgroundImage: `url(${goal.Mobile})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '520px',
                    }}
                >
                    <div className="p-5 flex flex-col justify-end h-full">
                        <h3 className="text-sm  text-[#CDCDCD] mb-1">
                            <span style={{ fontFamily: 'Avenir Regular, sans-serif' }}>Goal</span> <span className='font-bold' style={{ fontFamily: 'Avenir Heavy, sans-serif' }}>{goal.id}</span>
                        </h3>
                        <h2 className="text-2xl text-white mb-4 font-ekmukta-extrabold">{goal.title}</h2>
                        <p 
                            className="text-[16px] text-[#FFFFFF] font-ekmukta-extralight mb-6"
                            style={{ fontFamily: 'Ek Mukta, sans-serif', lineHeight: '120%' }}  // Aplicarea line-height
                        >
                            {goal.description}
                        </p>
                        <Support onClick={openModal} />
                    </div>
                </div>
            ))}

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Elements stripe={stripePromise}>
                    <SupportForm />
                </Elements>
            </Modal>
        </div>
    );
}

export default GoalsSectionMobile;
