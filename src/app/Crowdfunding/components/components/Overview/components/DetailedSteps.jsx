import React from "react";
import { stageDescription, stageDescriptionData } from '../constants/stagerData';

const DetailedSteps = () => {
    return (
        <div>
            <div className="mt-10">
                <h2 className="text-[26px] text-[#FFFFFF] font-ekMukta font-semibold">Detailed Steps</h2>
                <div className="font-ekMukta text-[#CDCDCD] mt-4">
                    {stageDescription.detailedSteps.map((step, index) => (
                        <div key={index} className="mt-6">
                            <h3 className="text-xl text-[#E60716] font-semibold">
                                {index + 1}.  {step.title}
                            </h3>
                            <ul className="list-disc list-inside list-small ml-2 w-[484px]">
                                {step.items.map((item, idx) => (
                                    <li key={idx}>
                                        <span className="font-bold text-[#FFFFFF] text-[16px] font-ekMukta">{item.item}:</span> <span className="text-[#CDCDCD] text-[16px] font-ekMukta">{item.cost}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <img src={stageDescriptionData.imageUrl_3} alt="Stage Description" className="mt-10 ml-[70px]"/>
            <div className="my-10">
                <h2 className="text-[#FFFFFF] font-ekMukta font-semibold text-[26px]">{stageDescription.helpTitle}</h2>
                <p className="text-[#CDCDCD] w-[764px] text-[16px]">{stageDescription.helpInfo}</p>
            </div>
            <style jsx>{`
                ul.list-small li::marker {
                    font-size: 0.7em; /* Ajustează dimensiunea după cum este necesar */
                }
            `}</style>
        </div>
    )
}

export default DetailedSteps;
