import React from 'react';
import { images } from './constants/carouselData';

const Title = ({ contentIndex = 0, isMobile, isTablet }) => {
  const content = images[contentIndex];

  if (!content) {
    return null; // Sau un fallback UI
  }

  return (
    <div className={`space-y-1 ${isMobile ? 'text-center' : isTablet ? 'mt-14 flex items-center justify-center' : 'mt-20'} `}>
      <h1 className={`text-white font-semibold ${isMobile ? 'text-2xl' : 'text-4xl'} max-md:text-2xl`} style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600 }}>
        {content.title}
      </h1>
      <p className={`text-[#FFFFFF] ${isMobile ? 'text-[16px] leading-5 w-full' : 'w-3/5 text-[16px]'}`} style={{ fontFamily: 'Ek Mukta, sans-serif', fontWeight: 400 }}>
        {content.description}
      </p>
    </div>
  );
};

export default Title;
