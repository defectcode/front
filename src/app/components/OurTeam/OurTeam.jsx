import React from "react";
import Carousel from './components/Carousel';


const OurTeam = () => {
    return (
        <div className="h-auto">
            <div className="w-auto h-[550px] lg:h-[854px] lg:pl-[121px] bg-black md:bg-[#0D0D0D]">
                <div className="text-white pt-7 md:pt-8 lg:pt-12 gap-2 pl-[20px] lg:pl-0">
                    <h1 className="text-3xl font-semibold font-roboto max-md:absolute">Our Team</h1>
                    <p className="w-[306px] lg:w-[266px] text-[16px] font-ekmukta mt-10 lg:mb-0 max-md:relative">Creative visionaries united by a passion for storytelling and innovation</p>
                </div>
                <div className="lg:-ml-[20px]">
                    <Carousel/>
                </div>
            </div>
        </div>
    );
};

export default OurTeam;
