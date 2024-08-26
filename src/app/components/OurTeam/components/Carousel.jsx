import React, { useState, useEffect, useRef } from 'react';
import { FaTiktok, FaInstagram, FaFacebook } from 'react-icons/fa';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
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
        <div className="relative w-full mt-4 lg:mt-10">
            <div className="flex items-center">
                <div
                    ref={containerRef}
                    className="overflow-hidden relative mx-5"
                    style={{ width: containerWidth, cursor: 'grab' }}
                >
                    <div
                        className="flex transition-transform duration-300"
                        style={{
                            transform: `translateX(-${currentIndex * slideWidth}px)`,
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="relative flex-shrink-0 mr-[10px] group overflow-hidden rounded-b-xl" // Add rounded bottom here
                                style={{ width: slideWidth, height: slideHeight }}
                                onClick={() => goToSlide(index)}
                            >
                                <Image 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="rounded-xl w-full h-full object-cover" 
                                    width={slideWidth} 
                                    height={slideHeight} 
                                />
                                {/* Multiple gradient and blur layers for smooth transition with rounded bottom */}
                                <div className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-xl" style={{ backdropFilter: 'blur(120px)', maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1), transparent)' }}></div>
                                <div className="absolute inset-x-0 bottom-0 h-[90px] bg-gradient-to-t from-black/80 to-transparent rounded-b-sm" style={{ backdropFilter: 'blur(100px)', maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)' }}></div>
                                <div className="absolute inset-x-0 bottom-0 h-[80px] bg-gradient-to-t from-black/60 to-transparent rounded-b-sm" style={{ backdropFilter: 'blur(90px)', maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)' }}></div>
                                <div className="absolute inset-x-0 bottom-0 h-[60px] bg-gradient-to-t from-black/40 to-transparent rounded-b-sm" style={{ backdropFilter: 'blur(80px)', maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)' }}></div>
                                <div className="absolute inset-x-0 bottom-0 h-[40px] bg-gradient-to-t from-black/30 to-transparent rounded-b-sm" style={{ backdropFilter: 'blur(70px)', maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent)' }}></div>
                                
                                {/* Content layer */}
                                <div className="absolute inset-0 flex items-end justify-center mx-5 my-5 lg:mx-10"> 
                                    <div className="flex items-center justify-between w-full px-5"> 
                                        <div className="text-[#FFFEFE] gap-2">
                                            <h3 className="text-xl font-ekmukta">{member.name}</h3>
                                            <p className="text-[16px] text-[#C1C1C1] font-ekmukta">{member.role}</p>
                                        </div>
                                        <div className="flex space-x-4 items-center">
                                            <a href={member.social.tiktok} className="text-white"><FaTiktok size={20} /></a>
                                            <a href={member.social.instagram} className="text-white"><FaInstagram size={20} /></a>
                                            <a href={member.social.facebook} className="text-white"><FaFacebook size={20} /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
