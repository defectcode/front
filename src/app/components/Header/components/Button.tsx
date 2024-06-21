import { FaRegHeart } from "react-icons/fa";


import React from 'react';

const Button = () => {
    return (
        <button className="px-28 py-4 bg-white text-black rounded-lg flex gap-2 font-bold text-xl">
           <FaRegHeart className="mt-1" />Support
        </button>
    );
};

export default Button;
