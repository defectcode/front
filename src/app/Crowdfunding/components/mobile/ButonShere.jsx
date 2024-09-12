import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Support from '../../components/Support';
import Modal from '/src/app/components/Header/components/Modal.jsx';
import SupportForm from '/src/app/components/Header/components/Payment/SupportForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ShareButton from './Share/ShareButton';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const ButonShere = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShareFixed, setIsShareFixed] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const shareComponent = document.querySelector('.navbar-crowdfunding-mobile');
            const shareComponentPosition = shareComponent ? shareComponent.getBoundingClientRect().bottom : 0;

            // Dacă componenta iese din partea de jos a ecranului, fixează butoanele
            if (shareComponentPosition > window.innerHeight) {
                setIsShareFixed(true);
            } else {
                setIsShareFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div 
            className={`bottom-0 left-0 right-0 flex items-center justify-center px-5 w-full h-[40px] bg-transparent lg:hidden z-50 ${isShareFixed ? 'slide-up' : 'relative'}`}
            style={{ bottom: isShareFixed ? '0' : 'auto' }}
        >
            <div className="flex items-center justify-center w-full gap-4">
                <div className="flex-[2]">
                    <Support onClick={openModal} />
                </div>
                <ShareButton />
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Elements stripe={stripePromise}>
                    <SupportForm />
                </Elements>
            </Modal>
        </div>
    );
};

export default ButonShere;
