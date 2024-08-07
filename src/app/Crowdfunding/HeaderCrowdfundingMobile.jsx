import React, { useState, useEffect } from "react";
import FundraisingProgress from './components/Progres';
import Title from "./components/Title";
import { images } from './constants/carouselData';

const HeaderCrowdfundingMobile = () => {
    const currentData = images[0];
    const [isMobile, setIsMobile] = useState(false);
    const [backgroundHeight, setBackgroundHeight] = useState('100vh');

    useEffect(() => {
        const handleResize = () => {
            const isMobileView = window.innerWidth <= 768;
            setIsMobile(isMobileView);

            // Calculate the height required for the content and set it to the background
            const contentHeight = document.querySelector('.content').clientHeight;
            const viewportHeight = window.innerHeight;
            const newHeight = Math.max(contentHeight, viewportHeight);
            setBackgroundHeight(`${newHeight}px`);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <div 
                className={`flex-grow relative bg-cover bg-center bg-no-repeat ${isMobile ? 'bg-mobile' : 'bg-desktop'}`}
                style={{ height: backgroundHeight }}
            >
                <div className="absolute inset-0 flex flex-col justify-center sm:justify-end p-4 bg-gradient-to-t from-black/95 via-black/95 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-black/90 sm:to-black/90">
                    <div className="max-w-screen-lg w-full flex flex-col gap-4 sm:gap-8 mb-2 lg:mb-0 p-4 lg:px-[50px] adjust-margin content">
                        <Title title={currentData.title} description={currentData.description} />
                        <FundraisingProgress data={currentData} />
                    </div>
                </div>
            </div>
            <style jsx>{`
                .header {
                    width: 100%;
                }

                .adjust-margin {
                    margin-top: -10px;
                }

                @media (max-width: 640px) {
                    .bg-gradient-to-t {
                        height: 50%; 
                        bottom: 0; 
                        top: auto;
                    }
                }
            `}</style>
        </div>
    );
}

export default HeaderCrowdfundingMobile;
