import React, { useState, useEffect, useRef } from "react";

const NavBarCrowdfundingMobile = ({ setActiveSection }) => {
    const [activeHash, setActiveHash] = useState('');
    const [isSticky, setIsSticky] = useState(false);
    const navbarRef = useRef(null);
    const placeholderRef = useRef(null);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash || '#overview';
            setActiveHash(hash);
            setActiveSection(hash.substring(1));
        };

        const handleScroll = () => {
            const navbar = navbarRef.current;
            const placeholder = placeholderRef.current;
            const currentScrollPos = window.pageYOffset;

            if (navbar && placeholder) {
                const navbarTop = placeholder.offsetTop;

                if (currentScrollPos > navbarTop && !isSticky) {
                    placeholder.style.height = `${navbar.offsetHeight}px`;
                    placeholder.style.backgroundColor = '#1B1B1B'; // Set background color when sticky
                    setIsSticky(true);
                } else if (currentScrollPos <= navbarTop && isSticky) {
                    setIsSticky(false);
                    placeholder.style.height = '0px';
                    placeholder.style.backgroundColor = 'transparent'; // Remove background color when not sticky
                }
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('scroll', handleScroll);

        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isSticky, setActiveSection]);

    const handleClick = (hash) => {
        window.location.hash = hash;
        setActiveHash(hash);
        setActiveSection(hash.substring(1));
    };

    const linkClasses = (hash) => {
        const baseClasses = 'px-1 py-[6px] text-[14px] flex justify-center items-center mt-2 w-full';
        const activeClasses = 'text-[#F1F1F1] border-b-2 border-[#F1F1F1] font-avenir-heavy';
        const inactiveClasses = 'text-[#979797] border-b-4 border-transparent font-avenir';

        return `${baseClasses} ${activeHash === hash ? activeClasses : inactiveClasses}`;
    };

    return (
        <>
            <div ref={placeholderRef} className="w-full transition-all duration-500 ease-in-out" />
            <div 
                ref={navbarRef}
                id="navbar-mobile" 
                className={`transition-all duration-300 ease-in-out ${
                    isSticky ? `fixed top-0 left-0 right-0 z-50 bg-[#1B1B1B]`
                             : 'relative bg-black'
                }`}
                style={{ transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out' }}
            >
                <div className="flex items-center justify-center h-[60px]">
                    <div className="flex items-center justify-center gap-[30px] w-full px-5">
                        <a className={linkClasses('#overview')} onClick={() => handleClick('#overview')}>Overview</a>
                        <a className={linkClasses('#rewards')} onClick={() => handleClick('#rewards')}>Rewards</a>
                        <a className={linkClasses('#community')} onClick={() => handleClick('#community')}>Community</a>
                        <a className={linkClasses('#extras')} onClick={() => handleClick('#extras')}>Extras</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBarCrowdfundingMobile;
