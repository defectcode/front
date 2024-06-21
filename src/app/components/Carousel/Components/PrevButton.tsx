// PrevButton.js

import React from 'react';
import { MdKeyboardArrowLeft } from "react-icons/md";

const PrevButton = ({ onClick }) => {
    return (
        <button
            className="absolute left-0 p-2 bg-gray-800 text-white rounded-full m-5  z-10 bg-transparent"
            onClick={onClick}
        >
            <MdKeyboardArrowLeft className='w-20 h-auto max-lg:w-10' />
        </button>
    );
};

export default PrevButton;
