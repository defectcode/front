import React, { useState, useEffect } from "react";

const NavBarCrowdfundingMobile = ({ setActiveSection }) => {
    const [activeHash, setActiveHash] = useState('');
    const [isSticky, setIsSticky] = useState(false);
    const [initialOffsetTop, setInitialOffsetTop] = useState(0);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash || '#overview';
            setActiveHash(hash);
            setActiveSection(hash.substring(1));
        };

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;

            // Check if the current scroll position is greater than the initial offset
            if (currentScrollPos >= initialOffsetTop) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        const navbar = document.getElementById('navbar-mobile');
        if (navbar) {
            setInitialOffsetTop(navbar.offsetTop);
        }

        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('scroll', handleScroll);

        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [initialOffsetTop, setActiveSection]);

    useEffect(() => {
        const handleResize = () => {
            const navbar = document.getElementById('navbar-mobile');
            if (navbar) {
                setInitialOffsetTop(navbar.offsetTop);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
        <div id="navbar-mobile" className={`transition-all duration-300 ease-in-out ${isSticky ? 'fixed top-0 left-0 right-0 z-50 bg-[#1B1B1B]' : 'relative bg-black'}`}
        style={{
            marginTop: '-50px',  // Move the content upward
            paddingBottom: '50px'  // Adjust the spacing as needed
          }}>
            <div className="flex items-center justify-center h-[60px]">
                <div className="flex items-center justify-center gap-[30px] w-full px-5">
                    <a className={linkClasses('#overview')} onClick={() => handleClick('#overview')}>Overview</a>
                    <a className={linkClasses('#rewards')} onClick={() => handleClick('#rewards')}>Rewards</a>
                    <a className={linkClasses('#community')} onClick={() => handleClick('#community')}>Community</a>
                    <a className={linkClasses('#extras')} onClick={() => handleClick('#extras')}>Extras</a>
                </div>
            </div>
        </div>
    );
}

export default NavBarCrowdfundingMobile;
