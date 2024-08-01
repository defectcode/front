import React from "react";
import { detailedStepsData, stageDescriptionData, stageDescription } from '../constants/stagerData';

const DetailedStepsMobile = () => {
    return (
        <div className="">
            <div className="mt-5">
                <h2 className="text-[26px] text-[#FFFFFF] font-ekMukta font-semibold">{detailedStepsData.title}</h2>
                <div className="font-ekMukta text-[#CDCDCD] mt-4">
                    {detailedStepsData.steps.map((step, index) => (
                        <div key={index} className="mt-6">
                            <h3 className="text-[16px] text-[#E60716]">
                                {index + 1}.  {step.title}
                            </h3>
                            <ul className="list-disc list-inside list-small ml-2">
                                {step.items.map((item, idx) => (
                                    <li key={idx}>
                                        <span className="text-[#CDCDCD] text-[16px] max-w-[280px] font-ekMukta">{item.item}: {item.cost}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <img src={stageDescriptionData.imageUrl_3} alt="Stage Description" className="mt-5"/> 
            <div className="my-5">
                <p className="text-[#CDCDCD] w-full text-[16px]">{stageDescription.helpInfo2}</p>
            </div>
            <style jsx>{`
                ul.list-small li::marker {
                    font-size: 0.7em; /* Adjusted font size for list markers */
                }
            `}</style>
        </div>
    )
}

export default DetailedStepsMobile;
