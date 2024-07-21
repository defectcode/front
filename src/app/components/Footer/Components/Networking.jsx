import React from "react";
import Image from "next/image";
import Link from "next/link";



const Networking = () => {
    return (
        <div className="bg-black max-w-screen-2xl w-[1500px] h-[120px] max-md:h-auto max-md:w-auto py-4 mt-14 max-md:mt-5 rounded-xl flex flex-col lg:flex-row items-center justify-between px-10">
            <div className="mb-4 lg:mb-0">
                <Image src='/imgs/logo.svg' alt="logo" width={98} height={1} />
            </div>
            <div className="mb-4 lg:mb-0">
                <p className="text-[#A1A1A1] text-[14px] text-center max-md:text-[10px]">
                    Copyright (c) 2024 Fyne Inc. All rights reserved.
                </p>
            </div>
            <div className="flex gap-5">
                <Link href='https://www.youtube.com/'><Image src='/icons/youtube.png' alt="youtube" width={25} height={25}/></Link>
                <Link href='https://www.facebook.com/'><Image src='/icons/facebook.png' alt="facebook" width={25} height={25}/></Link>
                <Link href='https://www.tiktok.com/'><Image src='/icons/tiktok.png' alt="tiktok" width={25} height={25}/></Link>
                <Link href='https://x.com/'><Image src='/icons/twitter.png' alt="twitter" width={25} height={25}/></Link>
                <Link href='https://www.instagram.com/'><Image src='/icons/instagram.png' alt="instagram" width={25} height={25}/></Link>
            </div>
        </div>
    )
}

export default Networking;