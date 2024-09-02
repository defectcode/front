import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { images } from './Components/constants/carouselData';
import Title from './Components/Title';
import FundraisingProgress from './Components/Progres';
import Dots from './Components/Dots';
import Image from 'next/image';

const Carousel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);
  const [spacing, setSpacing] = useState(0.4);
  const [perView, setPerView] = useState(1.25);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    dragStart: () => {
      if (slider.current) {
        slider.current.options.loop = false; // Dezactivează temporar loop-ul pentru a preveni conflictele
      }
    },
    dragEnd: () => {
      if (slider.current) {
        slider.current.options.loop = true; // Reactivăm loop-ul după drag
      }
    },
    duration: 1200, // Crește durata pentru o tranziție mai lină
    easing: (t) => 1 - Math.pow(1 - t, 4), // Folosește 'easeOutQuart' pentru o animație mai lină
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 834);
      setIsTablet(width > 834 && width <= 1024);
      setIsLaptop(width > 1024 && width <= 1920);

      if (width <= 415) {
        setSpacing(14);
        setPerView(1.4);
      } else if (width <= 834) {
        setSpacing(13);
        setPerView(1.55);
      } else if (width > 834 && width <= 1024) {
        setSpacing(3);
        setPerView(1.25);
      } else if (width > 1024 && width <= 1920) {
        setSpacing(20);
        setPerView(1.25);
      } else if (width > 1920 && width <= 2500) {
        setSpacing(20);
        setPerView(1.5);
      } else if (width > 2500 && width <= 3300) {
        setSpacing(20);
        setPerView(1.8);
      } else {
        setSpacing(0.4);
        setPerView(1.25);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (slider.current) {
      setTimeout(() => {
        slider.current.moveToIdx(1);
      }, 0);
    }
  }, [slider]);

  useEffect(() => {
    sliderRef.current?.update({
      slides: {
        origin: 'center',
        perView: perView,
        spacing: spacing,
      },
    });
  }, [spacing, perView, sliderRef]);

  const handleImageClick = (e, index) => {
    // Verificăm dacă imaginea apăsată este cea centrală
    if (index === currentIndex) {
      // Redirecționăm către link-ul specificat
      window.location.href = images[index].link;
      return;
    }

    // Determinăm direcția de navigare pe baza poziției clicului
    const x = e.clientX;
    const screenWidth = window.innerWidth;

    if (x > screenWidth / 2) {
      slider.current?.next();
    } else {
      slider.current?.prev();
    }
  };

  const handleDotClick = (index) => {
    if (slider.current) {
      slider.current.moveToIdx(index);
    }
  };

  const handlePrev = () => {
    if (slider.current) {
      slider.current.prev();
    }
  };

  const handleNext = () => {
    if (slider.current) {
      slider.current.next();
    }
  };

  return (
    <div ref={sliderRef} className={`keen-slider bg-black ${isMobile ? "custom-bg-height-mobile" : "custom-bg-height"} relative`}>
      {isMobile && (
        <div className="absolute mt-10">
          <Title contentIndex={currentIndex} isMobile={isMobile} isTablet={isTablet} />
        </div>
      )}
      {images.map((image, index) => (
        <div
          key={index}
          className={`keen-slider__slide relative flex justify-center text-white text-2xl w-full h-[494px] sm:h-[494px] md:h-[500px] lg:w-[1100px] max-height ${index !== currentIndex ? 'cursor-pointer' : ''} ${isMobile ? 'mobile-slide' : ''} ${index === currentIndex ? 'current-slide' : ''}`}
          onClick={(e) => handleImageClick(e, index)}
        >
          {/* Suprapunere neagră pentru imaginile laterale */}
          {index !== currentIndex && (
            <div 
              className="absolute inset-0 bg-black opacity-50 z-10 max-h-[500px] mt-36"
              style={{
                width: '100%',
                height: '100%',
              }}
            ></div>
          )}

          {/* Strat de blur pentru imaginea centrală */}
          {index === currentIndex && (
            <div
              className="absolute inset-x-0 bottom-0 w-full mb-[28px]"
              style={{
                background: 'linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0) 100%)',
                height: '279px',
              }}
            ></div>
          )}

          {/* Icon de lacăt pentru imaginile cu status 'Next' */}
          {image.status === 'Next' && index === currentIndex && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Image src='/imgs/Carousel/lock.svg' alt="Icon lacăt" width={50} height={50} className="opacity-70" />
            </div>
          )}

          {/* Container de conținut */}
          <div
            className={`absolute inset-x-0 bottom-0 z-20 ${isMobile ? 'w-full px-3 mb-[25px] rounded-[10px]' : isTablet ? 'w-full h-full bg-gradient-to-r from-black/60 to-transparent p-3' : 'w-[55%] h-[750px] bg-gradient-to-r px-10'} flex flex-col justify-end text-white ${currentIndex === index ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
            style={
              image.status === 'Next' && index === currentIndex
                ? {
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    paddingTop: '12px',
                    background: 'linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0) 100%)',
                    height: '279px',
                    zIndex: 10,
                  }
                : {}
            }
          >
            {!isMobile && (
              <Title contentIndex={index} isMobile={isMobile} isTablet={isTablet} />
            )}
            <FundraisingProgress raisedAmount={image.raisedAmount} goalAmount={image.goalAmount} contentIndex={index} />
          </div>

          <img
            src={isMobile ? image.src.mobile : isTablet ? image.src.tablet : image.src.desktop}
            alt={image.alt}
            className={`w-full h-full object-cover max-h-[750px] custom-image-width ${isMobile ? "max-width-image w-full min-w-[270px] max-height-image mt-36 rounded-[10px]" : "rounded-lg"} ${image.status === 'Next' && index === currentIndex ? 'blur-[1px] opacity-90 mt-10' : ''}`}
            style={{
              objectFit: 'cover',
            }}
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
          <button className="absolute left-0 top-[60%] transform -translate-y-1/2 bg-transparent ml-3 p-3 max-[395px]:p-0 rounded-full text-white z-30" onClick={handlePrev}>
            <Image src='/imgs/Carousel/left.svg' alt='săgeată' height={17} width={13} className="opacity-70" />
          </button>
          <button className="absolute right-0 top-[60%] transform -translate-y-1/2 bg-transparent mr-3 p-3 max-[395px]:p-0 rounded-full text-white z-30" onClick={handleNext}>
            <Image src='/imgs/Carousel/right.svg' alt='săgeată' height={17} width={13} className="opacity-70" />
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
