import React from "react";
import FundraisingProgress from './components/Progres';
import Title from "./components/Title";
import { images } from './constants/carouselData';
import styles from './style/Header.module.css';

const HeaderCrowdfundingMobile = () => {
    const currentData = images[0];

    return (
        <div className={`header flex flex-col bg-black ${styles.headerCrowdfunding}`} style={{ height: '100vh' }}>
            <div className="relative flex-grow" style={{ flexBasis: '67%' }}>
                <div className={`${styles.bgMobile}`} style={{ height: '100%' }}>
                    <div
                        style={{
                            height: '100%',
                            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 20%), url(${currentData.imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            WebkitBackgroundClip: 'padding-box',
                            backgroundClip: 'padding-box',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>
                </div>
            </div>

            <div className="bg-black flex flex-col justify-start px-5" style={{ flexBasis: '33%' }}>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        filter: 'blur(40px)',
                        WebkitFilter: 'blur(40px)',
                        zIndex: 1,
                        background: 'linear-gradient(to top left, rgba(40, 40, 40, 0.4), rgba(0, 0, 0, 0))',
                        backgroundRepeat: 'no-repeat',
                    }}
                ></div>

                <div className="max-w-screen-lg w-full flex flex-col gap-4 mb-2 relative z-10"
                    style={{
                        marginTop: '-7vh',
                        paddingBottom: '7vh',
                        fontSize: 'calc(1rem + 0.5vw)',
                    }}
                >
                    <Title title={currentData.title} description={currentData.description} />
                    <FundraisingProgress data={currentData} />
                </div>
            </div>
        </div>
    );
};

export default HeaderCrowdfundingMobile;
