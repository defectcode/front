// Components/DotsIndicator.js
import React from 'react';

const Dots = ({ totalImages, currentIndex, isMobile }) => {
  return (
    <div className={`absolute ${isMobile ? 'bottom-28' : 'top-[690px]'} left-1/2 transform -translate-x-1/2 flex space-x-3`}>
      {Array.from({ length: totalImages }).map((_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full ${
            currentIndex === index + 1 ? 'bg-white' : 'bg-gray-400'
          }`}
        ></div>
      ))}
    </div>
  );
};

export default Dots;
