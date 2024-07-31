import React from 'react';
import StageDescription from './components/StageDescription';
import FundingBreakdown from './components/FundingBreakdown';

const Overview = () => {
    return (
        <div className="flex">
            <StageDescription />
            <FundingBreakdown />
        </div>
    );
}

export default Overview;
