import Link from "next/link";
import React, { useState, useEffect } from "react";
import Support from '../components/Support';
import { RiShare2Line } from "react-icons/ri";
import Modal from '/src/app/components/Header/components/Modal.jsx';
import SupportForm from '/src/app/components/Header/components/Payment/SupportForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const NavBarCrowdfunding = ({ setActiveSection }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeHash, setActiveHash] = useState('#overview');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleHashChange = () => {
            const newHash = window.location.hash || '#overview';
            setActiveHash(newHash);
            setActiveSection(newHash.substring(1));
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [setActiveSection]);

    useEffect(() => {
        console.log('activeHash:', activeHash);
    }, [activeHash]);

    const handleLinkClick = (hash) => {
        setActiveHash(hash);
        setActiveSection(hash.substring(1));
    };

    const linkClasses = (path) => `px-3 py-1 border-2 rounded-xl font-ekmukta ${activeHash === path ? 'bg-white text-black border-white' : 'bg-[#272727] text-[#F1F1F1] border-transparent'}`;

    return (
        <div className="flex items-center justify-between px-5 lg:px-[122px] w-full h-[60px] bg-[#1B1B1B]">
            <div className="flex items-center gap-5">
                <Link href="#overview" passHref legacyBehavior>
                    <a className={linkClasses('#overview')} onClick={() => handleLinkClick('#overview')}>Overview</a>
                </Link>
                <Link href="#rewards" passHref legacyBehavior>
                    <a className={linkClasses('#rewards')} onClick={() => handleLinkClick('#rewards')}>Rewards</a>
                </Link>
                <Link href="#community" passHref legacyBehavior>
                    <a className={linkClasses('#community')} onClick={() => handleLinkClick('#community')}>Community</a>
                </Link>
                <Link href="#extras" passHref legacyBehavior>
                    <a className={linkClasses('#extras')} onClick={() => handleLinkClick('#extras')}>Extras</a>
                </Link>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="flex items-center h-full">
                    <Support onClick={openModal}/>
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

export default NavBarCrowdfunding;
