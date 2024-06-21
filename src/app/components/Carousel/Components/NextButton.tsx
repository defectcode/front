
import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";

const NextButton = ({ onClick }) => {
    return (
        <button
            className="absolute right-0 p-2 bg-gray-800 text-white rounded-full m-5 z-10 bg-transparent"
            onClick={onClick}
        >
            <MdKeyboardArrowRight className='w-20 h-auto max-lg:w-10'/>

        </button>
    );
};

export default NextButton;


