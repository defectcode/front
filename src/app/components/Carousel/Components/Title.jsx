import React from 'react';
import { images } from './constants/carouselData';

const Title = ({ contentIndex = 0, isMobile, isTablet }) => {
  const content = images[contentIndex];

  if (!content) {
    return null; // Or fallback UI
  }

  return (
    <div className={`space-y-1 ${isMobile ? 'text-center text-[15px]' : isTablet ? 'mt-14 flex items-center justify-center' : 'mt-20'} w-full`}>
      <h1 className={`text-white font-semibold ${isMobile ? 'text-2xl' : 'text-4xl'} max-md:text-2xl`} style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600 }}>
        {content.title}
      </h1>
      <p className={`text-[#FFFFFF] ${isMobile ? 'text-[14px] leading-5 w-full' : 'w-full text-[16px]'} `} style={{ fontFamily: 'Ek Mukta, sans-serif', fontWeight: 400 }}>
        {content.description}
      </p>
    </div>
  );
};

export default Title;
