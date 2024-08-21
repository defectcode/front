'use client'
import React, { useState, useEffect, useRef } from 'react';
import { FaTiktok, FaInstagram, FaFacebook } from 'react-icons/fa';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { teamMembers } from '../constants/teamMembers';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const containerRef = useRef(null);

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        updateWindowWidth();
        window.addEventListener('resize', updateWindowWidth);
        return () => window.removeEventListener('resize', updateWindowWidth);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    let visibleSlides = 5;
    let slideWidth = 384;
    let slideHeight = 547;

    if (windowWidth < 1024) {
        visibleSlides = 3.5;
    }
    if (windowWidth < 768) {
        visibleSlides = 2.5;
        slideWidth = 286;
        slideHeight = 378;
    }
    if (windowWidth < 416) {
        visibleSlides = 1.5;
        slideWidth = 286;
        slideHeight = 378;
    }

    const containerWidth = visibleSlides * slideWidth;

    return (
        <div className="relative w-full mt-4 lg:mt-10">
            <div className="flex items-center">
                <div
                    ref={containerRef}
                    className="overflow-hidden relative mx-4"
                    style={{ width: containerWidth, cursor: 'grab' }}
                >
                    <div
                        className="flex transition-transform duration-300"
                        style={{
                            transform: `translateX(-${currentIndex * slideWidth}px)`,
                            overflowX: windowWidth < 1024 ? 'scroll' : 'hidden',
                            scrollbarColor: 'transparent transparent', // Mâner și pistă transparente
                        }}
                        onMouseDown={() => {
                            containerRef.current.style.cursor = 'grabbing';
                        }}
                        onMouseUp={() => {
                            containerRef.current.style.cursor = 'grab';
                        }}
                    >
                        {teamMembers.map((member, index) => (
                            <div key={index} className="relative flex-shrink-0 mx-2 group" style={{ width: slideWidth, height: slideHeight }}>
                                <Image src={member.image} alt={member.name} className="rounded-lg w-full h-full object-cover" width={slideWidth} height={slideHeight} />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-lg"></div>
                                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between">
                                    <div className="">
                                        <h3 className="text-xl font-ekmukta">{member.name}</h3>
                                        <p className="text-[16px] text-[#C1C1C1] font-ekmukta">{member.role}</p>
                                    </div>
                                    <div className="flex space-x-4 mt-2 items-center">
                                        <a href={member.social.tiktok} className="text-white"><FaTiktok size={20} /></a>
                                        <a href={member.social.instagram} className="text-white"><FaInstagram size={20} /></a>
                                        <a href={member.social.facebook} className="text-white"><FaFacebook size={20} /></a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Navigația cu puncte și săgeți ascunsă pe mobil */}
            {windowWidth >= 1024 && (
                <div className="flex justify-between mt-4 px-4">
                    <div className="flex items-center">
                        {teamMembers.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full mx-2 cursor-pointer ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
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
