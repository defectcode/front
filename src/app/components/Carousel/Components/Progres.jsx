import React from 'react';
import Button from './Button';
import { images } from './constants/carouselData'; // Importă conținutul

const FundraisingProgress = ({ raisedAmount, goalAmount, contentIndex = 0 }) => {
  const content = images[contentIndex]; // Selectează conținutul pe baza indexului
  const progressPercent = (raisedAmount / goalAmount) * 100;
  const circleLeftPosition = `${progressPercent}%`;

  return (
    <div className="flex flex-col space-y-3 w-5/6 max-md:w-full max-lg:p-0 max-lg:space-y-1 max-md:mt-[270px]">
      <h1 className="text-[#ff0011] text-[32px] font-extrabold max-lg:text-3xl max-md:text-2xl max-md:-mb-2" style={{ fontFamily: 'Ek Mukta, sans-serif', fontWeight: 800 }}>
        {content.titleConcept}
      </h1>
      <div className="flex justify-between text-xl" style={{ fontFamily: 'Avenir Roman, sans-serif', fontWeight: 400 }}>
        <p className="text-xl max-lg:text-xl mb-1 max-md:text-[16px] text-[#FFFFFF] max-md:mt-2">{content.subtitle}</p>
        <div className="flex gap-2 text-lg max-sm:text-md mt-1 mr-[205px] max-md:mr-0 max-md:text-[16px]">
          <p className="text-[#C1C1C1] text-[16px]">{content.stageLabel}</p>
          <p className='font-bold text-[16px]'>{content.stageNumber}</p>
        </div>
      </div>
      <div className="relative w-2/3 max-md:w-full">
        <div className="h-1.5 bg-gray-600 rounded-full max-md:-mt-3">
          <div className="h-full rounded-full bg-gradient-to-r from-[#ff0011] via-[#ff0011] to-white" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <div className="absolute top-0 -translate-y-1/2 transform max-md:-mt-[11px] max-md:-ml-[2px]" style={{ left: circleLeftPosition }}>
          <div className="w-3 h-3 rounded-full bg-white border-2 mt-1"></div>
        </div>
      </div>
      {content.status === 'Process' ? (
        <p className='flex items-end text-xl max-lg:text-md mb-3 max-md:mb-0 max-sm:text-[11px] max-md:gap-[2px] max-md:whitespace-nowrap' style={{ fontFamily: 'Ek Mukta, sans-serif' }}>
          <span className="font-bold">${raisedAmount}</span>
          <span className="text-[#C1C1C1] font-ekMukta text-[15px] ml-1">raised of</span>
          <span className="ml-1">${goalAmount}</span>
          <span className="text-[#C1C1C1] font-ekMukta text-[15px] ml-1">goal</span>
          <span className="mx-[2px] text-xl text-[#C1C1C1]">•</span>
          <span className="font-bold ml-1">{content.supportersCount}</span>
          <span className='text-[#C1C1C1] font-ekMukta text-[15px] ml-1'>{content.supportersLabel}</span>
        </p>
      
      ) : (
        <p className='text-md max-lg:text-md mb-3 max-sm:text-[11px]' style={{ fontFamily: 'Ek Mukta, sans-serif' }}>
          This stage is now closed
        </p>
      )}
      <Button style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 700 }} />
    </div>
  );
};

export default FundraisingProgress;
