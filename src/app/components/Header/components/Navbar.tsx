'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Funcție pentru a închide meniul
    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="bg-gray-900 bg-opacity-40 fixed top-0 w-full z-50">
            <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 py-4">
                <div>
                    <Image src="/imgs/logo.png" alt='logo' className='w-24 h-auto' width={96} height={1} />
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <AiOutlineClose className="text-white w-8 h-8" /> : <AiOutlineMenu className="text-white w-8 h-8" />}
                    </button>
                </div>
                <ul className={`flex-col md:flex md:flex-row gap-10 text-lg text-gray-400 fixed md:static top-0 right-0 h-screen md:h-auto bg-opacity-50 transition-transform transform ${isOpen ? 'translate-x-1 bg-gray-950' : 'translate-x-full'} md:translate-x-0 md:w-auto w-2/3 pt-20 md:pt-0`}>
                    <li className="mt-4 md:mt-0 md:ml-0 ml-4"><Link legacyBehavior href="/interactive"><a onClick={closeMenu} className="hover:text-gray-300">Interactive</a></Link></li>
                    <li className="mt-4 md:mt-0 md:ml-0 ml-4"><Link legacyBehavior href="/about"><a onClick={closeMenu} className="hover:text-gray-300">About</a></Link></li>
                    <li className="mt-4 md:mt-0 md:ml-0 ml-4"><Link legacyBehavior href="/crowdfunding"><a onClick={closeMenu} className="hover:text-gray-300">Crowdfunding</a></Link></li>
                    <li className="mt-4 md:mt-0 md:ml-0 ml-4"><Link legacyBehavior href="/contact"><a onClick={closeMenu} className="hover:text-gray-300">Contact Us</a></Link></li>
                </ul>
                <div className='hidden md:flex gap-5'>
                    <Link href="/"><AiOutlineUser className='flex w-8' /></Link>
                </div>
                {isOpen && (
                    <button className="absolute top-4 right-4 md:hidden" onClick={closeMenu}>
                        <AiOutlineClose className="text-white w-8 h-8" />
                    </button>
                )}
            </div>
        </nav>
    );
}
