"use client"
import React, { useState, useEffect } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { images } from './Components/constants/carouselData';
import Title from './Components/Title';
import FundraisingProgress from './Components/Progres';
import Dots from './Components/Dots';

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
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
      setIsLaptop(width >= 1024 && width <= 1920);
      
      if (width <= 768) {
        setSpacing(10);
        setPerView(1.55);
      } else if (width > 768 && width <= 1024) {
        setSpacing(1);
        setPerView(1.25);
      } else if (width > 1024 && width <= 1920) {
        setSpacing(20);
        setPerView(1.15);
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
    mode: 'free-snap',
    slides: {
      origin: 'center',
      perView: perView,
      spacing: spacing,
    },
    slideChanged(s) {
      setCurrentIndex(s.track.details.rel);
    }
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


  return (
    <div ref={sliderRef} className={`keen-slider bg-black py-6 ${isMobile ? "custom-bg-height-mobile" : "custom-bg-height"} relative`}>
      {images.map((image, index) => (
        <div
          key={index}
          className="keen-slider__slide relative flex justify-center text-white text-2xl font-semibold w-full h-[453px] sm:h-[600px] md:h-[500px] lg:w-[1100px] max-height"
        >
          <div className={`absolute inset-0 ${isMobile ? 'w-full h-full bg-gradient-to-t from-black/60 to-transparent p-2 -mt-[105px]' : isTablet ? 'w-full h-full bg-gradient-to-r from-black/60 to-transparent p-3' : 'w-full h-full bg-gradient-to-r from-black/85 to-transparent px-10'} flex flex-col justify-around text-white  ${currentIndex === index ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
            <Title contentIndex={index} isMobile={isMobile} isTablet={isTablet} />
            <FundraisingProgress raisedAmount={image.raisedAmount} goalAmount={image.goalAmount} contentIndex={index} />
          </div>
          <img
            src={isMobile ? image.src.mobile : isTablet ? image.src.tablet : image.src.desktop}
            alt={image.alt}
            className={`w-full h-full object-cover max-h-[750px] custom-image-width ${isMobile ? "max-width-image max-height-image mt-36 rounded-lg" : "rounded-none"}`}
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
    </div>
  );
};

export default Carousel;
