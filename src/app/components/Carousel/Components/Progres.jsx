import React from 'react';
import Button from './Button';

const FundraisingProgress = ({ raisedAmount, goalAmount }) => {
  const progressPercent = (raisedAmount / goalAmount) * 100;
  const circleLeftPosition = `${progressPercent}%`;

  return (
    <div className="flex flex-col space-y-3 w-5/6 max-lg:p-0 max-lg:space-y-2 max-md:mt-64">
      <h1 className="text-[#E60716] text-[32px] font-bold max-lg:text-3xl max-md:text-2xl max-md:-mb-2" style={{ fontFamily: 'Ek Mukta, sans-serif', fontWeight: 800 }}>
        Series Concept
      </h1>
      <div className="flex justify-between text-xl" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 400 }}>
        <p className="text-2xl max-lg:text-xl mb-3 max-md:text-[16px] text-[#FFFFFF] max-md:mt-2">Current Fundraising</p>
        <div className="flex gap-2 text-lg max-sm:text-md mt-2 mr-64 max-md:mr-0 max-md:text-[16px]">
          <p className="text-[#C1C1C1]">Stage</p>
          <p>1</p>
        </div>
      </div>
      <div className="relative w-2/3 max-md:w-full">
        <div className="h-1.5 bg-gray-600 rounded-full max-md:-mt-3">
          <div className="h-full rounded-full bg-gradient-to-r from-[#E50815] via-[#E50815] to-white" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <div className="absolute top-0 -translate-y-1/2 transform max-md:-mt-[11px] max-md:-ml-[2px]" style={{ left: circleLeftPosition }}>
          <div className="w-3 h-3 rounded-full bg-white border-2 mt-1"></div>
        </div>
      </div>
      <p className='text-xl max-lg:text-md mb-3 max-sm:text-[11px]' style={{ fontFamily: 'Ek Mukta, sans-serif' }}>
      <span className="font-bold">${raisedAmount}</span> raised of ${goalAmount} goal 
        <span className="mx-2 text-lg text-[#C1C1C1]">•</span> 
        <span className="font-bold">4.7K </span>
        <span>supporters</span>
      </p>
      <Button style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 700 }} />
    </div>
  );
};

export default FundraisingProgress;
