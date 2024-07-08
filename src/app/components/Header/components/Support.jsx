import { FaRegHeart } from "react-icons/fa";
import React from 'react';

const Support = ({ onClick }) => {
    return (
        <button onClick={onClick} className="px-28 max-md:px-10 py-4 max-md:py-2 bg-white text-black rounded-lg flex gap-2 max-md:gap-1 font-bold text-xl max-md:text-[15px] max-md:font-semibold">
           <FaRegHeart className="mt-[6px]" />Support
        </button>
    );
};

export default Support;
