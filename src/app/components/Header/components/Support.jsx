import { FaRegHeart } from "react-icons/fa";
import React from 'react';

const Support = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-[235px] flex items-center justify-center h-[48px] bg-white text-black rounded-lg gap-2 max-md:gap-1 text-[15px] font-bold font-avenir-heavy"
    >
      <FaRegHeart />
      Support
    </button>
  );
};

export default Support;
