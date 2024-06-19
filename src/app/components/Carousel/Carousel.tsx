'use client'
import { useState } from 'react';
import Image from 'next/image';

const images = [
  '/imgs/carousel.png',
  '/imgs/carousel.png',
  '/imgs/carousel.png',
  '/imgs/carousel.png',
  '/imgs/carousel.png',
  '/imgs/carousel.png',
  '/imgs/carousel.png',
  '/imgs/carousel.png',
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="flex justify-center h-full bg-black">
      <div className="flex items-center justify-center w-full">
        <button
          className="absolute left-0 p-2 bg-gray-800 text-white rounded-full m-10 z-10"
          onClick={prevSlide}
        >
          Prev
        </button>
        <div className="w-full overflow-hidden relative flex justify-center">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)`, width: '75%' }}
          >
            {images.map((image, index) => (
              <div key={index} className="max-w-full h-screen flex-shrink-0 relative m-4 flex items-center">
                <Image src={image} alt={`Slide ${index}`} width={1400} height={900} objectFit="cover" />
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute right-0 p-2 bg-gray-800 text-white rounded-full m-10 z-10"
          onClick={nextSlide}>
            Next
        </button>
      </div>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full flex justify-between px-4">
        <div className="w-1/6 overflow-hidden">
          <Image src={images[(currentIndex - 1 + images.length) % images.length]} alt="Previous slide" width={400} height={150} objectFit="cover" className="opacity-0" />
        </div>
        <div className="w-1/6 overflow-hidden">
          <Image src={images[(currentIndex + 1) % images.length]} alt="Next slide" width={200} height={150} objectFit="cover" className="opacity-0" />
        </div>
      </div>
      
    </div>
  );
};

export default Carousel;
