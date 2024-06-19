import Image from 'next/image';
import React from 'react';
import Navbar from './components/Navbar';
import Button from './components/Button';
import Icons from './components/Icons';

export default function Header() {
    return (
        <div className="bg-cover bg-center bg-no-repeat h-screen text-white" style={{ backgroundImage: `url('/imgs/background.png')` }}>
            <Navbar />
            <div className="max-w-screen-2xl mx-auto h-full flex flex-col text-white max-2xl:p-4">
                <div className='flex-grow flex flex-col justify-end max-2xl:p-2'>
                    <div className='flex justify-between mb-10 max-lg:flex-col max-lg:justify-center'>
                        <div className='flex gap-3 items-center max-lg:flex-col max-lg:justify-center'>
                            <Button />
                            <div className='space-y-1'>
                                <p className='text-xl max-lg:text-lg max-md:text-sm max-lg:text-center'>In an ideal city without money, people fight real human problems. Your support makes the series possible.</p>
                                <div className='flex items-center gap-4 text-[#979797] max-lg:flex-col max-lg:space-y-[-10px]'>
                                    <h3 className='text-lg'>Drama Sci-Fi 2024</h3>
                                    <div className='flex gap-2'>
                                        <Image src="/imgs/sony.svg" width={64} height={1} alt='sony' className='max-lg:w-14' />
                                        <Image src="/imgs/netflix.svg" width={64} height={1} alt='netflix' className='max-lg:w-14' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Icons/>     
                    </div>
                </div>
            </div>
        </div>
    );
}
