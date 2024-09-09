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
  const [spacing, setSpacing] = useState(0.4);
  const [perView, setPerView] = useState(1.25);
  const [currentIndex, setCurrentIndex] = useState(1); // Începem de la indexul 1

  // Inițializăm sliderul pentru a începe de la indexul 1
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: 'snap',
    initial: 1, // Setăm să înceapă de la a doua imagine (index 1)
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
        slider.current.options.loop = false; // Dezactivăm temporar loop-ul în timpul drag
      }
    },
    dragEnd: () => {
      if (slider.current) {
        slider.current.options.loop = true; // Reactivăm loop-ul după drag
      }
    },
    duration: 1200,
    easing: (t) => 1 - Math.pow(1 - t, 4),
  });

  // Setăm dimensiunile și numărul de imagini vizibile în funcție de lățimea ecranului
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 834);
      setIsTablet(width > 834 && width <= 1024);

      if (width <= 415) {
        setSpacing(14);
        setPerView(1.4);
      } else if (width <= 834) {
        setSpacing(13);
        setPerView(1.55);
      } else if (width > 834 && width <= 1024) {
        setSpacing(3);
        setPerView(1.25);
      } else {
        setSpacing(20);
        setPerView(1.25);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Actualizăm sliderul când se schimbă dimensiunile sau numărul de imagini vizibile
  useEffect(() => {
    sliderRef.current?.update({
      slides: {
        origin: 'center',
        perView: perView,
        spacing: spacing,
      },
    });
  }, [spacing, perView, sliderRef]);

  // Funcția pentru a gestiona clicurile pe imagini
  const handleImageClick = (e, index) => {
    if (index === currentIndex) {
      window.location.href = images[index].link;
      return;
    }

    const x = e.clientX;
    const screenWidth = window.innerWidth;

    if (x > screenWidth / 2) {
      handleNext(); // Navighează la următoarea imagine
    } else {
      handlePrev(); // Navighează la imaginea anterioară
    }
  };

  // Funcția pentru butonul "Prev"
  const handlePrev = () => {
    if (slider.current) {
      slider.current.prev();
    }
  };

  // Funcția pentru butonul "Next"
  const handleNext = () => {
    if (slider.current) {
      slider.current.next();
    }
  };

  // Funcția pentru clic pe puncte
  const handleDotClick = (index) => {
    if (slider.current) {
      slider.current.moveToIdx(index);
      setCurrentIndex(index);
    }
  };

  return (
    <div ref={sliderRef} className={`keen-slider bg-black ${isMobile ? "custom-bg-height-mobile" : "custom-bg-height"} relative`}>
      {isMobile && (
        <div className="absolute mt-6">
          <Title contentIndex={currentIndex} isMobile={isMobile} isTablet={isTablet} />
        </div>
      )}
      {images.map((image, index) => (
        <div
          key={index}
          className={`keen-slider__slide relative flex justify-center text-white text-2xl w-full h-[494px] sm:h-[494px] md:h-[500px] lg:w-[1100px] max-height ${index !== currentIndex ? 'cursor-pointer' : ''} ${isMobile ? 'mobile-slide' : ''} ${index === currentIndex ? 'current-slide' : ''}`}
          onClick={(e) => handleImageClick(e, index)}
        >
          {index !== currentIndex && (
            <div 
              className="absolute inset-0 bg-black opacity-50 z-10 max-h-[500px] mt-36"
              style={{
                width: '100%',
                height: '100%',
              }}
            ></div>
          )}

          {index === currentIndex && (
            <div
              className="absolute inset-x-0 bottom-0 w-full mb-[28px]"
              style={{
                background: 'linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0) 100%)',
                height: '279px',
              }}
            ></div>
          )}

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
