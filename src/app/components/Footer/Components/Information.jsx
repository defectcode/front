import React from "react";
import Description from "./Description";
import Link from "next/link";

const Information = () => {
  return (
    <div className="flex flex-row justify-between items-start max-w-[1300px] mx-auto w-full text-white px-4 max-lg:flex-col max-lg:justify-around max-md:lg:items-start max-lg:items-center">
      <Description />
      <div className="flex flex-col gap-3 mb-10 lg:mb-0 text-start max-lg:text-center max-md:gap-6">
        <h1 className="text-[18px] text-[#FFFFFF] font-semibold" style={{ fontFamily: "'Ek Mukta', sans-serif" }}>Support And Donations</h1>
        <div className="flex flex-col text-[#949494] gap-4 text-sm md:text-base max-md:gap-3" style={{ fontFamily: "'Ek Mukta', sans-serif", fontWeight: 400 }}>
          <Link className="text-[14px]" href="/">Donation Link</Link>
          <Link className="text-[14px]" href="/">How Your Contributions Help</Link>
          <Link className="text-[14px]" href="/">FAQ</Link>
          <Link className="text-[14px]" href="/">Help Center</Link>
        </div>
      </div>
      <div className="flex flex-col gap-3 mb-10 lg:mb-0 text-start max-lg:text-center max-md:gap-6">
        <h1 className="text-[18px] text-[#FFFFFF] font-semibold" style={{ fontFamily: "'Ek Mukta', sans-serif" }}>Legal Information</h1>
        <div className="flex flex-col text-[#949494] gap-4 text-sm md:text-base max-md:gap-3" style={{ fontFamily: "'Ek Mukta', sans-serif", fontWeight: 400 }}>
          <Link className="text-[14px]" href="/">Privacy Policy</Link>
          <Link className="text-[14px]" href="/">Cookie Policy</Link>
          <Link className="text-[14px]" href="/">Terms of Use</Link>
          <Link className="text-[14px]" href="/">Copyright Information</Link>
        </div>
      </div>
      <div className="flex flex-col gap-3 text-start max-lg:text-center max-md:gap-6 max-md:mb-4">
        <h1 className="text-[18px] text-[#FFFFFF] font-semibold " style={{ fontFamily: "'Ek Mukta', sans-serif" }}>Contact Us</h1>
        <ul className="flex flex-col text-[#949494] gap-4 max-md:gap-3 text-sm md:text-base md:gap-3 w-3/4 max-lg:w-auto" style={{ fontFamily: "'Ek Mukta', sans-serif", fontWeight: 400 }}>
          <li className="text-[14px]">Fyne Production</li>
          <li className="text-[14px]">123 Main Street, Chisinau, Moldova</li>
          <li className="text-[14px]">Phone: +373 60 877 733</li>
          <li className="text-[14px]">Email: dariarez@fyne.pro</li>
        </ul>
      </div>
    </div>
  );
};

export default Information;
