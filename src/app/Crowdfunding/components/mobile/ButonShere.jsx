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
    const [isShareVisible, setIsShareVisible] = useState(true); // Controlăm vizibilitatea butonului Share

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar-crowdfunding-mobile');
            const navbarPosition = navbar ? navbar.getBoundingClientRect().top : 0;
            
            // Dacă bara de navigare este vizibilă în viewport, afișează butonul Share
            if (navbarPosition < window.innerHeight) {
                setIsShareVisible(true);
            } else {
                setIsShareVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={` bottom-0 left-0 right-0 lg:static flex items-center justify-between px-5 w-full h-[40px] mb-5 bg-transparent lg:hidden z-50 ${isShareVisible ? 'visible' : 'invisible'}`}>
            <div className="flex items-center justify-between w-full gap-4">
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
