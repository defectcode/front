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

    useEffect(() => {
        console.log('activeHash:', activeHash);
    }, [activeHash]);

    const handleClick = (hash) => {
        window.location.hash = hash;
        setActiveHash(hash);
        setActiveSection(hash.substring(1));
    };

    const linkClasses = (hash) => `px-3 py-[6px] border-2 rounded-lg text-[14px] flex justify-center items-center font-ekmukta ${activeHash === hash ? 'bg-[#F1F1F1] text-[#272727] border-transparent' : 'bg-[#272727] text-[#F1F1F1] border-transparent'}`;

    return (
        <div className="flex items-center justify-between px-2 lg:px-[122px] w-full h-[60px] bg-[#1B1B1B] gap-2">
            <div className="flex items-center">
                <Link legacyBehavior href='/'>
                    <a className="text-[#737373]"><IoIosArrowBack /></a>
                </Link>
            </div>
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
