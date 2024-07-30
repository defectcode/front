import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Support from '../components/Support';

const NavBarCrowdfunding = () => {
    const router = useRouter();

    const linkClasses = (path) => `px-3 py-1 border-2 rounded-xl font-ekmukta ${router.pathname === path ? 'bg-white text-black border-white' : 'bg-[#272727] text-[#F1F1F1] border-transparent '}`;

    return (
        <div className="flex items-center justify-between px-5 lg:px-[122px] w-full h-[60px] bg-[#1B1B1B]">
            <div className="flex items-center gap-5">
                <Link legacyBehavior href="/">
                    <a className={linkClasses('/')}>Overview</a>
                </Link>
                <Link legacyBehavior href="/page2">
                    <a className={linkClasses('/page2')}>Rewards</a>
                </Link>
                <Link legacyBehavior href="/page3">
                    <a className={linkClasses('/page3')}>Community</a>
                </Link>
                <Link legacyBehavior href="/page4">
                    <a className={linkClasses('/page4')}>Extras</a>
                </Link>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="flex items-center h-full">
                    <Support />
                </div>
                <button className="text-white border border-white px-3 py-1 rounded-full hover:bg-white hover:text-black">Share</button>
            </div>
        </div>
    );
}

export default NavBarCrowdfunding;
