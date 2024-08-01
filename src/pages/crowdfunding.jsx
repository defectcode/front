import React, { useState, useEffect } from "react";
import Navbar from "../app/components/Header/components/Navbar";
import HeaderCrowdfunding from '../app/Crowdfunding/HeaderCrowdfunding';
import NavBarCrowdfunding from '../app/Crowdfunding/components/NavBarCrowdfunding';
import NavBarCrowdfundingMobile from '../app/Crowdfunding/components/mobile/NavBarCrowdfundingMobile';
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
        <div>
            <Navbar />
            <HeaderCrowdfunding />
            {isMobile ? <NavBarCrowdfundingMobile setActiveSection={setActiveSection} /> : <NavBarCrowdfunding setActiveSection={setActiveSection} />}
            <div>
                {renderSection()}
            </div>
        </div>
    );
}

export default Crowdfunding;