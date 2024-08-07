import { FaRegHeart } from "react-icons/fa";
import React from 'react';

const SupportNavBar = ({ onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-[209px] h-[40px] flex items-center justify-center bg-white text-black rounded-xl max-md:rounded-md gap-1 max-md:gap-[5px] text-[16px] max-md:text-[15px] font-bold font-avenir-heavy"
      >
        <FaRegHeart className="w-[14px] h-auto" />
        Support
      </button>
    </div>
  );
};

export default SupportNavBar;
