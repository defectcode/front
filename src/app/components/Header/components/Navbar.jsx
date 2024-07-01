'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Support from './Support';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="bg-black bg-opacity-25 fixed top-0 w-full max-md:h-10 z-50">
            <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-2 py-2 max-md:mx-4">
                <div>
                    <Link href="/"><Image src="/imgs/logo.svg" alt='logo' className='w-20 h-auto' width={110} height={1} /></Link>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="transition-opacity">
                        {isOpen ? <AiOutlineClose className="text-white w-8 h-8 max-md:w-5 max-md:h-5" /> : <Image src="/imgs/burgher.svg" alt='burgher' width={40} height={1} className="text-white w-8 h-8 max-md:w-[20px] max-md:h-[12px]" />}
                    </button>
                </div>
                <ul className={`flex-col md:flex md:flex-row gap-10 text-lg md:text-white fixed md:static top-0 right-0 h-screen md:h-auto transition-transform transform ${isOpen ? 'translate-x-0 max-md:bg-black max-md:bg-opacity-100 text-white' : 'translate-x-full bg-opacity-50'} md:translate-x-0 md:w-auto w-2/3 pt-20 md:pt-0`}>
                    <button className="absolute top-4 right-4 md:hidden" onClick={closeMenu}>
                        <AiOutlineClose className="text-white w-6 h-6 mt-2" />
                    </button>
                    <li className="mt-8 md:mt-0 md:ml-0 ml-4"><Link legacyBehavior href="/interactive"><a onClick={closeMenu} className="hover:text-gray-300 text-3xl md:text-lg">Interactive</a></Link></li>
                    <li className="mt-8 md:mt-0 md:ml-0 ml-4"><Link legacyBehavior href="/about"><a onClick={closeMenu} className="hover:text-gray-300 text-3xl md:text-lg">About</a></Link></li>
                    <li className="mt-8 md:mt-0 md:ml-0 ml-4"><Link legacyBehavior href="/crowdfunding"><a onClick={closeMenu} className="hover:text-gray-300 text-3xl md:text-lg">Crowdfunding</a></Link></li>
                    <li className="mt-8 md:mt-0 md:ml-0 ml-4"><Link legacyBehavior href="/contact"><a onClick={closeMenu} className="hover:text-gray-300 text-3xl md:text-lg">Contact Us</a></Link></li>
                    <li className="mt-8 md:mt-0 md:ml-0 ml-4"><Link legacyBehavior href="/careers"><a onClick={closeMenu} className="hover:text-gray-300 text-3xl md:text-lg">Careers</a></Link></li>
                    <div className="md:hidden absolute bottom-4 w-full flex justify-center">
                        <Link href="/"><Image src="/imgs/logo.svg" alt='logo' className='w-32 h-auto mb-10' width={200} height={50} /></Link>
                    </div>
                </ul>
                <div className='hidden md:flex gap-5 text-white'>
                    <Link href="/"><AiOutlineUser className='flex w-auto h-6' /></Link>
                </div>
            </div>
        </nav>
    );
}
