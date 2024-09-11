import React, { useState, useEffect } from "react";
import SupportNavBar from "../app/components/Header/components/SupportNavBar";
import Static from "../app/components/Header/components/Static";
import HeaderCrowdfunding from '../app/Crowdfunding/HeaderCrowdfunding';
import HeaderCrowdfundingMobile from '../app/Crowdfunding/HeaderCrowdfundingMobile';
import NavBarCrowdfunding from '../app/Crowdfunding/components/NavBarCrowdfunding';
import useDeviceType from '../app/Crowdfunding/components/hooks/useDeviceType';
import ButonShere from '../app/Crowdfunding/components/mobile/ButonShere';
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
            <Static />
            {isMobile ? (
                <>
                    {/* HeaderCrowdfundingMobile fără modificări */}
                    <HeaderCrowdfundingMobile />
                    {/* Ajustare cu margin-top: -30px pentru toate componentele mobile în afară de HeaderCrowdfundingMobile */}
                    <div> {/* Modificat cu -40px */}
                    <NavBarCrowdfundingMobile setActiveSection={setActiveSection} />
                        {renderSection()}
                        <ButonShere />
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
