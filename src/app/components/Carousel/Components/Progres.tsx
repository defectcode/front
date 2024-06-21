import React from 'react';
import Button from './Button';

const FundraisingProgress = ({ raisedAmount, goalAmount }) => {
    const progressPercent = (raisedAmount / goalAmount) * 100;

    const circleLeftPosition = `${progressPercent}%`;

    return (
        <div className="flex flex-col space-y-3 w-5/6 max-lg:p-0 max-lg:space-y-2 ">
            <h1 className="text-[#E50815] text-6xl font-bold max-lg:text-3xl max-md:text-xl">Series Concept</h1>
            <div className="flex justify-between text-xl">
                <p className="text-3xl max-lg:text-xl max-md:text-md">Current Fundraising</p>
                <div className="flex gap-2 text-3xl max-sm:text-md">
                    <p className="text-white">Stage</p>
                    <p>1</p>
                </div>
            </div>
            <div className="relative">
                <div className="h-1.5 bg-gray-600 rounded-full">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#E50815] via-[#E50815] to-white" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <div className="absolute top-0 -translate-y-1/2 transform" style={{ left: circleLeftPosition }}>
                    <div className="w-3 h-3 rounded-full bg-white border-2 mt-1"></div>
                </div>
            </div>
            <p className='text-2xl max-lg:text-md'>${raisedAmount} raised of ${goalAmount} goal 4.7K supporters</p>
            <Button/>
        </div>
    );
};

export default FundraisingProgress;
