"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { images } from './Components/constants/carouselData';
import Title from './Components/Title';
import FundraisingProgress from './Components/Progres';
import Dots from './Components/Dots';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const Carousel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);
  const [spacing, setSpacing] = useState(0.4);
  const [perView, setPerView] = useState(1.25);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 834); 
      setIsTablet(width > 834 && width <= 1024);
      setIsLaptop(width > 1024 && width <= 1920);

      if (width <= 415) { 
        setSpacing(12); 
        setPerView(1.4);
      } else if (width <= 834) { 
        setSpacing(13); 
        setPerView(1.55);
      } else if (width > 834 && width <= 1024) {
        setSpacing(3);
        setPerView(1.25);
      } else if (width > 1024 && width <= 1920) {
        setSpacing(20);
        setPerView(1);
      } else {
        setSpacing(0.4);
        setPerView(1.25);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: 'snap',
    slides: {
      origin: 'center',
      perView: perView,
      spacing: spacing,
    },
    slideChanged(s) {
      setCurrentIndex(s.track.details.rel);
    },
    duration: 800,
  });

  useEffect(() => {
    sliderRef.current?.update({
      slides: {
        origin: 'center',
        perView: perView,
        spacing: spacing,
      },
    });
  }, [spacing, perView, sliderRef]);

  const handleDotClick = (index) => {
    slider.current?.moveToIdx(index);
  };

  const handleImageClick = (e, index) => {
    if (index === currentIndex) {
      return;
    }

    const x = e.clientX;
    const screenWidth = window.innerWidth;

    if (x > screenWidth / 2) {
      slider.current?.next();
    } else {
      slider.current?.prev();
    }
  };

  const handlePrev = () => {
    slider.current?.prev();
  };

  const handleNext = () => {
    slider.current?.next();
  };

  return (
    <div ref={sliderRef} className={`keen-slider bg-black py-6 ${isMobile ? "custom-bg-height-mobile" : "custom-bg-height"} relative`}>
      {isMobile && (
        <div className="absolute mt-10">
          <Title contentIndex={currentIndex} isMobile={isMobile} isTablet={isTablet} />
        </div>
      )}
      {images.map((image, index) => (
        <div
          key={index}
          className={`keen-slider__slide relative flex justify-center text-white text-2xl font-semibold w-full ${isMobile ? 'h-[453px]' : isTablet ? 'h-[600px]' : 'h-[550px]'} lg:w-[1100px] max-height ${index !== currentIndex ? 'cursor-pointer' : ''} ${isMobile ? 'mobile-slide' : ''} ${index === currentIndex ? 'current-slide' : ''}`}
          onClick={(e) => handleImageClick(e, index)}
        >
          {index !== currentIndex && (
            <div className={`absolute inset-0 ${isMobile ? 'mobile-overlay bg-[#363636]/40 rounded-lg max-h-[453px] mt-36' : 'h-[650px] max-md:max-h-[453px] max-md:w-[269px] rounded-lg bg-[#363636]/40 max-md:mt-36'}`}></div>
          )}
          <div className={`absolute inset-0 ${isMobile ? 'w-full h-[453px] mt-36 bg-gradient-to-t from-black/70 to-transparent p-3 ' : isTablet ? 'w-full h-full bg-gradient-to-r from-black/60 to-transparent p-3' : 'w-[55%] h-[650px] bg-gradient-to-r from-[#000000]/80 via-[#282828]/85 to-transparent px-10'} flex flex-col justify-around text-white ${currentIndex === index ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
            {!isMobile && (
              <Title contentIndex={index} isMobile={isMobile} isTablet={isTablet} />
            )}
            <FundraisingProgress raisedAmount={image.raisedAmount} goalAmount={image.goalAmount} contentIndex={index} />
          </div>
          <img
            src={isMobile ? image.src.mobile : isTablet ? image.src.tablet : image.src.desktop}
            alt={image.alt}
            className={`w-full h-full object-cover max-h-[650px] custom-image-width ${isMobile ? "max-width-image w-full min-w-[240px] max-height-image mt-36 rounded-lg" : "rounded-lg"} ${index !== currentIndex && isMobile ? 'mobile-side-image' : ''}`}
          />
        </div>
      ))}
      <Dots
        totalImages={images.length}
        currentIndex={currentIndex}
        isMobile={isMobile}
        isTablet={isTablet}
        onDotClick={handleDotClick}
      />
      {isMobile && (
        <>
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent ml-1 p-3 max-[395px]:p-0 rounded-full text-white" onClick={handlePrev}>
            <IoIosArrowBack size={30} />
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent mr-1 p-3 max-[395px]:p-0 rounded-full text-white" onClick={handleNext}>
            <IoIosArrowForward size={30} />
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
