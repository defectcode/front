import React from 'react';
import StageDescription from './components/StageDescription';
import FundingBreakdown from './components/FundingBreakdown';

const Overview = () => {
    return (
        <div className="flex w-full">
            <div className="w-2/3">
                <StageDescription />
            </div>
            <div className="w-1/3">
                <FundingBreakdown />
            </div>
        </div>
    );
}

export default Overview;
