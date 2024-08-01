import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";

const NavBarCrowdfundingMobile = ({ setActiveSection }) => {
    const [activeHash, setActiveHash] = useState('');

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash || '#overview';
            setActiveHash(hash);
            setActiveSection(hash.substring(1));
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [setActiveSection]);

    const handleClick = (hash) => {
        window.location.hash = hash;
        setActiveHash(hash);
        setActiveSection(hash.substring(1));
    };

    const linkClasses = (hash) => `px-3 py-[6px] text-[14px] flex justify-center items-center font-ekmukta mt-2 ${activeHash === hash ? 'text-[#F1F1F1] border-b-2 border-[#F1F1F1]' : 'text-[#979797] border-b-4 border-transparent'}`;

    return (
        <div className="flex items-center justify-around px-5 h-[60px] bg-black gap-[40px]">
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap custom-scrollbar">
                <a className={linkClasses('#overview')} onClick={() => handleClick('#overview')}>Overview</a>
                <a className={linkClasses('#rewards')} onClick={() => handleClick('#rewards')}>Rewards</a>
                <a className={linkClasses('#community')} onClick={() => handleClick('#community')}>Community</a>
                <a className={linkClasses('#extras')} onClick={() => handleClick('#extras')}>Extras</a>
            </div>
        </div>
    );
}

export default NavBarCrowdfundingMobile;
