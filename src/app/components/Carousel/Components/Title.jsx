import React from "react";
import { images } from './constants/carouselData';

const Title = ({ contentIndex = 0, isMobile }) => {
  const content = images[contentIndex];

  if (!content) {
    return null; // Sau un fallback UI
  }


  return (
    <div className={`space-y-1 ${isMobile ? 'p-0 text-center' : 'mt-14'} max-lg:-mt-16`}>
      <h1 className={`text-white font-semibold max-md:text-2xl ${isMobile ? 'text-lg' : 'text-4xl'}`} style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600 }}>
        {content.title}
      </h1>
      <p className={`text-[#FFFFFF] ${isMobile ? 'text-[16px] leading-5 w-4/5 ml-10' : 'w-2/4 text-[16px]'} max-sm:text-[16px]`} style={{ fontFamily: 'Ek Mukta, sans-serif', fontWeight: 400 }}>
        {content.description}
      </p>
    </div>
  );
};

export default Title;
