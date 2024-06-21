'use client';
import { useState, useEffect } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(1);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const raisedAmount = 15000;
  const goalAmount = 74000;

  return (
    <div className="relative flex justify-center h-full bg-black">
      <div className="flex items-center justify-center w-full relative overflow-hidden m-7 max-lg:m-4">
        <PrevButton onClick={prevSlide} />
        <div className="w-full relative flex justify-center items-center">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${(currentIndex + 1) * 100}%)`, width: `${(images.length + 2) * 100}%` }}
          >
            <div className="relative w-full h-screen flex-shrink-0 flex items-center">
              <Image src={images[images.length - 1]} alt={`Slide ${images.length - 1}`} layout="fill" objectFit="cover" className="w-full h-full opacity-50" />
            </div>

            {images.map((image, index) => (
              <div key={index} className="relative w-full h-screen max-md:h-[550px] flex-shrink-0 flex items-center">
                <Image src={image} alt={`Slide ${index}`} layout="fill" objectFit="cover" className="w-full h-full max-lg:w-[200px] max-lg:mt-52 max-lg:px-3" />
                {index === currentIndex && (
                  <div className="absolute flex flex-col justify-around max-lg:items-center top-0 left-0 w-2/5 max-2xl:w-3/5 max-lg:w-full h-screen bg-gradient-to-r from-black to-transparent opacity-80 text-white p-14 max-lg:p-5">
                    <Title />
                    <FundraisingProgress raisedAmount={raisedAmount} goalAmount={goalAmount} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <NextButton onClick={nextSlide} />
      </div>
      <Dots total={images.length} current={currentIndex} />
    </div>
  );
};

export default Carousel;