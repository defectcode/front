import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Networking from "./Components/Networking";
import { IoIosArrowForward } from "react-icons/io";


export default function Sidebar() {
  const [isOpenSupport, setIsOpenSupport] = useState(false);
  const [isOpenLegal, setIsOpenLegal] = useState(false);
  const [isOpenContact, setIsOpenContact] = useState(false);

  const toggleSupport = () => setIsOpenSupport(!isOpenSupport);
  const toggleLegal = () => setIsOpenLegal(!isOpenLegal);
  const toggleContact = () => setIsOpenContact(!isOpenContact);

  return (
    <div className="bg-[#EBEBF0] text-white p-8 w-full max-w-md mx-auto max-h-[525px]">

      <div className="py-5">
        <div className="flex justify-between items-center cursor-pointer text-[#1E1E1E]" onClick={toggleSupport}>
          <h2 className="text-[18px] font-semibold font-ekMukta leading-none">Support And Donations</h2>
          <span className="text-xl transform transition-transform duration-200 leading-none" style={{ transform: isOpenSupport ? 'rotate(90deg)' : 'rotate(0deg)' }}>
            <IoIosArrowForward />
          </span>
        </div>
        {isOpenSupport && (
          <ul className="space-y-2 text-[#949494] text-[14px] gap-4 mt-5">
            <li><Link legacyBehavior href="#"><a>Donation Link</a></Link></li>
            <li><Link legacyBehavior href="#"><a>How Your Contributions Help</a></Link></li>
            <li><Link legacyBehavior href="#"><a>FAQ</a></Link></li>
            <li><Link legacyBehavior href="#"><a>Help Center</a></Link></li>
          </ul>
        )}
      </div>

      <div className="relative w-full">
        <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-[#272727] to-[#8D8D8D]"></div>
      </div>

      <div className="py-5">
        <div className="flex justify-between items-center cursor-pointer text-[#1E1E1E]" onClick={toggleLegal}>
          <h2 className="text-[18px] font-semibold font-ekMukta leading-none">Legal Information</h2>
          <span className="text-xl transform transition-transform duration-200 leading-none" style={{ transform: isOpenLegal ? 'rotate(90deg)' : 'rotate(0deg)' }}>
            <IoIosArrowForward />
          </span>
        </div>
        {isOpenLegal && (
          <ul className="space-y-2 text-[#949494] text-[14px] gap-4 mb-5 font-ekMukta mt-5">
            <li><Link legacyBehavior href="#"><a>Donation Link</a></Link></li>
            <li><Link legacyBehavior href="#"><a>How Your Contributions Help</a></Link></li>
            <li><Link legacyBehavior href="#"><a>FAQ</a></Link></li>
            <li><Link legacyBehavior href="#"><a>Help Center</a></Link></li>
          </ul>
        )}
      </div>

      <div className="relative w-full">
        <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-[#272727] to-[#8D8D8D]"></div>
      </div>

      <div className="py-5">
        <div className="flex justify-between items-center cursor-pointer text-[#1E1E1E]" onClick={toggleContact}>
          <h2 className="text-[18px] font-semibold font-ekMukta leading-none">Contact Us</h2>
          <span className="text-xl transform transition-transform duration-200 leading-none" style={{ transform: isOpenContact ? 'rotate(90deg)' : 'rotate(0deg)' }}>
            <IoIosArrowForward />
          </span>
        </div>
        {isOpenContact && (
          <ul className="space-y-2 text-[#949494] text-[14px] gap-4 mb-5 font-ekMukta mt-5">
            <li><Link legacyBehavior href="#"><a>Donation Link</a></Link></li>
            <li><Link legacyBehavior href="#"><a>How Your Contributions Help</a></Link></li>
            <li><Link legacyBehavior href="#"><a>FAQ</a></Link></li>
            <li><Link legacyBehavior href="#"><a>Help Center</a></Link></li>
        </ul>
        )}
      </div>

      <div className="relative w-full">
        <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-[#272727] to-[#8D8D8D]"></div>
      </div>

      <div>
        <div className=" flex justify-center items-center mt-[54px]">
          <Image src='/imgs/blackLogo.svg' alt="logo" width={98} height={32} />
        </div>

        <Networking />
      </div>
    </div>
  );
}
