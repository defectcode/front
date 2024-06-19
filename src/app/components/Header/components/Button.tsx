import { FaRegHeart } from "react-icons/fa";


import React from 'react';

const Button = () => {
    return (
        <button className="px-12 py-2 bg-white text-black rounded-lg flex gap-2 font-bold text-xl max-lg:px-">
           <FaRegHeart className="mt-1" />Support
        </button>
    );
};

export default Button;
