import React from "react";
import { stageDescriptionData, stageDescription } from '../constants/stagerData';
import DetailedStepsMobile from './DetailedStepsMobile';

const StageDescription = () => {
    return (
        <div id="overview" className="bg-black px-[20px] w-full flex flex-col items-start lg:items-center">
            <div>
                <h2 className="text-3xl text-[#FFFFFF] mt-10 mb-4 font-ekMukta font-semibold">
                    {stageDescriptionData.stageTitle}
                </h2>
                <p className="text-[#CDCDCD] max-w-[764px] w-auto font-ekMukta">
                    {stageDescriptionData.stageHistory}
                </p>
                <img src={stageDescriptionData.imageUrl_1} alt="Stage Description" className="mt-10"/>
            </div>
            <div className="mt-10">
                <h2 className="text-3xl text-[#FFFFFF] font-ekMukta font-semibold">
                    {stageDescriptionData.fundingTitle}
                </h2>
                <div className="font-ekMukta text-[#CDCDCD]">
                    <p className="mt-4">
                        {stageDescriptionData.fundingProgress}
                        <br />
                        {stageDescriptionData.requiredAmount}
                        <br />
                        {stageDescriptionData.monthlyCostsTitle}
                    </p>
                    <ul className="list-disc list-inside list-small ml-2">
                        {stageDescriptionData.monthlyCosts.map((cost, index) => (
                            <li key={index}>{cost.item}: {cost.cost}</li>
                        ))}
                    </ul>
                    <p className="mt-4">
                        {stageDescriptionData.totalMonthlyCosts}
                    </p>
                </div>
                <img src={stageDescriptionData.imageUrl_2} alt="Stage Description" className="mt-10"/>
            </div>
            {/* <DetailedSteps/> */}
            <style jsx>{`
                ul.list-small li::marker {
                    font-size: 0.7em; /* Ajustează dimensiunea după cum este necesar */
                }
            `}</style>
        </div>
    )
}

export default StageDescription;

