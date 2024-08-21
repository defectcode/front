import React, { useState, useEffect, useRef } from 'react';
import Support from './Support';
import { motion } from 'framer-motion';
import Modal from '/src/app/components/Header/components/Modal.jsx';
import SupportForm from '/src/app/components/Header/components/Payment/SupportForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { goals, componentsAnimation } from '../constants/goals';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const GoalsSectionMobile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);
    const [isLastSectionVisible, setIsLastSectionVisible] = useState(false);
    const sectionRefs = useRef([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleScroll = () => {
        if (typeof window !== 'undefined') {
            const scrollY = window.scrollY;
            const sectionHeight = window.innerHeight / 2;
            const newSection = Math.min(goals.length - 1, Math.floor(scrollY / sectionHeight));
            setCurrentSection(newSection);

            // Verifică dacă ultimul element este vizibil
            const lastSection = sectionRefs.current[goals.length - 1];
            if (lastSection) {
                const lastSectionTop = lastSection.offsetTop;
                const viewportBottom = scrollY + window.innerHeight;
                setIsLastSectionVisible(viewportBottom >= lastSectionTop);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div 
            className={`bg-black text-white pt-6 pb-6 px-4 lg:px-0`}
            style={{ marginBottom: isLastSectionVisible ? '-310px' : '0' }} // Modifică marginea de jos când ultimul element este vizibil
        >
            {goals.map((goal, index) => (
                <motion.div
                    ref={el => sectionRefs.current[index] = el}
                    key={goal.id}
                    className={`goal-section w-full lg:h-[540px] flex items-center bg-[#0D0D0D] rounded-lg border-2 border-[#222222] mx-auto ${currentSection >= index ? 'visible' : 'hidden'} ${index === 0 ? 'mt-200-mobile' : ''} ${index !== 0 ? 'mt-10' : ''}`}
                    initial="hidden"
                    animate={currentSection >= index ? 'visible' : 'hidden'}
                    transition={{ duration: 2 }}
                >
                    <div className={`max-w-screen-2xl mx-auto px-0 lg:px-4 flex ${index % 2 === 0 ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row-reverse'} items-center justify-around lg:gap-28`}>
                        <div className="lg:w-1/2 p-4">
                            <h3 className="text-xl font-extrabold mb-2 flex gap-1 text-[#C1C1C1]" style={{ fontFamily: 'Avenir Heavy, sans-serif', fontWeight: 400 }}>Goal <div className='font-bold' style={{ fontFamily: 'Avenir, sans-serif' }}>{goal.id}</div></h3>
                            <h2 className="text-[24px] lg:text-[32px] text-[#E50815] mb-4 font-ekmukta-extrabold">{goal.title}</h2>
                            <p className={`mb-6 text-[#F1F1F1] text-[16px] lg:w-[538px] font-normal`}>{goal.description}</p>
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

export default GoalsSectionMobile;
