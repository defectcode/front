'use client'
import React, { useState, useEffect, useRef } from 'react';
import Support from './Support';
import { motion } from 'framer-motion';
import Modal from '/src/app/components/Header/components/Modal.jsx';
import SupportForm from '/src/app/components/Header/components/Payment/SupportForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useWindowDimensions from './useWindowDimensions'; 
import { goals, componentsAnimation } from '../constants/goals';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const GoalsSection = () => {
    const { width } = useWindowDimensions();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bgHeight, setBgHeight] = useState(window.innerHeight);
    const sectionRefs = useRef([]);
    const minHeight = width < 768 ? 700 : 20;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setBgHeight(window.innerHeight);
        }
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleScroll = () => {
        if (typeof window !== 'undefined') {
            const scrollTop = window.scrollY;
            const elementHeight = 540;
            const reduction = Math.floor(scrollTop / elementHeight) * 500;
            const newHeight = Math.max(minHeight, window.innerHeight - reduction);
            setBgHeight(newHeight);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const getAnimationVariant = (index) => {
        if (width < 768) {
            return index === 0 ? 'visibleMobile' : index === 1 ? 'visibleMobile2' : 'visibleMobile3';
        } else {
            return index === 0 ? 'visible' : index === 1 ? 'visible2' : 'visible3';
        }
    };

    return (
        <motion.div
            className="bg-black text-white pt-6 pb-6 px-4 lg:px-0"
            style={{ minHeight: `${minHeight}px`, height: `${bgHeight}px`, transition: 'height 0.2s ease' }}
        >
            {goals.map((goal, index) => (
                <motion.div
                    ref={el => sectionRefs.current[index] = el}
                    variants={componentsAnimation}
                    key={goal.id}
                    className={`w-full lg:h-[540px] flex items-center bg-[#0D0D0D] rounded-lg ${index !== 0 ? 'mt-6' : ''} mx-auto`}
                    initial="hidden"
                    whileInView={getAnimationVariant(index)}
                    transition={{ duration: 2 }}
                    viewport={{ once: false }}
                >
                    <div className={`max-w-screen-2xl mx-auto px-0 lg:px-4 flex ${index % 2 === 0 ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row-reverse'} items-center justify-around lg:gap-28`}>
                        <div className="lg:w-1/2 p-4">
                            <h3 className="text-xl font-extrabold mb-2 flex gap-1 text-[#C1C1C1]" style={{ fontFamily: 'Avenir Heavy, sans-serif', fontWeight: 400 }}>Goal <div className='font-bold' style={{ fontFamily: 'Avenir, sans-serif' }}>{goal.id}</div></h3>
                            <h2 className="text-[24px] lg:text-[32px] text-[#E50815] mb-4 font-extrabold" style={{ fontFamily: "'Ek Mukta', sans-serif"}}>{goal.title}</h2>
                            <p className={`mb-6 text-[#F1F1F1] text-[16px] lg:w-[538px] ${width < 768 ? 'font-extralight' : 'font-normal'}`} style={{ fontFamily: "'Ek Mukta', sans-serif"}}>{goal.description}</p>
                            <Support onClick={openModal} />
                        </div>
                        <div className="lg:w-1/2 p-4 flex justify-end">
                            <img src={goal.image} alt={goal.title} className="rounded-lg w-full h-full object-cover lg:w-[483px] lg:h-[446px]" />
                        </div>
                    </div>
                </motion.div>
            ))}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Elements stripe={stripePromise}>
                    <SupportForm />
                </Elements>
            </Modal>
        </motion.div>
    );
}

export default GoalsSection;
