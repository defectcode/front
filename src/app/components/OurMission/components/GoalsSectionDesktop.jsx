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
    const [currentSection, setCurrentSection] = useState(0); // Start with the first section visible
    const sectionRefs = useRef([]);
    
    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== 'undefined') {
                const scrollY = window.scrollY;
                const windowHeight = window.innerHeight;

                sectionRefs.current.forEach((section, index) => {
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        const sectionTop = rect.top + window.scrollY; // get the distance from the top of the page to the top of the section

                        // Make section visible when its top reaches the middle of the screen
                        if (scrollY + windowHeight / 2 > sectionTop) {
                            setCurrentSection(index);
                        }
                    }
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <motion.div
            className="bg-black h-auto text-white pt-6 pb-6 px-4 lg:px-0"
            style={{ minHeight: '100vh' }}
        >
            {goals.map((goal, index) => (
                <motion.div
                    ref={el => sectionRefs.current[index] = el}
                    key={goal.id}
                    className={`w-full lg:h-[540px] flex items-center bg-[#0D0D0D] rounded-lg ${index !== 0 ? 'mt-6' : ''} mx-auto transition-all duration-500 ease-in-out`}
                    style={{
                        opacity: currentSection >= index ? 1 : 0,
                        transform: currentSection >= index ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.5s ease, transform 0.5s ease',
                    }}
                >
                    <div className={`max-w-screen-2xl mx-auto px-0 lg:px-4 flex ${index % 2 === 0 ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row-reverse'} items-center justify-around lg:gap-28`}>
                        <div className="lg:w-1/2 p-4">
                            <h3 className="text-xl font-extrabold mb-2 flex gap-1 text-[#C1C1C1]" style={{ fontFamily: 'Avenir Heavy, sans-serif', fontWeight: 400 }}>
                                Goal <div className='font-bold' style={{ fontFamily: 'Avenir, sans-serif' }}>{goal.id}</div>
                            </h3>
                            <h2 className="text-[24px] lg:text-[32px] text-[#E50815] mb-4 font-ekmukta-extrabold">{goal.title}</h2>
                            <p className={`mb-6 text-[#F1F1F1] text-[16px] lg:w-[538px] ${width < 768 ? 'font-extralight' : 'font-normal'}`}>{goal.description}</p>
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
