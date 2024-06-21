import Image from "next/image";
import Link from "next/link";


const Footer = () => {
    return (
        <div className="h-[561px] bg-black max-lg:h-auto ">
            <div className="max-w-screen-2xl mx-auto h-full flex text-white max-2xl:p-4 items-center gap-10 justify-around max-lg:items-center max-lg:flex-col max-lg:text-center">
                <div className="text-[#A1A1A1] w-1/3 space-y-8 max-lg:w-2/3">
                    <Image src='/imgs/logo.svg' alt="logo" width={120} height={1} className="max-lg:flex max-"/>
                    <p>Come & See is a 501(c)(3) and all donations are tax deductible. (May vary by country.) Tax ID: 88-3013171. For mailing: 6385 Corporate Drive, Suite 200 Colorado Springs, CO 80919 Organization Registration (NO MAILING): 2601 Oberlin Rd STE 100 Raleigh, NC 27608</p>
                </div>
                <div className="flex flex-col gap-5">
                    <h1 className="text-xl">Support And Donations</h1>
                    <div className="flex flex-col text-[#949494] gap-5">
                        <Link href='/'>Donation Link</Link>
                        <Link href='/'>How Your Contributions Help</Link>
                        <Link href='/'>FAQ</Link>
                        <Link href='/'>Help Center</Link>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <h1 className="text-xl">Social Media</h1>
                    <div className="flex gap-2">
                        <Link href='https://www.instagram.com/'><Image src='/icons/instagram.png' alt="youtube" width={35} height={35}/></Link>
                        <Link href='https://www.tiktok.com/'><Image src='/icons/tiktok.png' alt="youtube" width={35} height={35}/></Link>
                        <Link href='https://www.youtube.com/'><Image src='/icons/youtube.png' alt="youtube" width={35} height={35}/></Link>
                        <Link href='https://www.facebook.com/'><Image src='/icons/facebook.png' alt="youtube" width={35} height={35}/></Link>
                        <Link href='https://x.com/'><Image src='/icons/twitter.png' alt="youtube" width={35} height={35}/></Link>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <h1 className="text-xl">Contact Us</h1>
                    <div>
                        <ul className="flex flex-col gap-5 text-[#949494]">
                            <li>Fyne Production</li>
                            <li>123 Main Street, Chisinau, Moldova</li>
                            <li>Phone: +373 60 877 733</li>
                            <li>Email: dariarez@fyne.pro</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer;