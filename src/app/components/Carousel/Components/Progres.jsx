import React from 'react';
import Button from './Button';
import { images } from './constants/carouselData';
import Image from 'next/image';

const FundraisingProgress = ({ raisedAmount, goalAmount, contentIndex = 0 }) => {
  const content = images[contentIndex];
  const progressPercent = (raisedAmount / goalAmount) * 100;
  const circleLeftPosition = `${progressPercent}%`;

  return (
    <div className="flex flex-col space-y-2 w-5/6 max-md:w-full max-lg:space-y-2 max-md:mt-[250px]">
      <h1
        className="text-[#E60716] text-[32px] font-extrabold max-lg:text-3xl max-md:text-2xl max-md:-mb-2"
        style={{ fontFamily: 'Ek Mukta, sans-serif', fontWeight: 800 }}
      >
        {content.titleConcept}
      </h1>
      <div
        className="flex items-center max-md:justify-between text-xl"
        style={{ fontFamily: 'Avenir Roman, sans-serif', fontWeight: 400 }}
      >
        <p className="text-xl max-lg:text-xl max-md:text-[16px] mb-1 text-[#FFFFFF] max-md:-mb-1">
          {content.subtitle}
        </p>
        <div
          className="flex gap-1 text-lg max-sm:text-md ml-[150px] max-md:ml-0 max-md:mr-0 max-md:text-[16px] max-md:-mb-1"
          style={{ fontFamily: 'Avenir, sans-serif' }}
        >
          <p className="text-[#C1C1C1] text-[16px]">{content.stageLabel}</p>
          <p className="font-bold text-[16px]">{content.stageNumber}</p>
        </div>
      </div>
      <div className="relative w-[380px] max-md:w-full">
        <div className="h-1 bg-gray-600 rounded-full">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#E50815] via-[#E50815] to-white"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div
          className="absolute top-0 -translate-y-1/2 transform mt-[2px]"
          style={{ left: circleLeftPosition }}
        >
          <div className={`w-[6px] h-[6px] rounded-full bg-white border-2`}></div>
        </div>
      </div>
      {content.status === 'Process' ? (
        <p
          className="flex items-end text-xl lg:text-md mb-3 md:mb-0 gap-1 max-lg:gap-[2px]  max-md:tracking--1p"
          style={{
            fontFamily: 'Ek Mukta, sans-serif',
            fontWeight: 400,
            letterSpacing: '-0.008rem',
          }}
        >
          <span className="font-semibold max-md:font-semibold max-md:text-[16px] flex">
            <Image
              src="/icons/symbol-white.svg"
              alt="$"
              width={6.5}
              height={1}
              className="w-[8px] max-md:w-[6px] max-md:mb-[2px] max-md:font-semibold"
            />
            {raisedAmount}
          </span>
          <span className="text-[#C1C1C1] text-[15px] max-md:text-[14px]">raised of</span>
          <span className="text-[#C1C1C1] text-[15px] max-md:text-[14px] flex">
            <Image
              src="/icons/symbol-gray.svg"
              alt="$"
              width={5.5}
              height={1}
              className="text-[#C1C1C1] w-[6px] max-md:w-[6px] max-md:ml-1"
            />
            {goalAmount}
          </span>
          <span className="text-[#C1C1C1] text-[15px] max-md:text-[14px] ">goal</span>
          {/* <span className="text-xl text-[#C1C1C1] max-md:text-[12px]  max-md:ml-[1px] max-md:mr-[1px]">
            •
          </span> */}
          {/* <span className="font-semibold max-md:font-semibold text-[14px] lg:text-[20px] md:text-[16px] sm:text-[14px] ">
            {content.supportersCount}
          </span>
          <span className="text-[#C1C1C1] text-[15px] max-md:text-[12px]  max-lg:-mt-3">
            {content.supportersLabel}
          </span> */}
        </p>
      ) : (
        <div>
          <p
            className="text-[#C1C1C1] text-[15px] max-lg:text-md max-sm:text-[12px]  max-md:p-0 max-md:-mt-2"
            style={{ fontFamily: 'Ek Mukta, sans-serif' }}>
            This stage is now closed
          </p>
        </div>
      )}
      {content.status === 'Process' && (
        <Button style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 700 }} />
      )}
    </div>
  );
};

export default FundraisingProgress;
