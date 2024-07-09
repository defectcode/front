import React from "react";
import Description from "./Description";
import Link from "next/link";

const Information = () => {
  return (
    <div className="flex flex-row justify-between items-center max-w-screen-2xl mx-auto w-full text-white px-4 max-lg:flex-col max-lg:justify-around lg:items-start max-md:items-center">
      <Description />
      <div className="flex flex-col gap-3 mb-10 lg:mb-0 text-center lg:text-left max-md:gap-3">
        <h1 className="text-[18px] text-[#FFFFFF] font-semibold" style={{ fontFamily: "'Ek Mukta', sans-serif" }}>Support And Donations</h1>
        <div className="flex flex-col text-[#949494] gap-4 text-sm md:text-base max-md:gap-3">
          <Link href="/">Donation Link</Link>
          <Link href="/">How Your Contributions Help</Link>
          <Link href="/">FAQ</Link>
          <Link href="/">Help Center</Link>
        </div>
      </div>
      <div className="flex flex-col gap-3 mb-10 lg:mb-0 text-center lg:text-left max-md:gap-3">
        <h1 className="text-[18px] text-[#FFFFFF] font-semibold" style={{ fontFamily: "'Ek Mukta', sans-serif" }}>Legal information</h1>
        <div className="flex flex-col text-[#949494] gap-4 text-sm md:text-base max-md:gap-3">
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Cookie Policy</Link>
          <Link href="/">Terms of Use</Link>
          <Link href="/">Copyright Information</Link>
        </div>
      </div>
      <div className="flex flex-col gap-3 text-center lg:text-left max-md:gap-3 max-md:mb-4">
        <h1 className="text-[18px] text-[#FFFFFF] font-semibold" style={{ fontFamily: "'Ek Mukta', sans-serif" }}>Contact Us</h1>
        <ul className="flex flex-col text-[#949494] gap-4 max-md:gap-3 text-sm md:text-base md:gap-3 w-3/4 max-md:w-auto" style={{ fontFamily: "'Ek Mukta', sans-serif", fontWeight: 400 }}>
          <li>Fyne Production</li>
          <li>123 Main Street, Chisinau, Moldova</li>
          <li>Phone: +373 60 877 733</li>
          <li>Email: dariarez@fyne.pro</li>
        </ul>
      </div>
    </div>
  );
};

export default Information;
