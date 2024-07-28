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
    const [bgHeight, setBgHeight] = useState(0);
    const [currentSection, setCurrentSection] = useState(0); 
    const [firstSectionInView, setFirstSectionInView] = useState(false);
    const [resetSections, setResetSections] = useState(false);
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

            // Reset secțiunile dacă derulăm în sus și ieșim din prima secțiune
            if (sectionRefs.current[0]) {
                const firstSectionTop = sectionRefs.current[0].getBoundingClientRect().top;
                if (firstSectionTop > window.innerHeight || firstSectionTop < 0) {
                    setFirstSectionInView(false);
                    setCurrentSection(0); // Resetăm secțiunile
                } else {
                    setFirstSectionInView(true);
                }
            }
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setFirstSectionInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRefs.current[0]) {
            observer.observe(sectionRefs.current[0]);
        }

        return () => {
            if (sectionRefs.current[0]) {
                observer.unobserve(sectionRefs.current[0]);
            }
        };
    }, []);


    useEffect(() => {
        let timer;
        if (firstSectionInView && currentSection < goals.length) {
            timer = setTimeout(() => {
                setCurrentSection(currentSection + 1);
            }, 5000); 
        }
        return () => clearTimeout(timer);
    }, [currentSection, firstSectionInView]);


    const getAnimationVariant = (index) => {
        if (width <= 415 && width >= 370) {
            return index === 0 ? 'visibleMobile' : index === 1 ? 'visibleMobile2' : 'visibleMobile3';
        } else if (width <= 430 && width >= 416) {
            return index === 0 ? 'visibleIphone14' : index === 1 ? 'visibleIphone14_2' : 'visibleIphone14_3';
        } else if (width <= 500 && width >= 420) {
            return index === 0 ? 'visibleIphone14' : index === 1 ? 'visibleIphone14_2' : 'visibleIphone14_3';
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
                    animate={currentSection >= index ? getAnimationVariant(index) : 'hidden'}
                    transition={{ duration: 2 }}
                >
                    <div className={`max-w-screen-2xl mx-auto px-0 lg:px-4 flex ${index % 2 === 0 ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row-reverse'} items-center justify-around lg:gap-28`}>
                        <div className="lg:w-1/2 p-4">
                            <h3 className="text-xl font-extrabold mb-2 flex gap-1 text-[#C1C1C1]" style={{ fontFamily: 'Avenir Heavy, sans-serif', fontWeight: 400 }}>Goal <div className='font-bold' style={{ fontFamily: 'Avenir, sans-serif' }}>{goal.id}</div></h3>
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
