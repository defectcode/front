'use client';
import { useState, useEffect, useRef } from 'react';
import Dots from './Components/Dots';
import Title from './Components/Title';
import FundraisingProgress from './Components/Progres';
import { images } from './Components/constants/carouselData';
import PrevButton from './Components/PrevButton';
import NextButton from './Components/NextButton';

const Carousel = () => {
  const totalImages = images.length;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const updateCarouselWidth = () => {
      const width = window.innerWidth;
      setCarouselWidth(width);
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    if (typeof window !== 'undefined') {
      updateCarouselWidth();
      window.addEventListener('resize', updateCarouselWidth);

      return () => {
        window.removeEventListener('resize', updateCarouselWidth);
      };
    }
  }, []);

  const goToNextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (totalImages + 2)); // include imaginile fantomă
    }
  };

  const goToPreviousSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages + 2) % (totalImages + 2)); // include imaginile fantomă
    }
  };

  const handleDotClick = (index) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      if (currentIndex === 0) {
        setCurrentIndex(totalImages);
        containerRef.current.style.transition = 'none';
        containerRef.current.style.transform = `translateX(-${totalImages * (isMobile ? 283 : isTablet ? 600 : 1317)}px)`;
      } else if (currentIndex === totalImages + 1) {
        setCurrentIndex(1);
        containerRef.current.style.transition = 'none';
        containerRef.current.style.transform = `translateX(-${isMobile ? 283 : isTablet ? 600 : 1317}px)`;
      }
    };

    const container = containerRef.current;
    container.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      container.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [currentIndex, totalImages, isMobile, isTablet]);

  useEffect(() => {
    if (isTransitioning) {
      containerRef.current.style.transition = 'transform 0.5s ease-in-out';
    } else {
      containerRef.current.style.transition = 'none';
    }
    const imageWidth = isMobile ? 268 : isTablet ? 600 : 1317; // Use actual width of the image
    const padding = 9; // Adjust padding as needed
    const translateXValue = currentIndex < 1 ? totalImages : currentIndex > totalImages ? 1 : currentIndex;
    const offsetX = (carouselWidth - imageWidth) / 2;
    containerRef.current.style.transform = `translateX(-${translateXValue * (imageWidth + padding * 2) - offsetX}px)`;
  }, [currentIndex, isTransitioning, carouselWidth, isMobile, isTablet]);

  return (
    <div className="relative w-full mx-auto overflow-hidden bg-black" style={{ height: isMobile ? '731px' : isTablet ? '800px' : '800px' }}>
      {(isMobile || isTablet) && (
        <div className="absolute w-full top-0 left-0 z-10 ">
          <Title contentIndex={currentIndex - 1} isMobile={isMobile} isTablet={isTablet} />
        </div>
      )}
      <div
        className="flex transition-transform duration-500 ease-in-out my-5 max-lg:my-16 max-md:mt-36"
        ref={containerRef}
        style={{ width: `${(totalImages + 2) * (isMobile ? 283 : isTablet ? 600 : 1317)}px`, transform: `translateX(-${currentIndex * (isMobile ? 286 : isTablet ? 620 : 1335) - (carouselWidth - (isMobile ? 295 : isTablet ? 620 : 1325)) / 2}px)` }}
      >
        <div className={`w-[${isMobile ? 283 : isTablet ? 600 : 1317}px] flex-shrink-0 mx-[9px]`}>
          <img
            src={isMobile ? images[totalImages - 1].src.mobile : isTablet ? images[totalImages - 1].src.tablet : images[totalImages - 1].src.desktop}
            alt={images[totalImages - 1].alt}
            className={`${isMobile ? 'w-[268px] h-[453px] rounded-lg' : isTablet ? 'w-[600px] h-[400px] rounded-lg' : 'w-[1317px] h-[656px]'} object-cover`}
          />
        </div>
        {images.map((image, index) => (
          <div key={index} className="relative flex-shrink-0 mx-[9px]" style={{ width: isMobile ? '268px' : isTablet ? '600px' : '1317px' }}>
            <img
              src={isMobile ? image.src.mobile : isTablet ? image.src.tablet : image.src.desktop}
              alt={image.alt}
              className={`${isMobile ? 'w-[268px] h-[453px] rounded-lg' : isTablet ? 'w-[600px] h-[400px] rounded-lg' : 'w-[1317px] h-[656px]'} object-cover`}
            />
            {index === currentIndex - 1 && (
              <div className={`absolute inset-0 ${isMobile ? 'w-full h-full bg-gradient-to-t from-black/60 to-transparent p-3' : isTablet ? 'w-full h-full bg-gradient-to-r from-black/60 to-transparent p-3' : 'w-3/5 h-full bg-gradient-to-r from-black/85 to-transparent pl-10'} flex flex-col justify-around text-white`}>
                {!isMobile && !isTablet && <Title contentIndex={index} isMobile={isMobile} />}
                <FundraisingProgress raisedAmount={image.raisedAmount} goalAmount={image.goalAmount} contentIndex={index} />
              </div>
            )}
          </div>
        ))}
        <div className={'flex-shrink-0 mx-[9px]'} style={{ width: isMobile ? '268px' : isTablet ? '600px' : '1317px' }}>
          <img
            src={isMobile ? images[0].src.mobile : isTablet ? images[0].src.tablet : images[0].src.desktop}
            alt={images[0].alt}
            className={`${isMobile ? 'w-[268px] h-[453px] rounded-lg' : isTablet ? 'w-[600px] h-[400px] rounded-lg' : 'w-[1317px] h-[656px]'} object-cover`}
          />
        </div>
      </div>
      <PrevButton onClick={goToPreviousSlide} />
      <NextButton onClick={goToNextSlide} />
      <Dots totalImages={totalImages} currentIndex={currentIndex} isMobile={isMobile} isTablet={isTablet} onDotClick={handleDotClick} />
    </div>
  );
};

export default Carousel;
