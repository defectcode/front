
import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";

const NextButton = ({ onClick }) => {
    return (
        <button
        onClick={onClick}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent text-white rounded-full shadow-md p-2"
        >
            <MdKeyboardArrowRight className='w-16 h-auto max-lg:w-10'/>
        </button>
    );
};

export default NextButton;


