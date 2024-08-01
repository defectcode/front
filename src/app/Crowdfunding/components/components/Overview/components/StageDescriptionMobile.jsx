import React from "react";
import { stageDescriptionData, stageDescription } from '../constants/stagerData';
import DetailedStepsMobile from './DetailedStepsMobile';


const StageDescription = () => {
    return (
        <div id="overview" className="bg-black px-[20px] w-full flex flex-col items-start lg:items-center">
            <div>
                <h2 className="text-2xl text-[#FFFFFF] mt-10 mb-4 font-ekMukta font-semibold">
                    {stageDescriptionData.stageTitle}
                </h2>
                <p className="text-[#CDCDCD] text-[16px] w-auto font-ekMukta">
                    {stageDescriptionData.stageHistory2}
                </p>
                <img src={stageDescriptionData.imageUrl_1} alt="Stage Description" className="mt-5"/>
            </div>
            <div className="mt-5">
                <h2 className="text-2xl text-[#FFFFFF] font-ekMukta font-semibold">
                    {stageDescriptionData.fundingTitle}
                </h2>
                <div className="font-ekMukta text-[#CDCDCD]">
                    <p className="mt-4">
                        {stageDescription.fundingSubtitle}
                    </p>
                </div>
                <img src={stageDescriptionData.imageUrl_2} alt="Stage Description" className="mt-5"/>
            </div>
            <DetailedStepsMobile/>
            <style jsx>{`
                ul.list-small li::marker {
                    font-size: 0.7em; /* Ajustează dimensiunea după cum este necesar */
                }
            `}</style>
        </div>
    )
}

export default StageDescription;
