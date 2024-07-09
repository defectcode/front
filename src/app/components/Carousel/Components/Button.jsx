import React from "react";



const Button = () => {
    return (
        <div className="max-md:text-center max-md:ml-0 max-md:mb-0 max-md:flex max-md:items-center max-md:justify-center"> {/* Ajustăm containerul butonului pentru versiunea mobilă */}
            <button className="bg-white text-black w-[176px] h-[34px] font-semibold rounded-md text-[15px]">
                View Details
            </button>
        </div>
    )
}

export default Button;
