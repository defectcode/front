'use client';
import React, { useState, useRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';
import FundraisingProgress from './Components/Progres';
import Title from './Components/Title';
import PrevButton from './Components/PrevButton';
import NextButton from './Components/NextButton';
import Dots from './Components/Dots';

const images = [
  '/imgs/carousel.svg',
  '/imgs/carousel.svg',
  '/imgs/carousel.svg',
  '/imgs/carousel.svg',
  '/imgs/carousel.svg',
  '/imgs/carousel.svg',
  '/imgs/carousel.svg',
  '/imgs/carousel.svg',
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const splideRef = useRef(null);

  const raisedAmount = 20000;
  const goalAmount = 74000;

  const options = {
    type: 'loop',
    padding: { left: '3rem', right: '3rem' }, // Padding pentru mobil
    perPage: 1,
    pagination: false,
    arrows: false,
    gap: '2px', // Gap între imagini pentru mobil
    speed: 200,
  };

  return (
    <div className="relative flex justify-center h-full max-md:h-[800px] bg-black ">
      <div className="flex items-center justify-center w-full relative overflow-hidden m-7 max-lg:m-4 ">
        <PrevButton onClick={() => splideRef.current.go('<')} className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10" />
        <div className="w-full relative flex justify-center items-center">
          <Splide
            options={options}
            className="w-full h-full"
            ref={splideRef}
            onMoved={(splide, newIndex) => {
              setCurrentIndex(newIndex);
            }}
          >
             {/* //${index !== currentIndex ? 'filter blur-sm' : ''} */}
            {images.map((image, index) => (
              <SplideSlide key={index} className="relative  rounded-xl w-full h-screen max-md:h-[700px] flex-shrink-0 flex items-center">
                <div className={`relative w-full h-full transition-all duration-300 ease-in-out`}> 
                  <Image src={image} alt={`Slide ${index}`} layout="fill" objectFit="cover" className="w-full h-full max-lg:w-[200px] max-lg:mt-44 max-lg:px-3" />
                  {index === currentIndex && (
                    <div className="absolute flex flex-col justify-around items-center md:items-start top-0 left-0 w-full md:w-4/5 max-2xl:w-full h-full bg-gradient-to-r from-black to-transparent max-md:bg-gradient-to-t max-md:from-black max-md:to-transparent md:from-black/70 md:to-transparent  opacity-90 text-white p-5 max-md:p-0 md:p-14 animate-fade-in">
                      <Title />
                      <FundraisingProgress raisedAmount={raisedAmount} goalAmount={goalAmount} />
                    </div>
                  )}
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
        <NextButton onClick={() => splideRef.current.go('>')} className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10" />
      </div>
      <Dots total={images.length} current={currentIndex} />
    </div>
  );
};

export default Carousel;
