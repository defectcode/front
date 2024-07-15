import { FaRegHeart } from "react-icons/fa";
import React from 'react';

const SupportNavBar = ({ onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-[235px] flex items-center justify-center h-[48px] bg-white text-black rounded-lg gap-1 max-md:gap-1 text-[16px] font-bold font-avenir-heavy"
        style={{ fontFamily: 'Avenir Heavy, sans-serif' }}
      >
        <FaRegHeart className="w-[14px] h-auto" />
        Support
      </button>
    </div>
  );
};

export default SupportNavBar;
