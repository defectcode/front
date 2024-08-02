import React from "react";
import FundraisingProgress from './components/Progres';
import Title from "./components/Title";
import { images } from './constants/carouselData';

const HeaderCrowdfunding = () => {
    const currentData = images[0];

    return (
        <div>
            <div className="relative bg-cover bg-center min-h-screen bg-no-repeat bg-mobile sm:bg-desktop">
                <div className="absolute top-0 right-0 h-full w-full sm:w-[60%] bg-gradient-to-t sm:bg-gradient-to-r from-black/95 to-transparent sm:from-transparent sm:via-black/90 sm:to-black/90 flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-0 lg:pl-[150px]">
                    <div className="flex flex-col gap-4 sm:gap-20 mb-10 lg:mb-0">
                        <Title title={currentData.title} description={currentData.description} />
                        <FundraisingProgress data={currentData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderCrowdfunding;
