import React, { useState, useEffect, useRef } from 'react';
import { FaTiktok, FaInstagram, FaFacebook } from 'react-icons/fa';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { motion } from 'framer-motion'; // Import Framer Motion
import { teamMembers } from '../constants/teamMembers';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const containerRef = useRef(null);
    const touchPosition = useRef(null);

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        updateWindowWidth();
        window.addEventListener('resize', updateWindowWidth);
        return () => window.removeEventListener('resize', updateWindowWidth);
    }, []);

    const slideDimensions = () => {
        if (windowWidth >= 1024) {
            return { width: 382, height: 547 }; // Desktop dimensions
        } else {
            return { width: 286, height: 378 }; // Mobile dimensions
        }
    };

    const { width: slideWidth, height: slideHeight } = slideDimensions();

    const calculateVisibleSlides = () => {
        if (windowWidth < 416) return 1.5;
        if (windowWidth < 768) return 2.5;
        if (windowWidth < 1024) return 3.5;
        return 5;
    };

    const visibleSlides = calculateVisibleSlides();
    const containerWidth = visibleSlides * slideWidth;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const handleTouchStart = (e) => {
        touchPosition.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (!touchPosition.current) return;

        const currentTouch = e.changedTouches[0].clientX;
        const diff = touchPosition.current - currentTouch;

        if (diff > 50) {
            nextSlide();
        } else if (diff < -50) {
            prevSlide();
        }

        touchPosition.current = null;
    };

    return (
        <div className="relative w-full mt-4 mb-10 lg:my-10">
            <div className="flex items-center">
                <div
                    ref={containerRef}
                    className="overflow-hidden relative mx-5"
                    style={{ width: containerWidth, cursor: 'grab' }}
                >
                    <motion.div
                        className="flex"
                        initial={false}
                        animate={{ x: `-${currentIndex * (slideWidth - 10)}px` }} // Adjust for partial slide visibility
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }} // Smooth animation
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                className="relative flex-shrink-0 mr-[10px] group overflow-hidden rounded-b-xl"
                                style={{
                                    width: slideWidth,
                                    height: slideHeight,
                                    marginRight: index === teamMembers.length - 1 ? '0px' : '10px', // Adjust margin for last item
                                }}
                                onClick={() => goToSlide(index)}
                            >
                                <Image 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="rounded-xl w-full h-full object-cover" 
                                    width={slideWidth} 
                                    height={slideHeight} 
                                />
                                {/* Improved gradient and blur layer with smooth transition */}
                                <div
                                    className="absolute inset-x-0 bottom-0 h-[90px] lg:h-[100px] bg-gradient-to-t from-black/60 via-black/40 to-transparent"
                                    style={{
                                        backdropFilter: 'blur(2px)',
                                        WebkitBackdropFilter: 'blur(2px)',
                                        height: '80px',
                                    }}
                                ></div>
                                
                                <div className="absolute inset-0 flex items-end justify-center px-5 py-4 lg:px-10">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="text-[#FFFEFE] gap-2">
                                            <h3 className="text-xl font-ekmukta">{member.name}</h3>
                                            <p className="text-[16px] text-[#C1C1C1] font-ekmukta">{member.role}</p>
                                        </div>
                                        <div className="flex space-x-4 items-center">
                                            {member.social.tiktok && (
                                                <a href={member.social.tiktok} className="text-white">
                                                    <FaTiktok size={20} />
                                                </a>
                                            )}
                                            {member.social.instagram && (
                                                <a href={member.social.instagram} className="text-white">
                                                    <FaInstagram size={20} />
                                                </a>
                                            )}
                                            {member.social.facebook && (
                                                <a href={member.social.facebook} className="text-white">
                                                    <FaFacebook size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
            {windowWidth >= 1024 && (
                <div className="flex justify-between mt-5 px-4">
                    <div className="flex items-center">
                        {teamMembers.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full mx-1 cursor-pointer ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
                            />
                        ))}
                    </div>
                    <div className="flex items-center space-x-4 lg:mr-10">
                        <div className="bg-[#636365] p-1 lg:p-2 rounded-full">
                            <IoIosArrowBack className="text-white cursor-pointer" onClick={prevSlide} />
                        </div>
                        <div className="bg-[#636365] p-1 lg:p-2 rounded-full">
                            <IoIosArrowForward className="text-white cursor-pointer" onClick={nextSlide} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carousel;
