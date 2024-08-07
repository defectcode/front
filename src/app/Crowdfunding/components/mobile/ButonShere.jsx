import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Support from '../../components/Support';
import { RiShare2Line } from "react-icons/ri";
import Modal from '/src/app/components/Header/components/Modal.jsx';
import SupportForm from '/src/app/components/Header/components/Payment/SupportForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const ButonShere = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const linkClasses = (path) => `px-3 py-1 border-2 rounded-xl font-ekmukta ${router.pathname === path ? 'bg-white text-black border-white' : 'bg-[#272727] text-[#F1F1F1] border-transparent '}`;

    return (
        <div className="fixed bottom-0 left-0 right-0 lg:static flex items-center justify-between px-5 w-full h-[60px] bg-[#1B1B1B] lg:hidden z-50">
            <div className="flex items-center justify-between w-full space-x-4">
                <div className="flex items-center h-full">
                    <Support onClick={openModal} />
                </div>
                <button className="flex items-center gap-2 text-white border border-white px-6 py-2 rounded-xl font-avenirHeavy hover:bg-white hover:text-black">
                    Share
                    <RiShare2Line />
                </button>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Elements stripe={stripePromise}>
                    <SupportForm />
                </Elements>
            </Modal>
        </div>
    );
}

export default ButonShere;
