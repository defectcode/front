import React, { useState, useEffect, useRef } from "react";
import Static from "../app/components/Header/components/Static";
import HeaderCrowdfunding from '../app/Crowdfunding/HeaderCrowdfunding';
import HeaderCrowdfundingMobile from '../app/Crowdfunding/HeaderCrowdfundingMobile';
import NavBarCrowdfunding from '../app/Crowdfunding/components/NavBarCrowdfunding';
import useDeviceType from '../app/Crowdfunding/components/hooks/useDeviceType';
import Rewards from '../app/Crowdfunding/components/components/Rewards/Rewards';
import Community from '../app/Crowdfunding/components/components/Community/Community';
import Extras from '../app/Crowdfunding/components/components/Extras/Extras';
import Overview from '../app/Crowdfunding/components/components/Overview/Overview';
import OverviewMobile from "../app/Crowdfunding/components/components/Overview/OverviewMobile";
import RewardsMobile from "../app/Crowdfunding/components/components/Rewards/RewardsMobile";
import CommunityMobile from "../app/Crowdfunding/components/components/Community/CommunityMobile";
import ExtrasMobile from "../app/Crowdfunding/components/components/Extras/ExtrasMobile";
import Footer from '../app/components/Footer/Footer';
import FooterMobileOverview from '../app/components/Footer/FooterMobileOverview';
import NavBarCrowdfundingMobile from '../app/Crowdfunding/components/mobile/NavBarCrowdfundingMobile.jsx';


const Crowdfunding = () => {
    const isMobile = useDeviceType();
    const [activeSection, setActiveSection] = useState('overview');
    const staticRef = useRef(null);
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);

    useEffect(() => {
        if (window.location.hash) {
            setActiveSection(window.location.hash.substring(1));
        }

        const handleHashChange = () => {
            setActiveSection(window.location.hash.substring(1));
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsNavBarVisible(!entry.isIntersecting); // Setează bara de navigare ca vizibilă doar când Static iese complet din vizor
        }, { threshold: 0 }); // Bara de navigare va apărea când Static este complet invizibil

        if (staticRef.current) {
            observer.observe(staticRef.current);
        }
        return () => {
            if (staticRef.current) {
                observer.unobserve(staticRef.current);
            }
        };
    }, []);

    const renderSection = () => {
        switch (activeSection) {
            case 'overview':
                return isMobile ? <OverviewMobile /> : <Overview />;
            case 'rewards':
                return isMobile ? <RewardsMobile /> : <Rewards />;
            case 'community':
                return isMobile ? <CommunityMobile /> : <Community />;
            case 'extras':
                return isMobile ? <ExtrasMobile /> : <Extras />;
            default:
                return isMobile ? <OverviewMobile /> : <Overview />;
        }
    };

    return (
        <div className="lg:mb-0 bg-black h-auto">
            {/* Ref pentru componenta Static */}
            <div ref={staticRef}>
                <Static />
            </div>
            
            {/* NavBarCrowdfundingMobile este afișată doar dacă Static este invizibil complet */}
            {isNavBarVisible && isMobile && (
                <div className="fixed top-0 left-0 right-0 z-50">
                    <NavBarCrowdfundingMobile setActiveSection={setActiveSection} />
                </div>
            )}
            {isMobile ? (
                <>
                    <HeaderCrowdfundingMobile />
                    <div> {/* Modificat cu -40px */}
                        {renderSection()}
                        <FooterMobileOverview />
                    </div>
                </>
            ) : (
                <>
                    <HeaderCrowdfunding />
                    <NavBarCrowdfunding setActiveSection={setActiveSection} />
                    {renderSection()}
                    <Footer />
                </>
            )}
        </div>
    );
};

export default Crowdfunding;

