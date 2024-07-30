import React from "react";
import Navbar from "../app/components/Header/components/Navbar";
import HeaderCrowdfunding from '../app/Crowdfunding/HeaderCrowdfunding'
import NavBarCrowdfunding from '../app/Crowdfunding/components/NavBarCrowdfunding'

const Crowdfunding = () => {
    return (
        <div>
            <Navbar/>
            <HeaderCrowdfunding/>
            <NavBarCrowdfunding/>
        </div>
    );
}

export default Crowdfunding;
