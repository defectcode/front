import { FaRegHeart } from "react-icons/fa";
import React from 'react';

const SupportNavBar = ({ onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-[235px] max-md:w-[156px] flex items-center justify-center h-[48px] max-md:h-[38px] bg-white text-black rounded-lg max-md:rounded-md gap-1 max-md:gap-[5px] text-[16px] max-md:text-[15px] font-bold font-avenir-heavy"
        style={{ fontFamily: 'Avenir Heavy, sans-serif' }}
      >
        <FaRegHeart className="w-[14px] h-auto" />
        Support
      </button>
    </div>
  );
};

export default SupportNavBar;
