import { FaRegHeart } from "react-icons/fa";
import React from 'react';

const Support = ({ onClick }) => {
    return (
        <button onClick={onClick} className="px-28 max-md:px-7 py-5 max-md:py-2 bg-white text-black rounded-lg max-md:rounded-full flex gap-2 font-bold text-xl max-md:text-sm max-md:font-normal">
           <FaRegHeart className="mt-1" />Support
        </button>
    );
};

export default Support;
