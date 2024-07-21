import React from "react";



const Button = () => {
    return (
        <div className="max-md:text-center max-md:ml-0 max-md:mb-0 max-md:flex max-md:items-center max-md:justify-center"> {/* Ajustăm containerul butonului pentru versiunea mobilă */}
            <button className="bg-white text-black py-3 px-16 max-md:py-2 max-md:px-10 font-bold rounded-md max-md:text-[12px]">
                View Details
            </button>
        </div>
    )
}

export default Button;
