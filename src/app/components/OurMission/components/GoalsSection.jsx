'use client'
import React, { useEffect, useState} from 'react';
import Support from './Support';
import { motion } from 'framer-motion';
import Modal from '/src/app/components/Header/components/Modal.jsx';
import SupportForm from '/src/app/components/Header/components/Payment/SupportForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useWindowDimensions from './useWindowDimensions'; // Import the custom hook


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const goals = [
    {
        id: 1,
        title: 'Social Justice',
        description: 'We work to end poverty and inequality, giving everyone equal chances. By reaching and supporting communities, we help people build a fair society where everyone has the opportunity to succeed.',
        image: '/imgs/OurMission/module1.png', // Replace with your image path
    },
    {
        id: 2,
        title: 'Sustainable Development',
        description: 'We are dedicated to creating a green, modern city for a sustainable future. Our projects focus on urban planning, eco-friendly building, and innovative technologies to protect our environment for future generations.',
        image: '/imgs/OurMission/module2.png', // Replace with your image path
    },
    {
        id: 3,
        title: 'Cultural Diversity',
        description: 'We honor and respect the unique cultures and traditions of everyone. By encouraging cultural exchange and mutual understanding, we aim to create an inclusive, harmonious community that values and celebrates diversity.',
        image: '/imgs/OurMission/module3.png', // Replace with your image path
    },
];

const GoalsSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const { width } = useWindowDimensions(); // Get window dimensions


    useEffect(() => {
        if (width < 768) return; // Disable scroll effects for mobile devices

    }, [width])

    return (
        <div className="bg-black text-white pt-6 pb-6 px-4 lg:px-0">
            {goals.map((goal, index) => (
                <motion.div
                    key={goal.id}
                    className={`hover:animate-fadeOutLeft w-full lg:h-[540px] flex items-center bg-[#0D0D0D] ${width < 768 ? 'rounded-lg' : ''} ${index !== 0 ? 'mt-6' : ''} mx-auto`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2 }}
                    viewport={{ once: true }}
                >
                    <div className={`max-w-screen-2xl mx-auto px-0 lg:px-4 flex flex-col lg:flex-row items-center justify-around lg:gap-28 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                        <div className="lg:w-1/2 p-4">
                            <h3 className="text-xl font-extrabold mb-2 flex gap-1" style={{ fontFamily: 'Avenir Heavy, sans-serif', fontWeight: 400 }}>Goal <div className='font-bold'>{goal.id}</div></h3>
                            <h2 className="text-[24px] lg:text-[32px] text-[#E50815] mb-4 font-extrabold" style={{ fontFamily: "'Ek Mukta', sans-serif"}}>{goal.title}</h2>
                            <p className="mb-6 text-[#F1F1F1] text-[16px] lg:w-[538px]" style={{ fontFamily: "'Ek Mukta', sans-serif", fontWeight: 400}}>{goal.description}</p>
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
        </div>
    );
}

export default GoalsSection;
